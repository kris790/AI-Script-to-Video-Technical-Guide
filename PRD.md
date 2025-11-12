# Product Requirements Document (PRD): Story Flow AI Script-to-Video Automation

## 1. Project Context
We are building a tool that transforms written scripts into animated videos using AI. The target audience includes social media managers, educators, and small business owners who need to create professional-looking videos efficiently without requiring technical video production skills.

## 2. Core Hypothesis & Success Metrics
- **Hypothesis**: Content creators will adopt an AI tool that seamlessly transforms their scripts into engaging videos, significantly reducing time, cost, and technical barriers.
- **Success Metric**: Achieve 100 email signups from a targeted ad campaign within 2 weeks, with a >5% conversion rate.
- **Time-to-Value**: The average time for a new user to complete their first video is under 10 minutes.

## 3. Monetization Model
- **Free Tier**: 10 credits/month (1 basic 30-second video), 480p resolution with watermark.
- **Starter Tier ($9/month)**: 100 credits/month, no watermark, 720p resolution, 2 visual styles.
- **Pro Tier ($29/month)**: 500 credits/month, 1080p resolution, all styles and voices, priority processing.
- **Business Tier ($99/month)**: 2000 credits/month, custom branding, API access.

### Credit Costs:
- 30-second video (3 scenes): 10 credits
- 60-second video (6 scenes): 20 credits
- HD export: +5 credits
- Background music: +2 credits
- Custom voice: +3 credits

## 4. Technical Architecture
- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Fastify with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Queue**: BullMQ with Redis for job processing
- **Video Processing**: Replicate API (serverless video processing)
- **Storage**: AWS S3 with lifecycle policies
- **Deployment**: Railway or Render (for MVP)
- **Monitoring**: Sentry (errors) + LogTail (logs)

## 5. Database Schema
```sql
CREATE TABLE "users" (
  "id" UUID PRIMARY KEY,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password_hash" VARCHAR(255) NOT NULL,
  "plan" VARCHAR(50) DEFAULT 'free',
  "credits_remaining" INT DEFAULT 10,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "videos" (
  "id" UUID PRIMARY KEY,
  "user_id" UUID REFERENCES "users"("id"),
  "title" VARCHAR(255) NOT NULL,
  "script" TEXT NOT NULL,
  "status" VARCHAR(50) DEFAULT 'queued', -- queued, processing, completed, failed
  "video_url" VARCHAR(500),
  "thumbnail_url" VARCHAR(500),
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "scenes" (
  "id" UUID PRIMARY KEY,
  "video_id" UUID REFERENCES "videos"("id"),
  "scene_number" INT NOT NULL,
  "script_text" TEXT NOT NULL,
  "image_url" VARCHAR(500),
  "audio_url" VARCHAR(500),
  "video_clip_url" VARCHAR(500),
  "status" VARCHAR(50) DEFAULT 'pending', -- pending, processing, completed, failed
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);
```

## 6. Video Generation Pipeline
1.  **Script Analysis**: Break script into logical scenes using GPT-4o-mini.
2.  **Scene Image Generation**: Generate images for each scene using DALL-E 3.
3.  **TTS Audio Generation**: Create narration for each scene using ElevenLabs.
4.  **Video Assembly**: Combine images and audio with Ken Burns effects using the Replicate API.
5.  **Audio Mixing**: Add background music with proper volume levels.
6.  **Final Render**: Output video in the appropriate resolution based on the user's tier.

## 7. Cost Model (Per Video Estimate)
- **Script Analysis (GPT-4o-mini)**: $0.02
- **Image Generation (DALL-E 3)**: $0.20 ($0.04 per image, avg. 5 scenes)
- **TTS (ElevenLabs)**: $0.05
- **Video Processing (Replicate API)**: $0.10
- **Storage & Egress**: $0.03
- **Infrastructure Allocation**: $0.15
- **Total**: ~$0.55 per video

## 8. Validation Approach
Before full development:
1.  Create a landing page with a clear value proposition and pricing tiers.
2.  Run a $200 ad campaign targeting social media managers, content creators, and educators.
3.  **Goal**: Achieve 100 email signups in 2 weeks with a >5% conversion rate.
4.  If successful, proceed with MVP development.

## 9. Implementation Timeline
- **Phase 0**: Validation (3 weeks)
- **Phase 1**: Technical Spike (1 week) - Create an end-to-end prototype.
- **Phase 2**: MVP Development (12 weeks)
  - **Weeks 1-3**: Core infrastructure and user authentication.
  - **Weeks 4-6**: Script analysis and scene generation pipeline.
  - **Weeks 7-9**: TTS integration and video assembly via Replicate.
  - **Weeks 10-12**: Frontend UI, progress tracking, and testing.
