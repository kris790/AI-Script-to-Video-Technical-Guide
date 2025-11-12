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
            With a multi-vendor AI pipeline, managing costs is crucial. These strategies aim to reduce expenses while maintaining quality and performance, directly reflecting the cost model in the PRD.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OptimizationPoint
                title="Use Cost-Effective Models"
                description="Default to smaller, faster models like GPT-4o-mini for script analysis. They provide a great balance of performance and low cost, forming the cheapest part of the AI pipeline."
            />
            <OptimizationPoint
                title="Leverage Serverless Video Processing"
                description="Using the Replicate API for video processing avoids the need to manage and pay for dedicated GPU servers, which are expensive. You only pay for the compute time you use, which is ideal for variable workloads."
            />
            <OptimizationPoint
                title="Implement S3 Lifecycle Policies"
                description="Automatically transition generated assets (images, audio, videos) to cheaper, long-term storage tiers like S3 Glacier after a certain period (e.g., 30 days) to reduce storage costs."
            />
            <OptimizationPoint
                title="Strictly Enforce Credit System"
                description="The credit system is the primary control against cost overruns from the free tier. Ensure that no jobs can be started if a user has insufficient credits for the requested video length and features."
            />
            <OptimizationPoint
                title="Cache AI Responses"
                description="For identical scene text and style choices, consider caching the generated image and audio. Create a hash of the inputs to use as a cache key to avoid redundant, costly API calls."
            />
            <OptimizationPoint
                title="Optimize Job Concurrency"
                description="Tune the BullMQ workers to control the number of concurrent jobs sent to each AI service. This prevents hitting API rate limits, which can lead to failed jobs and wasted resources on retries."
            />
        </div>
    </div>
);
