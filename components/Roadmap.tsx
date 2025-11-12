import React from 'react';

const roadmapData = [
  {
    phase: 1,
    weeks: "1-3",
    title: "Core Infrastructure & Authentication",
    theme: "Build a solid foundation for the application, including backend services, database, and user management.",
    tasks: [
      "Set up Fastify backend project with TypeScript.",
      "Initialize PostgreSQL database and configure Prisma ORM.",
      "Implement JWT-based user registration and login endpoints.",
      "Set up BullMQ with Redis for background job processing.",
      "Deploy initial backend infrastructure to Railway or Render.",
      "Create basic Next.js frontend with user auth flow.",
    ],
  },
  {
    phase: 2,
    weeks: "4-6",
    title: "Script Analysis & Image Generation",
    theme: "Implement the first stages of the AI pipeline, from script input to visual asset creation.",
    tasks: [
      "Create API endpoint to accept a script and create a video project.",
      "Implement a BullMQ worker for script analysis using GPT-4o-mini.",
      "Develop logic to parse AI response and create scene records in the database.",
      "Implement a second worker to generate scene images using DALL-E 3.",
      "Integrate AWS S3 for storing generated images.",
      "Build frontend UI for script submission and to display generated scene images.",
    ],
  },
  {
    phase: 3,
    weeks: "7-9",
    title: "Audio & Video Assembly",
    theme: "Complete the asset generation pipeline and integrate the core video creation service.",
    tasks: [
      "Implement a worker for text-to-speech using the ElevenLabs API.",
      "Save generated audio files to S3.",
      "Integrate the Replicate API for video processing (image + audio -> video clip).",
      "Chain jobs together: image/audio generation must complete before video assembly.",
      "Implement final FFmpeg job to stitch scene clips and add background music.",
      "Develop frontend components to manage voice and music selection.",
    ],
  },
  {
    phase: 4,
    weeks: "10-12",
    title: "Frontend Polish, Tracking & Testing",
    theme: "Build the user-facing interface for managing video creation and prepare for launch.",
    tasks: [
      "Develop a dashboard to display user's video projects and their statuses.",
      "Implement real-time progress updates on the frontend (e.g., using WebSockets or polling).",
      "Build the final video preview player and download functionality.",
      "Implement credit system and link to user accounts.",
      "Conduct end-to-end testing of the entire pipeline.",
      "Set up monitoring with Sentry and LogTail.",
    ],
  },
];

const RoadmapCard = ({ phase, weeks, title, theme, tasks }: (typeof roadmapData)[0]) => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 relative flex flex-col">
        <div className="absolute top-4 right-4 text-5xl font-black text-gray-700/50">
            {phase}
        </div>
        <h3 className="text-xl font-bold text-cyan-400 mb-2">Phase {phase} (Weeks {weeks}): {title}</h3>
        <p className="text-gray-400 mb-4 italic flex-grow">{theme}</p>
        <ul className="space-y-2 list-disc list-inside text-gray-300">
            {tasks.map((task, index) => (
                <li key={index}>{task}</li>
            ))}
        </ul>
    </div>
);


export const Roadmap = () => (
  <div className="space-y-8">
    <h2 className="text-2xl font-bold text-white">12-Week MVP Implementation Roadmap</h2>
    <p className="text-gray-400">
      This agile roadmap is broken into four 3-week phases, focusing on building a robust, end-to-end system. Each phase delivers a key part of the overall functionality, culminating in a launch-ready MVP.
    </p>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {roadmapData.map(item => (
        <RoadmapCard key={item.phase} {...item} />
      ))}
    </div>
  </div>
);
