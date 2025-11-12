import React from 'react';

const RiskRow = ({ risk, impact, mitigation }: { risk: string; impact: string; mitigation: string; }) => (
    <tr className="border-b border-gray-700 hover:bg-gray-800/50">
        <td className="p-4 font-semibold text-red-400">{risk}</td>
        <td className="p-4 text-gray-300">{impact}</td>
        <td className="p-4 text-gray-300">{mitigation}</td>
    </tr>
);

export const RiskMitigation = () => (
    <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white">Technical Risk Mitigation</h2>
        <p className="text-gray-400">
            Proactively addressing potential challenges in a multi-service architecture is key to building a reliable product.
        </p>
        <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
                <thead className="bg-gray-800 text-cyan-400 uppercase text-sm">
                    <tr>
                        <th className="p-4">Risk</th>
                        <th className="p-4">Potential Impact</th>
                        <th className="p-4">Mitigation Strategy</th>
                    </tr>
                </thead>
                <tbody>
                    <RiskRow
                        risk="Multi-Vendor Dependency"
                        impact="An outage or breaking change in any one of the AI services (OpenAI, DALL-E, ElevenLabs, Replicate) can halt the entire video generation pipeline."
                        mitigation="Abstract each external API call behind its own service module. Implement robust monitoring and alerts for each service. Have a clear 'failed' state in the UI to communicate issues to users."
                    />
                    <RiskRow
                        risk="Complex Job Orchestration"
                        impact="Failures in the job queue or worker logic can lead to stuck jobs, incomplete videos, and inconsistent database states."
                        mitigation="Use BullMQ's built-in features for job retries with exponential backoff. Implement transactional database updates where possible. Create a dashboard to monitor queue health and failed jobs."
                    />
                    <RiskRow
                        risk="Long Processing Times"
                        impact="Even with asynchronous processing, the end-to-end time can be long, leading to poor user experience."
                        mitigation="Provide granular, real-time progress updates to the user (e.g., 'Step 3/6: Generating audio...'). Optimize by running asset generation jobs in parallel for each scene."
                    />
                    <RiskRow
                        risk="API Secret Management"
                        impact="Leaked API keys for various services could lead to significant financial loss and security breaches."
                        mitigation="Store all secrets in environment variables, never in code. Use a secret management service (e.g., Doppler, AWS Secrets Manager) for production environments. Regularly rotate keys."
                    />
                    <RiskRow
                        risk="Cost Overruns"
                        impact="Bugs in the job processing logic or abuse of the free tier could lead to unexpectedly high bills from multiple AI vendors."
                        mitigation="Implement a robust credit-checking system before any job is enqueued. Set up billing alerts for every single provider (OpenAI, AWS, Replicate, etc.). Add rate limiting to the API."
                    />
                </tbody>
            </table>
        </div>
    </div>
);
