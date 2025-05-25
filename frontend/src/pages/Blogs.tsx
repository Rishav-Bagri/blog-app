import { BlogCard } from "../components/BlogCard";
import { BlogListSkeleton } from "../components/BlogListSkeleton";
import { useBlogs } from "../hooks/useBlogs";

export function Blogs(){
  const {loading,blogs}=useBlogs()
  
  return <div className="space-y-3 pt-10  lg:px-95 md:px-65 sm:px-40 px-10">
    {blogs.map(blog => (
      <BlogCard
        id={blog.id}
        title={blog.title}
        content={blog.content}
        authorName={blog.authorName}
        publishedDate={new Date(blog.createdAt).toDateString()}
      />
    ))}
    {loading==true?<div><BlogListSkeleton></BlogListSkeleton></div>:null}
  
    
  </div>
  
  
}