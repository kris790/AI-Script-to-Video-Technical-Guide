import React from 'react';

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
        <code className="language-sql text-cyan-300">{children}</code>
    </pre>
);

export const DatabaseSchema = () => (
    <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white">PostgreSQL Database Schema</h2>
        <p className="text-gray-400">
            This schema is designed to be relational and tracks the entire lifecycle of a video creation project, from the initial script to the final rendered video.
        </p>

        <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">`users` Table</h3>
            <p className="text-gray-400 mb-2">Stores user account information.</p>
            <CodeBlock>{`
CREATE TABLE "users" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" TEXT NOT NULL UNIQUE,
  "created_at" TIMESTAMPTZ DEFAULT now(),
  "subscription_tier" TEXT DEFAULT 'free',
  "videos_created_this_month" INT DEFAULT 0
);
            `}</CodeBlock>
        </div>

        <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">`projects` Table</h3>
            <p className="text-gray-400 mb-2">Represents a single video project.</p>
            <CodeBlock>{`
CREATE TABLE "projects" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" UUID REFERENCES "users"("id"),
  "title" TEXT NOT NULL,
  "original_script" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'pending', -- pending, processing, complete, failed
  "watermark_url" TEXT, -- URL for a custom or default watermark. NULL for no watermark.
  "final_video_url" TEXT,
  "created_at" TIMESTAMPTZ DEFAULT now(),
  "updated_at" TIMESTAMPTZ DEFAULT now()
);
            `}</CodeBlock>
        </div>

        <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">`scenes` Table</h3>
            <p className="text-gray-400 mb-2">Stores the structured data for each scene within a project.</p>
            <CodeBlock>{`
CREATE TABLE "scenes" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "project_id" UUID REFERENCES "projects"("id") ON DELETE CASCADE,
  "scene_number" INT NOT NULL,
  "visual_prompt" TEXT NOT NULL,
  "narration_text" TEXT NOT NULL,
  "image_asset_url" TEXT,
  "audio_asset_url" TEXT,
  "video_clip_url" TEXT,
  "status" TEXT NOT NULL DEFAULT 'pending' -- pending, generating, complete, failed
);
            `}</CodeBlock>
        </div>
        
         <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">`jobs` Table</h3>
            <p className="text-gray-400 mb-2">Tracks the status of background jobs for observability.</p>
            <CodeBlock>{`
CREATE TABLE "jobs" (
  "id" VARCHAR(255) PRIMARY KEY, -- Bull job ID
  "project_id" UUID REFERENCES "projects"("id") ON DELETE CASCADE,
  "scene_id" UUID REFERENCES "scenes"("id") ON DELETE CASCADE,
  "job_type" TEXT NOT NULL, -- e.g., 'analyze_script', 'generate_image', 'generate_audio'
  "status" TEXT NOT NULL DEFAULT 'waiting', -- waiting, active, completed, failed
  "attempts" INT DEFAULT 0,
  "error_message" TEXT,
  "created_at" TIMESTAMPTZ DEFAULT now(),
  "processed_at" TIMESTAMPTZ,
  "completed_at" TIMESTAMPTZ
);
            `}</CodeBlock>
        </div>
    </div>
);