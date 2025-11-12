import React from 'react';

const CodeBlock = ({ children, lang = 'json' }: { children: React.ReactNode, lang?: string }) => (
    <pre className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
        <code className={`language-${lang} text-cyan-300`}>{children}</code>
    </pre>
);

const Endpoint = ({ method, path, description }: { method: 'POST' | 'GET' | 'PUT' | 'DELETE', path: string, description: string }) => {
    const methodColors = {
        'POST': 'bg-green-500/20 text-green-400',
        'GET': 'bg-blue-500/20 text-blue-400',
        'PUT': 'bg-yellow-500/20 text-yellow-400',
        'DELETE': 'bg-red-500/20 text-red-400',
    };
    return (
        <div className="mb-2">
            <span className={`px-2 py-1 rounded-md text-xs font-bold mr-3 ${methodColors[method]}`}>{method}</span>
            <code className="text-md font-mono text-white">{path}</code>
            <p className="text-gray-400 text-sm mt-1 ml-2">{description}</p>
        </div>
    );
};


export const ApiStrategy = () => (
    <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white">REST API Architecture Design</h2>
        {/* FIX: The `<token>` placeholder was being parsed as a JSX element, causing an error. It has been escaped to be treated as plain text. */}
        <p className="text-gray-400">
            The API is built on Fastify and follows standard RESTful principles. Authentication is handled via JWTs, which must be sent in the `Authorization: Bearer &lt;token&gt;` header for all protected routes.
        </p>

        {/* --- AUTHENTICATION --- */}
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-cyan-400">Authentication Endpoints</h3>
            <p className="text-gray-400 text-sm">Endpoints for user registration, login, and session verification.</p>
            
            <div>
                <Endpoint method="POST" path="/auth/register" description="Creates a new user account." />
                <h4 className="font-semibold text-gray-200 mt-2 mb-1">Request Body:</h4>
                <CodeBlock>{`{
  "email": "user@example.com",
  "password": "a_strong_password"
}`}</CodeBlock>
                <h4 className="font-semibold text-gray-200 mt-2 mb-1">Response (201 Created):</h4>
                <CodeBlock>{`{
  "id": "user-uuid-123",
  "email": "user@example.com",
  "plan": "free",
  "creditsRemaining": 10
}`}</CodeBlock>
            </div>
            
            <div>
                <Endpoint method="POST" path="/auth/login" description="Authenticates a user and returns a JWT." />
                 <h4 className="font-semibold text-gray-200 mt-2 mb-1">Request Body:</h4>
                <CodeBlock>{`{
  "email": "user@example.com",
  "password": "a_strong_password"
}`}</CodeBlock>
                <h4 className="font-semibold text-gray-200 mt-2 mb-1">Response (200 OK):</h4>
                <CodeBlock>{`{
  "accessToken": "ey...your...jwt"
}`}</CodeBlock>
            </div>

            <div>
                <Endpoint method="GET" path="/auth/me" description="Retrieves the profile of the currently authenticated user." />
                <h4 className="font-semibold text-gray-200 mt-2 mb-1">Response (200 OK):</h4>
                <CodeBlock>{`{
  "id": "user-uuid-123",
  "email": "user@example.com",
  "plan": "pro",
  "creditsRemaining": 485
}`}</CodeBlock>
            </div>
        </div>

        {/* --- VIDEOS --- */}
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-cyan-400">Video Endpoints (Protected)</h3>
            <p className="text-gray-400 text-sm">Core endpoints for creating and managing video projects.</p>
            
            <div>
                <Endpoint method="POST" path="/videos" description="Creates a new video project and enqueues it for processing." />
                <h4 className="font-semibold text-gray-200 mt-2 mb-1">Request Body:</h4>
                <CodeBlock>{`{
  "title": "My Awesome Video",
  "script": "Scene 1: A hero emerges...",
  "style": "minimalist_flat",
  "voice": "alloy"
}`}</CodeBlock>
                <h4 className="font-semibold text-gray-200 mt-2 mb-1">Response (202 Accepted):</h4>
                <CodeBlock>{`{
  "id": "video-uuid-456",
  "status": "queued",
  "message": "Video project created and queued for processing."
}`}</CodeBlock>
            </div>

            <div>
                <Endpoint method="GET" path="/videos" description="Retrieves a list of videos for the authenticated user." />
                <h4 className="font-semibold text-gray-200 mt-2 mb-1">Response (200 OK):</h4>
                <CodeBlock>{`[
  {
    "id": "video-uuid-456",
    "title": "My Awesome Video",
    "status": "processing",
    "thumbnailUrl": "https://s3...",
    "createdAt": "2023-10-27T10:00:00Z"
  }
]`}</CodeBlock>
            </div>

            <div>
                <Endpoint method="GET" path="/videos/:id" description="Retrieves the detailed status for a single video project." />
                <h4 className="font-semibold text-gray-200 mt-2 mb-1">Response (200 OK):</h4>
                <CodeBlock>{`{
  "id": "video-uuid-456",
  "title": "My Awesome Video",
  "status": "completed",
  "videoUrl": "https://s3...",
  "thumbnailUrl": "https://s3...",
  "scenes": [
    { "sceneNumber": 1, "status": "completed", "imageUrl": "..." },
    { "sceneNumber": 2, "status": "completed", "imageUrl": "..." }
  ],
  "createdAt": "2023-10-27T10:00:00Z"
}`}</CodeBlock>
            </div>

             <div>
                <Endpoint method="DELETE" path="/videos/:id" description="Deletes a video project and associated assets." />
                <h4 className="font-semibold text-gray-200 mt-2 mb-1">Response (204 No Content):</h4>
                <p className="text-gray-400 text-sm">No response body on successful deletion.</p>
            </div>

        </div>

        {/* --- ACCOUNT & BILLING --- */}
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-cyan-400">Account & Billing Endpoints (Protected)</h3>
            <p className="text-gray-400 text-sm">Endpoints for managing user account details and subscriptions.</p>

            <div>
                <Endpoint method="GET" path="/account/profile" description="Gets the user's profile, plan, and credit status." />
                 <h4 className="font-semibold text-gray-200 mt-2 mb-1">Response (200 OK):</h4>
                <CodeBlock>{`{
  "email": "user@example.com",
  "plan": "pro",
  "creditsRemaining": 485,
  "memberSince": "2023-10-01T00:00:00Z"
}`}</CodeBlock>
            </div>
             <div>
                <Endpoint method="POST" path="/billing/portal" description="Creates and returns a URL for the Stripe Customer Portal." />
                 <h4 className="font-semibold text-gray-200 mt-2 mb-1">Response (200 OK):</h4>
                <CodeBlock>{`{
  "url": "https://billing.stripe.com/p/session/..."
}`}</CodeBlock>
            </div>
        </div>

        {/* --- ERROR HANDLING --- */}
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-cyan-400">Common Status Codes & Error Responses</h3>
            <p className="text-gray-400 text-sm">The API uses standard HTTP status codes to indicate success or failure.</p>
            <ul className="list-disc list-inside text-gray-300">
                <li><code className="text-white">200 OK</code> - Request succeeded.</li>
                <li><code className="text-white">201 Created</code> - Resource was successfully created.</li>
                <li><code className="text-white">202 Accepted</code> - Request accepted for processing, but not yet completed.</li>
                <li><code className="text-white">204 No Content</code> - Request succeeded, but there is no content to return.</li>
                <li><code className="text-white">400 Bad Request</code> - The server cannot process the request due to a client error (e.g., malformed JSON).</li>
                <li><code className="text-white">401 Unauthorized</code> - Authentication is required and has failed or has not been provided.</li>
                <li><code className="text-white">403 Forbidden</code> - The authenticated user does not have permission to access the resource.</li>
                <li><code className="text-white">404 Not Found</code> - The requested resource could not be found.</li>
                <li><code className="text-white">500 Internal Server Error</code> - An unexpected error occurred on the server.</li>
            </ul>
             <h4 className="font-semibold text-gray-200 mt-4 mb-1">Example Error Response (400 Bad Request):</h4>
            <CodeBlock>{`{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Request body must have a 'title' property of type string."
}`}</CodeBlock>
        </div>

    </div>
);