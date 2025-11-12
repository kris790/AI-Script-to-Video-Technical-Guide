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
            These TypeScript examples demonstrate core logic for the backend worker processes and frontend interactions.
        </p>

        <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">Video Processing Pipeline (Bull Queue Worker)</h3>
            <p className="text-gray-400 mb-4">This shows how a worker might process the main video job, orchestrating the various sub-tasks.</p>
            <CodeBlock>{`
import { Job, Queue } from 'bull';
import { GoogleGenAI, Type } from "@google/genai";
// Assume db functions and aiService are defined elsewhere

const sceneQueue = new Queue('scene-generation');

// Main video job processor
async function processVideoJob(job: Job) {
  const { projectId, script } = job.data;
  
  try {
    // 1. Analyze script
    await db.projects.update({ where: { id: projectId }, data: { status: 'analyzing' } });
    const analysisResult = await aiService.analyzeScript(script); // Uses gemini-2.5-flash
    
    // 2. Create scene records and queue sub-jobs
    await db.projects.update({ where: { id: projectId }, data: { status: 'generating_assets' } });
    for (const scene of analysisResult.scenes) {
      const sceneRecord = await db.scenes.create({
        data: { projectId, ...scene },
      });
      // Add a job for each scene to be processed
      await sceneQueue.add({ sceneId: sceneRecord.id });
    }

    // A separate listener would check when all scenes are 'complete' 
    // and then queue a final 'stitching' job.

  } catch (error) {
    await db.projects.update({ where: { id: projectId }, data: { status: 'failed' } });
    console.error(\`Failed video job for project \${projectId}:\`, error);
  }
}
            `}</CodeBlock>
        </div>

        <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">Scene Generation Worker</h3>
            <p className="text-gray-400 mb-4">This worker handles a single scene, generating assets in parallel.</p>
            <CodeBlock>{`
// Scene generation processor
async function processSceneJob(job: Job) {
  const { sceneId } = job.data;
  
  await db.scenes.update({ where: { id: sceneId }, data: { status: 'generating' } });
  const scene = await db.scenes.findUnique({ where: { id: sceneId } });

  try {
    // Generate image and audio in parallel
    const [imageUrl, audioUrl] = await Promise.all([
      aiService.generateImage(scene.visualPrompt), // gemini-2.5-flash-image
      aiService.generateAudio(scene.narrationText) // gemini-2.5-flash-preview-tts
    ]);

    // Generate video clip
    const videoClipUrl = await aiService.generateVideoClip(imageUrl, audioUrl); // veo-3.1-fast-generate-preview
    
    await db.scenes.update({
      where: { id: sceneId },
      data: {
        status: 'complete',
        imageUrl,
        audioUrl,
        videoClipUrl,
      },
    });

  } catch (error) {
    await db.scenes.update({ where: { id: sceneId }, data: { status: 'failed' } });
    console.error(\`Failed scene job \${sceneId}:\`, error);
  }
}
            `}</CodeBlock>
        </div>

        <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">Resilient API Caller with Exponential Backoff</h3>
            <p className="text-gray-400 mb-4">A wrapper function to make any API call more robust.</p>
            <CodeBlock>{`
async function resilientCall<T,>(
  apiFunction: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    return await apiFunction();
  } catch (error: any) {
    if (retries > 0 && (error.status >= 500 || error.status === 429)) {
      console.log(\`API call failed. Retrying in \${delay}ms...\`);
      await new Promise(res => setTimeout(res, delay));
      return resilientCall(apiFunction, retries - 1, delay * 2); // Exponential backoff
    } else {
      throw error; // Rethrow if not a retryable error or retries exhausted
    }
  }
}

// Usage:
// const sceneData = await resilientCall(() => aiService.analyzeScript(script));
            `}</CodeBlock>
        </div>

        <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-2">Frontend: Drag-and-Drop Scene Reordering (dnd-kit)</h3>
            <p className="text-gray-400 mb-4">This React snippet shows a basic implementation for reordering scenes using the `@dnd-kit` library. This would be part of the editing interface.</p>
            <CodeBlock language="typescript">{`
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Mock scene type
type Scene = { id: number; text: string };

// 1. Sortable Item Component
const SortableSceneItem = ({ scene }: { scene: Scene }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: scene.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '16px',
    margin: '4px 0',
    backgroundColor: '#374151', // gray-700
    border: '1px solid #4B5563', // gray-600
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <span className="font-bold mr-4 text-cyan-400">#{scene.id}</span>
      <p>{scene.text}</p>
    </div>
  );
};

// 2. Main Editor Component
export const SceneEditor = () => {
  const [scenes, setScenes] = useState<Scene[]>([
    { id: 1, text: 'A majestic castle on a hill.' },
    { id: 2, text: 'A dragon flies over the mountains.' },
    { id: 3, text: 'The hero enters a dark forest.' },
    { id: 4, text: 'A final confrontation with the villain.' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setScenes((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={scenes} strategy={verticalListSortingStrategy}>
        {scenes.map(scene => <SortableSceneItem key={scene.id} scene={scene} />)}
      </SortableContext>
    </DndContext>
  );
};
            `}</CodeBlock>
        </div>
    </div>
);