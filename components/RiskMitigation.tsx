
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
            Proactively addressing potential technical challenges is key to a smooth development process and a reliable product.
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
                        risk="Inconsistent AI Output"
                        impact="Generated scenes lack visual or tonal consistency, creating a disjointed video."
                        mitigation="Use highly structured prompts. For images, prepend a consistent style prefix (e.g., 'minimalist flat illustration style, ...'). For script analysis, use `responseSchema` to enforce JSON output."
                    />
                    <RiskRow
                        risk="Long Processing Times"
                        impact="Users abandon the process if video generation takes too long, leading to poor time-to-value."
                        mitigation="Use an asynchronous job queue. Provide real-time progress updates on the UI (e.g., 'Generating scene 2 of 5...'). Process scenes in parallel to reduce total wait time."
                    />
                    <RiskRow
                        risk="API Rate Limiting/Errors"
                        impact="Generation jobs fail, leading to user frustration and incomplete videos."
                        mitigation="Implement an exponential backoff retry mechanism for all API calls. Log errors for monitoring. Control job concurrency to stay within API rate limits."
                    />
                    <RiskRow
                        risk="Cost Overruns"
                        impact="Uncontrolled API usage leads to an unprofitable service, especially from free tier users."
                        mitigation="Strictly enforce free tier limits. Implement caching for identical requests. Use cost-effective models like `gemini-2.5-flash`. Set up billing alerts on your Google Cloud project."
                    />
                    <RiskRow
                        risk="Vendor Lock-in"
                        impact="High dependency on the Gemini API makes it difficult to switch providers if costs increase or services change."
                        mitigation="Abstract all API calls behind your own service layer (e.g., `aiService.generateImage()`). This makes it easier to swap out the underlying implementation with a different provider in the future."
                    />
                </tbody>
            </table>
        </div>
    </div>
);
