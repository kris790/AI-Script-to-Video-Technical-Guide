import React from 'react';

const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h2>;
const H3 = ({ children }: { children: React.ReactNode }) => <h3 className="text-xl font-bold text-cyan-400 mt-6 mb-3">{children}</h3>;
const P = ({ children }: { children: React.ReactNode }) => <p className="text-gray-400 mb-4">{children}</p>;
const Ul = ({ children }: { children: React.ReactNode }) => <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">{children}</ul>;
const Strong = ({ children }: { children: React.ReactNode }) => <strong className="font-semibold text-gray-200">{children}</strong>;
const Code = ({ children }: { children: React.ReactNode }) => <code className="text-xs bg-gray-700 p-1 rounded font-mono">{children}</code>;


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
        <li>Users must provide a title for their video project.</li>
        <li>A simple text area for users to paste or write their script.</li>
        <li>AI-powered analysis to automatically break the script down into logical scenes.</li>
        <li>
            <Strong>Input Validation:</Strong>
            <ul className="list-['-_'] list-inside pl-4 mt-2 space-y-1">
                <li><Strong>Length Constraints:</Strong> The script must not be empty and should be limited to a maximum length (e.g., 5,000 characters for the MVP) to manage processing time and cost.</li>
                <li><Strong>Content Moderation:</Strong> Before sending the script to the AI for analysis, a basic check for harmful or inappropriate content will be performed to ensure safety and compliance.</li>
            </ul>
        </li>
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
    <P>This multi-step process is handled by the backend worker.</P>
    <Ul>
        <li>
            <Strong>Scene Clip Generation (Gemini Veo):</Strong> For each scene, the generated image asset is passed to the Gemini Veo model with the narration audio. The model is prompted to add subtle camera movements to the static image, creating a dynamic video clip that matches the audio's duration. This creates a more engaging "Ken Burns" style effect instead of a static slideshow. The prompts will be dynamically adapted to the scene's content, following these patterns:
            <ul className="list-['-_'] list-inside pl-4 mt-2 space-y-1">
                <li><em className="text-gray-400">Example (Slow Zoom In): "Animate this image with a gentle, slow zoom-in effect on the central subject over 5 seconds. The final clip duration must match the provided audio."</em></li>
                <li><em className="text-gray-400">Example (Cinematic Pan): "Create a slow, cinematic pan from left to right across this landscape image over a 6-second duration."</em></li>
                <li><em className="text-gray-400">Example (Ken Burns Effect): "Apply a subtle Ken Burns effect, slowly zooming in on the character's face while panning slightly upwards over 7 seconds."</em></li>
                <li><em className="text-gray-400">Example (Reveal/Zoom Out): "Start with a close-up on the book on the table, then slowly zoom out to reveal the entire cozy library scene over 6 seconds."</em></li>
            </ul>
        </li>
        <li><Strong>Clip Concatenation (FFmpeg):</Strong> After all individual scene clips are generated, a final worker job uses FFmpeg to concatenate them sequentially into a single video stream.</li>
        <li>
            <Strong>Audio Mixing & Overlay (FFmpeg):</Strong> The same FFmpeg process will overlay a selected background music track. This is achieved using FFmpeg's powerful <Code>filter_complex</Code> argument to precisely manage audio levels.
             <div className="my-2 space-y-2 text-gray-400 border-l-2 border-gray-600 pl-4">
                <div><Strong>Specific Command:</Strong> The core of the command will be: <Code>-filter_complex "[0:a]volume=1.0[a0];[1:a]volume=0.15[a1];[a0][a1]amix=inputs=2:duration=longest"</Code></div>
                <div>
                    <Strong>Parameter Breakdown:</Strong>
                     <ul className="list-['--'] list-inside pl-4 mt-1 space-y-1">
                        <li><Code>[0:a]volume=1.0[a0]</Code>: Takes the first audio input (the narration from the video clips) and sets its volume to 100% (<Code>1.0</Code>). It's labeled <Code>[a0]</Code>.</li>
                        <li><Code>[1:a]volume=0.15[a1]</Code>: Takes the second audio input (the background music track) and lowers its volume to 15% (<Code>0.15</Code>). It's labeled <Code>[a1]</Code>.</li>
                        <li><Code>[a0][a1]amix=inputs=2...</Code>: The <Code>amix</Code> (audio mix) filter combines the <Code>[a0]</Code> and <Code>[a1]</Code> streams into a single output track, ensuring the narration is clearly audible over the music.</li>
                    </ul>
                </div>
             </div>
        </li>
        <li><Strong>Watermark Application (FFmpeg):</Strong> For videos created on the free tier, a "Story Flow" watermark will be applied. Pro-tier videos are generated without a watermark, aligning with future plans for custom branding options.</li>
        <li><Strong>Final Render:</Strong> The final output is a 720p MP4 file, encoded with web-friendly settings and stored in cloud storage, ready for preview and download.</li>
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