import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

// Skeleton for the publish form
const PublishSkeleton = () => (
  <div className="px-0 py-8 max-w-4xl mx-auto space-y-6 animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
    
    <div className="space-y-2">
      <div className="h-5 bg-gray-200 rounded w-1/6"></div>
      <div className="h-10 bg-gray-200 rounded-md"></div>
    </div>
    
    <div className="space-y-2">
      <div className="h-5 bg-gray-200 rounded w-1/6"></div>
      <div className="h-64 bg-gray-200 rounded-md"></div>
    </div>
    
    <div className="h-10 bg-gray-200 rounded-md w-24"></div>
  </div>
);

export function Publish() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(true); // Initial load state
    const [error, setError] = useState("");

    // Simulate initial form load (remove in production)
    useEffect(() => {
      const timer = setTimeout(() => setFormLoading(false), 1000);
      return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            setError("Title and content cannot be empty");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${BACKEND_URL}/blog`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ title, content })
            });

            if (!response.ok) throw new Error(await response.text());
            
            const data = await response.json();
            window.location.href = `/blog/${data.id}`;
        } catch (err) {
            //@ts-ignore
            setError(err.message || "Failed to publish blog post");
        } finally {
            setLoading(false);
        }
    };

    if (formLoading) return <PublishSkeleton />;

    return (
        <div className="px-0 py-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
            
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}
            
            <div className="mb-6">
                <label htmlFor="title" className="block text-lg font-medium mb-2">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your blog title..."
                    disabled={loading}
                />
            </div>
            
            <div className="mb-6">
                <label htmlFor="content" className="block text-lg font-medium mb-2">
                    Blog Content
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[300px]"
                    placeholder="Write your blog content here..."
                    disabled={loading}
                />
            </div>
            
            <button 
                onClick={handleSubmit}
                disabled={loading}
                className={`px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Publishing...
                    </span>
                ) : "Publish"}
            </button>
        </div>
    );
}