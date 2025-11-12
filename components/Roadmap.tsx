import React from 'react';

const roadmapData = [
  {
    week: 1,
    title: "Foundation & Core Logic",
    theme: "Establish the project backbone and implement the core script analysis feature.",
    tasks: [
      "Setup Next.js project with Tailwind CSS.",
      "Setup PostgreSQL database and define initial schemas (Users, Scripts).",
      "Implement user authentication (e.g., using NextAuth or Clerk).",
      "Design and build the script input UI (text area).",
      "Create a Node.js/Express backend endpoint for script submission.",
      "Integrate Gemini API (`gemini-2.5-flash`) for script-to-scene analysis.",
    ],
  },
  {
    week: 2,
    title: "Asset Generation & First Visuals",
    theme: "Bring scenes to life by generating images and audio.",
    tasks: [
      "Develop a background job worker using Bull/Redis.",
      "Integrate Gemini (`gemini-2.5-flash-image`) to generate images for each scene.",
      "Integrate Gemini TTS (`gemini-2.5-flash-preview-tts`) for voiceover generation.",
      "Implement cloud storage (e.g., AWS S3) for generated assets.",
      "Build a simple UI to display generated scene images and play audio.",
      "Develop scene preview thumbnails.",
    ],
  },
  {
    week: 3,
    title: "Video Assembly & Preview",
    theme: "Combine generated assets into a cohesive video.",
    tasks: [
      "Integrate Gemini's Veo (`veo-3.1-fast-generate-preview`) to generate a short video clip for each scene (image + audio).",
      "Alternatively, use a simpler library like `ffmpeg.wasm` on the backend to stitch images and audio into video clips.",
      "Implement a final job to concatenate all scene clips into one video.",
      "Build a video preview player on the frontend.",
      "Add a basic library of royalty-free background music.",
      "Implement video download functionality.",
    ],
  },
  {
    week: 4,
    title: "Editing, Polish & Deployment",
    theme: "Refine the user experience, add basic editing, and prepare for launch.",
    tasks: [
      "Implement simple editing UI: scene reordering (drag-and-drop).",
      "Allow users to edit the text for each scene and regenerate audio.",
      "Implement comprehensive error handling and job status tracking visible to the user.",

      "Conduct thorough testing and bug fixing.",
      "Prepare for deployment (e.g., to Vercel and a cloud provider for the backend).",
      "Setup monitoring and logging.",
    ],
  },
  {
    week: 5,
    title: "Advanced Video Features & User Feedback",
    theme: "Enhance video customization and incorporate early user feedback for refinement.",
    tasks: [
      "Allow users to select aspect ratios (16:9, 9:16, 1:1).",
      "Enable custom branding (upload logo as a watermark) for Pro users.",
      "Set up a user feedback collection tool (e.g., Canny or a simple form).",
      "Analyze initial user data to identify popular features and pain points.",
      "Implement AI-powered scene transitions (e.g., dissolve, slide).",
    ],
  },
];

const RoadmapCard = ({ week, title, theme, tasks }: (typeof roadmapData)[0]) => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 relative">
        <div className="absolute top-4 right-4 text-5xl font-black text-gray-700/50">
            {week}
        </div>
        <h3 className="text-xl font-bold text-cyan-400 mb-2">Week {week}: {title}</h3>
        <p className="text-gray-400 mb-4 italic">{theme}</p>
        <ul className="space-y-2 list-disc list-inside text-gray-300">
            {tasks.map((task, index) => (
                <li key={index}>{task}</li>
            ))}
        </ul>
    </div>
);


export const Roadmap = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-white">5-Week MVP+ Implementation Roadmap</h2>
    <p className="text-gray-400">
      This agile roadmap prioritizes delivering user value quickly, focusing on a functional end-to-end flow before adding extensive features. Each week builds upon the last, culminating in a launch-ready MVP with a plan for immediate post-launch enhancements.
    </p>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {roadmapData.map(week => (
        <RoadmapCard key={week.week} {...week} />
      ))}
    </div>
  </div>
);