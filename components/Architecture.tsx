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
            This architecture utilizes a modern, decoupled stack designed for scalability and resilience. The frontend is separated from the backend API, and a robust job queue manages the complex, multi-step AI processing pipeline asynchronously.
        </p>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-cyan-400">Core Components</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc list-inside">
                <li><strong>Frontend:</strong> Next.js on Vercel</li>
                <li><strong>Backend API:</strong> Fastify (Node.js) on Railway/Render</li>
                <li><strong>Database:</strong> PostgreSQL with Prisma ORM</li>
                <li><strong>Job Queue:</strong> Redis + BullMQ</li>
                <li><strong>Video Processing:</strong> Replicate API (Serverless)</li>
                <li><strong>AI Services:</strong> OpenAI, ElevenLabs, DALL-E 3</li>
                <li><strong>Storage:</strong> AWS S3 for assets</li>
                <li><strong>Monitoring:</strong> Sentry & LogTail</li>
            </ul>
        </div>

        <div>
            <h3 className="text-xl font-bold text-white mb-6">AI Video Generation Pipeline</h3>
            <div className="space-y-6 border-l-2 border-dashed border-gray-600 ml-5 pl-8">
                <FlowStep
                    number={1}
                    title="User Submits Script (Frontend -> API)"
                    description="The Next.js app sends the script and user options to the Fastify API, which creates a 'video' record and enqueues a master processing job."
                />
                <FlowStep
                    number={2}
                    title="Script Analysis (BullMQ Worker -> GPT-4o-mini)"
                    description="A worker picks up the job, calls the OpenAI API to break the script into scenes, and saves the structured scene data to the database."
                    isAi
                />
                <FlowStep
                    number={3}
                    title="Parallel Asset Generation (BullMQ Workers)"
                    description="The master job enqueues parallel jobs for each scene: one for image generation (DALL-E 3) and one for audio generation (ElevenLabs)."
                />
                <FlowStep
                    number={4}
                    title="Asset Storage (Workers -> S3)"
                    description="As image and audio files are generated, workers upload them to an AWS S3 bucket and update the scene records with their URLs."
                />
                 <FlowStep
                    number={5}
                    title="Scene Video Assembly (Worker -> Replicate)"
                    description="Once a scene's image and audio are ready, a new job calls the Replicate API, providing the asset URLs to generate a short video clip with Ken Burns effects."
                    isAi
                />
                <FlowStep
                    number={6}
                    title="Final Concatenation (Worker -> FFmpeg)"
                    description="After all scene clips are generated via Replicate, a final job downloads them, stitches them together, mixes in background music using FFmpeg, and uploads the final video to S3."
                />
                <FlowStep
                    number={7}
                    title="Update & Notify (API -> Frontend)"
                    description="The API updates the video status to 'complete'. The frontend, which has been polling or connected via WebSocket, shows the final video is ready for download."
                />
            </div>
        </div>
    </div>
);
