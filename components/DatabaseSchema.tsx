import React from 'react';

const CodeBlock = ({ children, lang }: { children: React.ReactNode, lang: 'sql' | 'prisma' }) => (
    <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
        <code className={`language-${lang} text-cyan-300`}>{children}</code>
    </pre>
);

export const DatabaseSchema = () => (
    <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white">PostgreSQL & Prisma Schema</h2>
        <p className="text-gray-400">
            This schema is designed to track user data, video projects, and the status of individual scenes. Using Prisma as the ORM provides type safety and simplifies database interactions.
        </p>

        <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">1. PostgreSQL Schema (SQL)</h3>
            <p className="text-gray-400 mb-4">The raw SQL for creating the database tables and indexes.</p>
            
            <h4 className="text-lg font-semibold text-gray-200 mt-4 mb-2">`users` Table</h4>
            <CodeBlock lang="sql">{`
CREATE TABLE "users" (
  "id" UUID PRIMARY KEY,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password_hash" VARCHAR(255) NOT NULL,
  "plan" VARCHAR(50) DEFAULT 'free',
  "credits_remaining" INT DEFAULT 10,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);
            `}</CodeBlock>

            <h4 className="text-lg font-semibold text-gray-200 mt-4 mb-2">`videos` Table</h4>
            <CodeBlock lang="sql">{`
CREATE TABLE "videos" (
  "id" UUID PRIMARY KEY,
  "user_id" UUID REFERENCES "users"("id"),
  "title" VARCHAR(255) NOT NULL,
  "script" TEXT NOT NULL,
  "status" VARCHAR(50) DEFAULT 'queued', -- queued, processing, completed, failed
  "video_url" VARCHAR(500),
  "thumbnail_url" VARCHAR(500),
  "error_message" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);
            `}</CodeBlock>

            <h4 className="text-lg font-semibold text-gray-200 mt-4 mb-2">`scenes` Table</h4>
            <CodeBlock lang="sql">{`
CREATE TABLE "scenes" (
  "id" UUID PRIMARY KEY,
  "video_id" UUID REFERENCES "videos"("id") ON DELETE CASCADE,
  "scene_number" INT NOT NULL,
  "script_text" TEXT NOT NULL,
  "image_url" VARCHAR(500),
  "audio_url" VARCHAR(500),
  "video_clip_url" VARCHAR(500),
  "status" VARCHAR(50) DEFAULT 'pending', -- pending, processing, completed, failed
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);
            `}</CodeBlock>
        </div>

        <div>
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">2. Prisma Schema</h3>
            <p className="text-gray-400 mb-4">The corresponding schema for the Prisma ORM, which generates a type-safe client for the backend.</p>
            <CodeBlock lang="prisma">{`
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                String   @id @default(uuid())
  email             String   @unique
  passwordHash      String
  plan              String   @default("free")
  creditsRemaining  Int      @default(10)
  videos            Video[]
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model Video {
  id              String   @id @default(uuid())
  title           String
  script          String
  status          String   @default("queued") // queued, processing, completed, failed
  videoUrl        String?
  thumbnailUrl    String?
  errorMessage    String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  user            User     @relation(fields: [userId], references: [id])
  userId          String
  scenes          Scene[]
}

model Scene {
  id              String   @id @default(uuid())
  sceneNumber     Int
  scriptText      String
  imageUrl        String?
  audioUrl        String?
  videoClipUrl    String?
  status          String   @default("pending") // pending, processing, completed, failed
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  video           Video    @relation(fields: [videoId], references: [id], onDelete: Cascade)
  videoId         String
}
            `}</CodeBlock>
        </div>
    </div>
);
