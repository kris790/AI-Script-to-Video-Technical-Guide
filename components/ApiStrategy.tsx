
import React from 'react';

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
        <code className="language-typescript text-cyan-300">{children}</code>
    </pre>
);

export const ApiStrategy = () => (
    <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white">Gemini API Integration Strategy</h2>
        <p className="text-gray-400">
            A successful implementation relies on structured, consistent communication with the Gemini APIs. Using the Gemini model family for all AI tasks (analysis, image, TTS, video) simplifies integration and billing.
        </p>

        <div className="space-y-4">
            <h3 className="text-xl font-bold text-cyan-400">1. Script Analysis: `gemini-2.5-flash`</h3>
            <p>The goal is to transform a raw script into a structured array of scenes. We enforce a strict JSON output using `responseSchema` for reliable parsing.</p>
            <CodeBlock>{`
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const script = "Scene 1: A majestic castle on a hill. Narrator: Once upon a time...";

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: \`Analyze this script and break it down into scenes. For each scene, create a detailed visual prompt for an image generator and extract the narrator's text. The visual prompt should be descriptive and cinematic. Script: \${script}\`,
  config: {
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        scenes: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              sceneNumber: { type: Type.INTEGER },
              visualPrompt: { 
                type: Type.STRING,
                description: 'A detailed, vivid description for an image generation model.' 
              },
              narration: { 
                type: Type.STRING,
                description: 'The exact text for the text-to-speech engine.'
              },
            }
          }
        }
      }
    },
  },
});

const sceneData = JSON.parse(response.text);
// sceneData.scenes will be an array of scene objects
            `}</CodeBlock>
        </div>

        <div className="space-y-4">
            <h3 className="text-xl font-bold text-cyan-400">2. Scene Generation: `gemini-2.5-flash-image`</h3>
            <p>To maintain visual consistency, we prepend a consistent style prefix to every visual prompt generated in the analysis step.</p>
            <CodeBlock>{`
import { GoogleGenAI, Modality } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const visualStyle = "flat illustration, vibrant colors, minimalist";
const scenePrompt = sceneData.scenes[0].visualPrompt; // From previous step

const fullPrompt = \`\${visualStyle}, \${scenePrompt}\`;

const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: fullPrompt }] },
    config: {
        responseModalities: [Modality.IMAGE],
    },
});

const part = response.candidates?.[0]?.content?.parts?.[0];
if (part?.inlineData) {
    const base64Image = part.inlineData.data;
    // Upload this to cloud storage
}
            `}</CodeBlock>
        </div>

        <div className="space-y-4">
            <h3 className="text-xl font-bold text-cyan-400">3. Text-to-Speech: `gemini-2.5-flash-preview-tts`</h3>
            <p>The narration text from the analysis step is sent directly to the TTS API. We can offer different voices by changing the `voiceName`.</p>
            <CodeBlock>{`
import { GoogleGenAI, Modality } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const narration = sceneData.scenes[0].narration; // From analysis step
const voice = 'Kore'; // Or 'Puck', 'Charon', etc.

const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: narration }] }],
    config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
            voiceConfig: {
                prebuiltVoiceConfig: { voiceName: voice },
            },
        },
    },
});

const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
// Upload base64Audio to cloud storage as an audio file
            `}</CodeBlock>
        </div>
        
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-cyan-400">4. Error Handling & Retries</h3>
            <p>All API calls should be wrapped in a resilient function that implements an exponential backoff strategy for retries. This handles transient network issues and rate limits gracefully.</p>
            <ul className="list-disc list-inside text-gray-300">
                <li>Wrap API calls in `try...catch` blocks.</li>
                <li>On failure, check the error type. If it's a rate limit or server error (5xx), schedule a retry.</li>
                <li>Implement exponential backoff: wait 1s, then 2s, then 4s, etc., before retrying.</li>
                <li>After a set number of retries (e.g., 3), mark the job as 'failed' in the database and notify the user.</li>
            </ul>
        </div>
    </div>
);
