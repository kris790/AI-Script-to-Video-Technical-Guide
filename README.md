Story Flow Script-to-Video Automation
License Node Version Next.js Status

Transform written scripts into professional animated videos with AI. ScriptAI automates the entire video creation process—from scene generation and voiceovers to final assembly—making high-quality video content accessible to everyone.

📖 Overview
ScriptAI is built for content creators, marketers, educators, and small business owners who need to produce engaging video content without the time, cost, or technical skills of traditional video production. By leveraging state-of-the-art AI models for script analysis, image generation, and text-to-speech, our platform turns a simple text script into a polished, animated video in minutes.

This project follows a "PRD-First" methodology. You can view the complete Product Requirements Document here.

✨ Key Features (MVP)
📝 Script Input & Analysis: Paste your script and let AI break it down into logical scenes.
🎨 Automated Scene Generation: Generate custom visuals for each scene based on the script's context.
🗣️ AI Voiceovers: Convert script text into natural-sounding speech with a selection of voice options.
🎵 Background Music: Add royalty-free background music to enhance your videos.
✏️ Simple Editing: Reorder scenes, make lightweight text edits, and preview before final generation.
⚙️ Asynchronous Processing: Videos are generated in the background, with email notifications upon completion.
📥 Easy Export: Preview and download your final video in standard formats (720p).
🛠️ Tech Stack
Frontend: Next.js 14, React, Tailwind CSS, TypeScript
Backend: Node.js, Express, TypeScript
Database: PostgreSQL with Prisma ORM
Queue: Redis with Bull Queue for job processing
AI Services:
OpenAI (GPT-4o-mini) for script analysis
ElevenLabs for text-to-speech
DALL-E 3 for image generation
Video Processing: AWS MediaConvert
Storage & CDN: AWS S3 & CloudFront
Authentication: NextAuth.js
Deployment: Vercel (Frontend), AWS EC2 (Backend)
📁 Project Structure
.
├── docs/                  # Project documentation (PRD, etc.)
├── frontend/              # Next.js frontend application
│   ├── src/
│   │   ├── app/           # App Router pages and layouts
│   │   ├── components/    # Reusable React components
│   │   └── lib/           # Utility functions and client-side config
│   ├── public/            # Static assets
│   └── package.json
├── backend/               # Node.js/Express API server
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # Database models (Prisma)
│   │   ├── services/      # Business logic (AI integrations, etc.)
│   │   ├── jobs/          # Bull queue job definitions
│   │   └── utils/         # Server-side utilities
│   ├── prisma/            # Database schema and migrations
│   └── package.json
├── .env.example           # Example environment variables
└── README.md
🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js 18.0.0 or later
pnpm, npm, or yarn
PostgreSQL database
Redis server
Installation
Clone the repository

git clone https://github.com/your-username/scriptai.git
cd scriptai
Install dependencies Install dependencies for both the frontend and backend.

# Install frontend dependencies
cd frontend
pnpm install

# Install backend dependencies
cd ../backend
pnpm install
Set up environment variables Copy the .env.example file to .env in the backend directory and fill in your API keys and database URLs.

cp ../.env.example .env
Set up the database Run Prisma migrations to create your database schema and generate the Prisma Client.

# From the /backend directory
pnpm prisma migrate dev
pnpm prisma generate
Start the development servers You will need to run the frontend and backend servers in separate terminal instances.

Terminal 1: Start the backend server

# From the /backend directory
pnpm dev
The API will be running on http://localhost:3001.

Terminal 2: Start the frontend server

# From the /frontend directory
pnpm dev
The web application will be running on http://localhost:3000.

⚙️ Environment Variables
Create a .env file in the backend directory with the following variables:

# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Redis
REDIS_URL="redis://localhost:6379"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="a_very_secret_key"

# AI Service API Keys
OPENAI_API_KEY="your_openai_api_key"
ELEVENLABS_API_KEY="your_elevenlabs_api_key"

# AWS Configuration
AWS_ACCESS_KEY_ID="your_aws_access_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
AWS_REGION="your_aws_region" # e.g., us-east-1
AWS_S3_BUCKET="your_s3_bucket_name"
AWS_CLOUDFRONT_DOMAIN="your_cloudfront_distribution_domain"

# Application Config
NODE_ENV="development"
🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
📄 License
Distributed under the MIT License. See LICENSE.txt for more information.

📞 Contact
Your Name - @your_twitter - project@email.com

Project Link: https://github.com/your-username/scriptai