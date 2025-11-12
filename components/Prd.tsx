import React from 'react';

const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h2>;
const H3 = ({ children }: { children: React.ReactNode }) => <h3 className="text-xl font-bold text-cyan-400 mt-6 mb-3">{children}</h3>;
const P = ({ children }: { children: React.ReactNode }) => <p className="text-gray-400 mb-4">{children}</p>;
const Ul = ({ children }: { children: React.ReactNode }) => <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">{children}</ul>;
const Strong = ({ children }: { children: React.ReactNode }) => <strong className="font-semibold text-gray-200">{children}</strong>;

export const Prd = () => (
  <div className="prose prose-invert max-w-none">
    <h1 className="text-3xl font-bold text-white">Product Requirements Document: Story Flow</h1>
    
    <H2>1. Project Context</H2>
    <P>
      We are building a tool that transforms written scripts into animated videos using AI. The target audience includes social media managers, educators, and small business owners who need to create professional-looking videos efficiently without requiring technical video production skills.
    </P>

    <H2>2. Core Hypothesis & Success Metrics</H2>
    <Ul>
      <li><Strong>Hypothesis:</Strong> Content creators will adopt an AI tool that seamlessly transforms their scripts into engaging videos, significantly reducing time, cost, and technical barriers.</li>
      <li><Strong>Success Metric:</Strong> Achieve 100 email signups from a targeted ad campaign within 2 weeks, with a >5% conversion rate.</li>
      <li><Strong>Time-to-Value:</Strong> The average time for a new user to complete their first video is under 10 minutes.</li>
    </Ul>

    <H2>3. Monetization Model</H2>
    <Ul>
      <li><Strong>Free Tier:</Strong> 10 credits/month (1 basic 30-second video), 480p resolution with watermark.</li>
      <li><Strong>Starter Tier ($9/month):</Strong> 100 credits/month, no watermark, 720p resolution, 2 visual styles.</li>
      <li><Strong>Pro Tier ($29/month):</Strong> 500 credits/month, 1080p resolution, all styles and voices, priority processing.</li>
      <li><Strong>Business Tier ($99/month):</Strong> 2000 credits/month, custom branding, API access.</li>
    </Ul>
    <H3>Credit Costs</H3>
    <Ul>
      <li>30-second video (3 scenes): <Strong>10 credits</Strong></li>
      <li>60-second video (6 scenes): <Strong>20 credits</Strong></li>
      <li>HD export: <Strong>+5 credits</Strong></li>
      <li>Background music: <Strong>+2 credits</Strong></li>
    </Ul>
    
    <H2>4. Technical Architecture</H2>
    <Ul>
        <li><Strong>Frontend:</Strong> Next.js with TypeScript and Tailwind CSS</li>
        <li><Strong>Backend:</Strong> Fastify with TypeScript</li>
        <li><Strong>Database:</Strong> PostgreSQL with Prisma ORM</li>
        <li><Strong>Queue:</Strong> BullMQ with Redis for job processing</li>
        <li><Strong>Video Processing:</Strong> Replicate API (serverless video processing)</li>
        <li><Strong>Storage:</Strong> AWS S3 with lifecycle policies</li>
        <li><Strong>Deployment:</Strong> Railway or Render (for MVP)</li>
        <li><Strong>Monitoring:</Strong> Sentry (errors) + LogTail (logs)</li>
    </Ul>

    <H2>5. Video Generation Pipeline</H2>
    <ol className="list-decimal list-inside space-y-2 text-gray-300">
        <li><Strong>Script Analysis:</Strong> Break script into logical scenes using GPT-4o-mini.</li>
        <li><Strong>Scene Image Generation:</Strong> Generate images for each scene using DALL-E 3.</li>
        <li><Strong>TTS Audio Generation:</Strong> Create narration for each scene using ElevenLabs.</li>
        <li><Strong>Video Assembly:</Strong> Combine images and audio with Ken Burns effects using Replicate API.</li>
        <li><Strong>Audio Mixing:</Strong> Add background music with proper volume levels.</li>
        <li><Strong>Final Render:</Strong> Output video in appropriate resolution based on user tier.</li>
    </ol>
    
    <H2>6. Cost Model (Per Video Estimate)</H2>
    <Ul>
        <li><Strong>Script Analysis (GPT-4o-mini):</Strong> $0.02</li>
        <li><Strong>Image Generation (DALL-E 3):</Strong> $0.20 ($0.04 per image, avg. 5)</li>
        <li><Strong>TTS (ElevenLabs):</Strong> $0.05</li>
        <li><Strong>Video Processing (Replicate API):</Strong> $0.10</li>
        <li><Strong>Storage & Egress:</Strong> $0.03</li>
        <li><Strong>Infrastructure Allocation:</Strong> $0.15</li>
        <li><Strong>Total:</Strong> ~$0.55 per video</li>
    </Ul>

    <H2>7. Validation Approach</H2>
    <P>Before committing to full development, a validation phase will be conducted:</P>
    <ol className="list-decimal list-inside space-y-2 text-gray-300">
        <li>Create a landing page with a clear value proposition and pricing.</li>
        <li>Run a $200 ad campaign targeting social media managers, content creators, and educators.</li>
        <li>The goal is to achieve 100 email signups in 2 weeks with a >5% conversion rate.</li>
        <li>If successful, proceed with MVP development.</li>
    </ol>

  </div>
);
