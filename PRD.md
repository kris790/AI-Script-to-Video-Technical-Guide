# Product Requirements Document (PRD): Story Flow Script-to-Video Automation Tool

## 1. Project Context

We are building a tool that transforms written scripts into animated videos using AI. The target audience includes social media managers, educators, and small business owners who need to create professional-looking videos efficiently without requiring technical video production skills. The primary goal is to democratize video creation for content marketing and educational purposes.

## 2. Core Hypothesis & Success Metrics

**Hypothesis:** Content creators will adopt an AI tool that seamlessly transforms their scripts into engaging videos, significantly reducing the time, cost, and technical barriers associated with traditional video production.

-   **Success Metric:** Achieve 100 active free-tier users who each create 3 or more videos within the first 30 days of launch.
-   **Conversion Metric:** 15% of these active free-tier users convert to a paid subscription.
-   **Retention Metric:** 50% of new users return to the platform within 7 days of their first session.
-   **Time-to-Value:** The average time for a new user to complete their first video is under 10 minutes.

## 3. MVP Feature Set

The MVP is focused on delivering a complete, end-to-end "script-to-video" experience.

-   **Script Input & Analysis:**
    -   A simple text area for users to paste or write their script.
    -   AI-powered analysis to automatically break the script down into logical scenes.
    -   **Input Validation:**
        -   **Length Constraints:** The script must not be empty and should be limited to a maximum length (e.g., 5,000 characters for the MVP) to manage processing time and cost.
        -   **Content Moderation:** Before sending the script to the AI for analysis, a basic check for harmful or inappropriate content will be performed to ensure safety and compliance.
-   **Automated Scene Generation:**
    -   AI-powered image generation for each scene based on the script analysis.
    -   Users can choose from 2-3 predefined visual styles (e.g., "Minimalist Flat," "Watercolor," "Corporate").
-   **Voiceover Generation:**
    -   Text-to-speech (TTS) integration to create narration for each scene.
    -   Users can select from a library of 3-5 distinct voice options.
-   **Video Assembly & Finalization:** This multi-step process is handled by the backend worker.
    -   **Scene Clip Generation (Gemini Veo):** For each scene, the generated image asset is passed to the Gemini Veo model with the narration audio. The model is prompted to add subtle camera movements to the static image, creating a dynamic video clip that matches the audio's duration. This creates a more engaging "Ken Burns" style effect instead of a static slideshow. The prompts will be dynamically adapted to the scene's content, following these patterns:
        -   *Example (Slow Zoom In):* `"Animate this image with a gentle, slow zoom-in effect on the central subject over 5 seconds. The final clip duration must match the provided audio."*
        -   *Example (Cinematic Pan):* `"Create a slow, cinematic pan from left to right across this landscape image over a 6-second duration."*
        -   *Example (Ken Burns Effect):* `"Apply a subtle Ken Burns effect, slowly zooming in on the character's face while panning slightly upwards over 7 seconds."*
        -   *Example (Reveal/Zoom Out):* `"Start with a close-up on the book on the table, then slowly zoom out to reveal the entire cozy library scene over 6 seconds."*
    -   **Clip Concatenation (FFmpeg):** After all individual scene clips are generated, a final worker job uses FFmpeg to concatenate them sequentially into a single video stream.
    -   **Audio Mixing & Overlay (FFmpeg):** The same FFmpeg process will overlay a selected background music track. This is achieved using FFmpeg's powerful `filter_complex` argument to precisely manage audio levels.
        -   **Specific Command:** The core of the command will be: `-filter_complex "[0:a]volume=1.0[a0];[1:a]volume=0.15[a1];[a0][a1]amix=inputs=2:duration=longest"`
        -   **Parameter Breakdown:**
            -   `[0:a]volume=1.0[a0]`: Takes the first audio input (the narration from the video clips) and sets its volume to 100% (`1.0`). It's labeled `[a0]`.
            -   `[1:a]volume=0.15[a1]`: Takes the second audio input (the background music track) and lowers its volume to 15% (`0.15`). It's labeled `[a1]`.
            -   `[a0][a1]amix=inputs=2...`: The `amix` (audio mix) filter combines the `[a0]` and `[a1]` streams into a single output track, ensuring the narration is clearly audible over the music.
    -   **Final Render:** The final output is a 720p MP4 file, encoded with web-friendly settings and stored in cloud storage, ready for preview and download.
-   **Editing & Preview:**
    -   A simple editing interface allowing users to reorder scenes via drag-and-drop.
    -   Ability to edit the text of a scene and regenerate the narration.
    -   Preview thumbnails for each scene before committing to a full video render.
-   **Output & Sharing:**
    -   A preview player to watch the fully rendered video.
    -   A download button to save the final video in 720p resolution (MP4 format).
-   **Error Handling:**
    -   Clear user feedback on the status of video generation (e.g., "Generating scene 2/5...").
    -   Graceful handling of API errors with options for the user to retry.

## 4. Technical Stack

-   **Frontend:** React/Next.js with Tailwind CSS
-   **Backend:** Node.js/Express with a Redis/Bull Queue for asynchronous job handling
-   **Database:** PostgreSQL
-   **AI/ML Services:** Google Gemini API Suite (Flash models for analysis, image, TTS, and Veo for video)
-   **Video Processing:** Gemini Veo or FFmpeg on a backend server
-   **Hosting:** Vercel (Frontend), AWS/GCP (Backend & Services)

## 5. Cost Model & Pricing

-   **Estimated Cost Per Video (MVP):** ~$0.35
    -   **Gemini Flash (Script Analysis):** $0.05
    -   **Gemini TTS (Narration):** $0.10
    -   **Gemini Flash Image (per scene):** $0.15 (assuming ~5 scenes)
    -   **Video Processing & Storage:** $0.05
-   **Pricing Tiers:**
    -   **Free:** 3 videos per month (with watermark).
    -   **Pro:** $19/month for 30 videos (no watermark, 1080p output).
    -   **Enterprise:** Custom pricing ($99+/month) for teams and API access.

## 6. Technical Risks

-   **Inconsistent AI Output:** Visuals or tone may vary between scenes.
-   **Long Processing Times:** AI generation and video rendering can be slow.
-   **Cost Overruns:** Uncontrolled API usage on the free tier.
-   **Vendor Lock-in:** Heavy reliance on specific AI providers.