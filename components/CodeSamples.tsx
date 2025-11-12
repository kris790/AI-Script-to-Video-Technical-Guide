import React from 'react';

const CodeBlock = ({ children, language = 'typescript' }: { children: React.ReactNode, language?: string }) => (
    <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
        <code className={`language-${language} text-cyan-300`}>{children}</code>
    </pre>
);

export const CodeSamples = () => (
    <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white">Code Samples & Snippets</h2>
        <p className="text-gray-400">
            These TypeScript examples demonstrate core logic for the new backend stack: Fastify for the API, BullMQ for job processing, and interacting with the Replicate API.
        </p>

        <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">Fastify API Endpoint for Creating a Video</h3>
            <p className="text-gray-400 mb-4">This shows a protected Fastify route that validates user input, creates a video record using Prisma, and enqueues a job in BullMQ.</p>
            <CodeBlock>{`
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { Queue } from 'bullmq';

const prisma = new PrismaClient();
const videoQueue = new Queue('video-processing');

async function videoRoutes(fastify: FastifyInstance) {
  // Assumes a 'preHandler' hook has already verified the JWT and attached user to request
  fastify.post('/videos', async (request: FastifyRequest, reply: FastifyReply) => {
    const { title, script } = request.body as { title: string, script: string };
    const user = request.user; // from auth middleware

    // 1. Check user credits (not shown)

    // 2. Create video project in DB
    const video = await prisma.video.create({
      data: {
        title,
        script,
        userId: user.id,
        status: 'queued',
      },
    });

    // 3. Add job to queue
    await videoQueue.add('process-video', { videoId: video.id });

    reply.code(202).send({
      videoId: video.id,
      status: 'queued',
      message: 'Video project created and queued for processing.',
    });
  });
}
            `}</CodeBlock>
        </div>

        <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">BullMQ Worker for Video Orchestration</h3>
            <p className="text-gray-400 mb-4">This worker manages the multi-step process for a single video, calling different AI services in sequence and parallel.</p>
            <CodeBlock>{`
import { Job, Worker } from 'bullmq';
import { prisma } from './prisma-client';
import * as aiService from './ai-service'; // Abstracted AI calls

const worker = new Worker('video-processing', async (job: Job) => {
  const { videoId } = job.data;

  try {
    // 1. Analyze script to get scenes
    const video = await prisma.video.findUnique({ where: { id: videoId } });
    await prisma.video.update({ where: { id: videoId }, data: { status: 'processing' } });
    
    const scenesData = await aiService.analyzeScript(video.script); // Calls GPT-4o-mini
    
    // 2. Create scene records in DB
    // ... code to save scenes from scenesData to the DB ...

    // 3. Process each scene in parallel (generate image and audio)
    const sceneProcessingPromises = savedScenes.map(async (scene) => {
      const [imageUrl, audioUrl] = await Promise.all([
        aiService.generateImage(scene.scriptText), // DALL-E 3
        aiService.generateAudio(scene.scriptText), // ElevenLabs
      ]);
      const videoClipUrl = await aiService.createVideoClip(imageUrl, audioUrl); // Replicate API
      
      await prisma.scene.update({ 
        where: { id: scene.id }, 
        data: { imageUrl, audioUrl, videoClipUrl, status: 'completed' }
      });
    });

    await Promise.all(sceneProcessingPromises);
    
    // 4. Stitch clips together (another job could be enqueued for this)
    // ... final concatenation logic ...

    await prisma.video.update({ where: { id: videoId }, data: { status: 'completed' } });

  } catch (error) {
    await prisma.video.update({ 
      where: { id: videoId }, 
      data: { status: 'failed', errorMessage: error.message }
    });
    throw error;
  }
});
            `}</CodeBlock>
        </div>

        <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">Calling the Replicate API for Video Generation</h3>
            <p className="text-gray-400 mb-4">An example of how to start a job on Replicate and poll for its completion.</p>
            <CodeBlock>{`
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function createVideoClip(imageUrl: string, audioUrl: string): Promise<string> {
  const model = "another-ai-artist/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351";
  
  const input = {
    prompt: "A high-quality animation of the provided image",
    init_image: imageUrl,
    init_audio: audioUrl,
    // ... other model parameters
  };

  // Start the prediction
  const prediction = await replicate.predictions.create({
    version: model.split(':')[1],
    input,
    // You can also use a webhook to be notified when the prediction is complete
  });

  // Poll for the result (in a real app, a webhook is better)
  let finalPrediction = await replicate.predictions.get(prediction.id);
  while (['starting', 'processing'].includes(finalPrediction.status)) {
    await new Promise(res => setTimeout(res, 2000));
    finalPrediction = await replicate.predictions.get(prediction.id);
  }

  if (finalPrediction.status === 'succeeded') {
    return finalPrediction.output; // The URL of the generated video clip
  } else {
    throw new Error(\`Replicate prediction failed: \${finalPrediction.error}\`);
  }
}
            `}</CodeBlock>
        </div>
    </div>
);
