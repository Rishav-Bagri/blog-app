import { useNavigate } from "react-router-dom";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlodSkeleton";
import { useBlogs } from "../hooks/useBlogs";

export function Home() {
  const { loading, blogs } = useBlogs();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div>
        <div className="flex justify-center">
          <div className="min-w-5xl">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to My Blog
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          <button
            onClick={() => navigate("/publish")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg text-lg transition-colors"
          >
            Start Writing
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Latest Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.authorName || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={blog.createdAt}
            />
          ))}
        </div>
      </div>

      <footer className="bg-gray-100 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} My Blog App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}