
import React from 'react';

const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h2>;
const H3 = ({ children }: { children: React.ReactNode }) => <h3 className="text-xl font-bold text-cyan-400 mt-6 mb-3">{children}</h3>;
const P = ({ children }: { children: React.ReactNode }) => <p className="text-gray-400 mb-4">{children}</p>;
const Ul = ({ children }: { children: React.ReactNode }) => <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">{children}</ul>;
const Strong = ({ children }: { children: React.ReactNode }) => <strong className="font-semibold text-gray-200">{children}</strong>;

export const Prd = () => (
  <div className="prose prose-invert max-w-none">
    <h1 className="text-3xl font-bold text-white">Product Requirements Document (PRD): AI Script-to-Video Automation Tool</h1>
    
    <H2>1. Project Context</H2>
    <P>
      We are building a tool that transforms written scripts into animated videos using AI. The target audience includes social media managers, educators, and small business owners who need to create professional-looking videos efficiently without requiring technical video production skills. The primary goal is to democratize video creation for content marketing and educational purposes.
    </P>

    <H2>2. Core Hypothesis & Success Metrics</H2>
    <P>
      <Strong>Hypothesis:</Strong> Content creators will adopt an AI tool that seamlessly transforms their scripts into engaging videos, significantly reducing the time, cost, and technical barriers associated with traditional video production.
    </P>
    <Ul>
      <li><Strong>Success Metric:</Strong> Achieve 100 active free-tier users who each create 3 or more videos within the first 30 days of launch.</li>
      <li><Strong>Conversion Metric:</Strong> 15% of these active free-tier users convert to a paid subscription.</li>
      <li><Strong>Retention Metric:</Strong> 50% of new users return to the platform within 7 days of their first session.</li>
      <li><Strong>Time-to-Value:</Strong> The average time for a new user to complete their first video is under 10 minutes.</li>
    </Ul>

    <H2>3. MVP Feature Set</H2>
    <P>The MVP is focused on delivering a complete, end-to-end "script-to-video" experience.</P>
    
    <H3>Script Input & Analysis:</H3>
    <Ul>
        <li>A simple text area for users to paste or write their script.</li>
        <li>AI-powered analysis to automatically break the script down into logical scenes.</li>
    </Ul>

    <H3>Automated Scene Generation:</H3>
    <Ul>
        <li>AI-powered image generation for each scene based on the script analysis.</li>
        <li>Users can choose from 2-3 predefined visual styles (e.g., "Minimalist Flat," "Watercolor," "Corporate").</li>
    </Ul>

    <H3>Voiceover Generation:</H3>
    <Ul>
        <li>Text-to-speech (TTS) integration to create narration for each scene.</li>
        <li>Users can select from a library of 3-5 distinct voice options.</li>
    </Ul>

    <H3>Video Assembly & Finalization:</H3>
    <Ul>
        <li><Strong>Scene Clip Generation:</Strong> For each scene, the generated image and narration audio are combined into a short video clip using Gemini's Veo model. A prompt like "Create a 5-second video from this image with a subtle zoom-in effect" adds motion.</li>
        <li><Strong>Clip Concatenation:</Strong> Once all scene clips are generated, a backend process using a library like FFmpeg will stitch them together in the correct order.</li>
        <li><Strong>Background Music:</Strong> A selected royalty-free music track is overlaid onto the full video, with its volume lowered to not overpower the narration.</li>
        <li><Strong>Final Render:</Strong> The final output is a 720p MP4 file, ready for preview and download.</li>
    </Ul>
    
    <H3>Editing & Preview:</H3>
    <Ul>
        <li>A simple editing interface allowing users to reorder scenes via drag-and-drop.</li>
        <li>Ability to edit the text of a scene and regenerate the narration.</li>
        <li>Preview thumbnails for each scene before committing to a full video render.</li>
    </Ul>

    <H3>Output & Sharing:</H3>
    <Ul>
        <li>A preview player to watch the fully rendered video.</li>
        <li>A download button to save the final video in 720p resolution (MP4 format).</li>
    </Ul>

    <H2>4. Technical Stack</H2>
    <Ul>
        <li><Strong>Frontend:</Strong> React/Next.js with Tailwind CSS</li>
        <li><Strong>Backend:</Strong> Node.js/Express with a Redis/Bull Queue for asynchronous job handling</li>
        <li><Strong>Database:</Strong> PostgreSQL</li>
        <li><Strong>AI/ML Services:</Strong> Google Gemini API Suite (Flash models for analysis, image, TTS, and Veo for video)</li>
        <li><Strong>Video Processing:</Strong> Gemini Veo or FFmpeg on a backend server</li>
        <li><Strong>Hosting:</Strong> Vercel (Frontend), AWS/GCP (Backend & Services)</li>
    </Ul>

    <H2>5. Cost Model & Pricing</H2>
    <H3>Estimated Cost Per Video (MVP): ~$0.35</H3>
    <Ul>
        <li><Strong>Gemini Flash (Script Analysis):</Strong> $0.05</li>
        <li><Strong>Gemini TTS (Narration):</Strong> $0.10</li>
        <li><Strong>Gemini Flash Image (per scene):</Strong> $0.15 (assuming ~5 scenes)</li>
        <li><Strong>Video Processing & Storage:</Strong> $0.05</li>
    </Ul>
    <H3>Pricing Tiers:</H3>
    <Ul>
        <li><Strong>Free:</Strong> 3 videos per month (with watermark).</li>
        <li><Strong>Pro:</Strong> $19/month for 30 videos (no watermark, 1080p output).</li>
        <li><Strong>Enterprise:</Strong> Custom pricing ($99+/month) for teams and API access.</li>
    </Ul>

    <H2>6. Technical Risks</H2>
    <Ul>
        <li><Strong>Inconsistent AI Output:</Strong> Visuals or tone may vary between scenes.</li>
        <li><Strong>Long Processing Times:</Strong> AI generation and video rendering can be slow.</li>
        <li><Strong>Cost Overruns:</Strong> Uncontrolled API usage on the free tier.</li>
        <li><Strong>Vendor Lock-in:</Strong> Heavy reliance on specific AI providers.</li>
    </ul >
  </div>
);