
import React from 'react';

const FlowStep = ({ number, title, description, isAi }: { number: number; title: string; description: string; isAi?: boolean }) => (
    <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${isAi ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-200'}`}>
            {number}
        </div>
        <div>
            <h4 className="font-semibold text-white">{title}</h4>
            <p className="text-gray-400">{description}</p>
        </div>
    </div>
);

export const Architecture = () => (
    <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white">System Architecture Overview</h2>
        <p className="text-gray-400">
            This architecture is designed for scalability and asynchronous processing, which is crucial for handling time-consuming AI generation tasks without blocking the user interface. It decouples the frontend from the heavy-lifting backend workers.
        </p>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-cyan-400">Components</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc list-inside">
                <li><strong>Frontend:</strong> Next.js on Vercel</li>
                <li><strong>Backend API:</strong> Node.js/Express</li>
                <li><strong>Database:</strong> PostgreSQL</li>
                <li><strong>Job Queue:</strong> Redis + Bull Queue</li>
                <li><strong>AI Services:</strong> Google Gemini API Suite</li>
                <li><strong>Storage:</strong> Cloud Storage (e.g., AWS S3, Google Cloud Storage)</li>
            </ul>
        </div>

        <div>
            <h3 className="text-xl font-bold text-white mb-6">AI Pipeline Flow</h3>
            <div className="space-y-6 border-l-2 border-dashed border-gray-600 ml-5 pl-8">
                <FlowStep
                    number={1}
                    title="Script Submission (Frontend)"
                    description="User inputs their script and selects style options in the React app."
                />
                <FlowStep
                    number={2}
                    title="Job Creation (Backend API)"
                    description="The Node.js server receives the request, creates a new video project in the database, and adds a 'start-video-job' task to the Redis queue."
                />
                <FlowStep
                    number={3}
                    title="Script Analysis (Worker)"
                    description="A worker process picks up the job and sends the script to the Gemini API for scene breakdown, generating structured JSON data."
                    isAi
                />
                <FlowStep
                    number={4}
                    title="Parallel Asset Generation (Worker)"
                    description="The worker creates parallel sub-jobs for each scene: one for image generation and one for TTS. This allows for faster processing."
                />
                <FlowStep
                    number={5}
                    title="Image & Audio Generation (Worker -> Gemini)"
                    description="Sub-workers call Gemini Image and TTS APIs, then upload the resulting assets (images, audio files) to cloud storage, saving the URLs in the database."
                    isAi
                />
                 <FlowStep
                    number={6}
                    title="Video Scene Assembly (Worker -> Gemini)"
                    description="Once all assets for a scene are ready, a job is sent to Gemini's Veo model to create a short video clip from the image and audio."
                    isAi
                />
                <FlowStep
                    number={7}
                    title="Final Video Concatenation (Worker)"
                    description="After all scene clips are generated, a final worker job stitches them together (using FFmpeg or a similar tool) with background music into the final video."
                />
                <FlowStep
                    number={8}
                    title="Notification & Delivery (Backend -> Frontend)"
                    description="The worker updates the video status to 'complete' in the database. The frontend polls for this status and, once complete, displays the final video to the user for preview and download."
                />
            </div>
        </div>
    </div>
);
