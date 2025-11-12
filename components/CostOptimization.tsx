
import React from 'react';

const OptimizationPoint = ({ title, description }: { title: string; description: string }) => (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
        <h4 className="font-semibold text-cyan-400">{title}</h4>
        <p className="text-gray-300">{description}</p>
    </div>
);

export const CostOptimization = () => (
    <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white">Cost Optimization Strategies</h2>
        <p className="text-gray-400">
            Managing AI pipeline costs is critical for profitability. These strategies aim to reduce expenses without a significant drop in output quality.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OptimizationPoint
                title="Use 'Flash' Models"
                description="Default to `gemini-2.5-flash` for text tasks and `gemini-2.5-flash-image` for images. They offer the best balance of cost and performance for this use case. Avoid larger models unless a 'Pro' user tier requires higher quality."
            />
            <OptimizationPoint
                title="Cache AI Responses"
                description="If a user regenerates a scene with the exact same text and style, serve the previously generated assets from your storage instead of calling the APIs again. Hash the inputs to create a unique cache key."
            />
            <OptimizationPoint
                title="Optimize Asset Storage"
                description="Implement lifecycle policies on your cloud storage. Move older, infrequently accessed assets to cheaper storage tiers (e.g., S3 Glacier). Compress images and audio where possible."
            />
            <OptimizationPoint
                title="Limit Free Tier Usage"
                description="Strictly enforce the 3 videos/month limit on the free tier. Also, consider limiting video length (e.g., max 10 scenes) for free users to prevent abuse and control costs."
            />
            <OptimizationPoint
                title="Efficient Job Processing"
                description="Use a queue system to process jobs. This allows you to control concurrency, preventing spikes in API calls that could lead to higher costs or hitting rate limits. It also makes your system more resilient."
            />
            <OptimizationPoint
                title="Preview Before Full Render"
                description="Generate static image thumbnails and audio clips for scene previews first. Only trigger the more expensive video generation/stitching process once the user approves the sequence, reducing wasted resources."
            />
        </div>
    </div>
);
