import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

interface BlogType  {
  id: string
  title: string
  content: string
  published: boolean
  createdAt: string
  authorId: string
  authorName: string
}

interface BlogResponse  {
  id: string
  title: string
  content: string
  published: boolean
  createdAt: string
  authorId: string
  author: {
    name: string
  }
}

export const useBlog=({id}:{id:string})=>{
    const [loading, setLoading] = useState(true)
  const [blog, setBlog] = useState<BlogType>()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/blog/${id}`, {
          headers: {
            'authorization': `Bearer ${localStorage["token"]}`,
            'Content-Type': 'application/json'
          }
        })

        const data = await res.json()

        setBlog(data)
      } catch (err) {
        console.error("Failed to fetch blogs", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  return {
    loading,
    blog,
  }
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState<BlogType[]>([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/blog/bulk`, {
          headers: {
            'authorization': `Bearer ${localStorage["token"]}`,
            'Content-Type': 'application/json'
          }
        })

        const data = await res.json()

        if (data.blog && Array.isArray(data.blog)) {
          const updatedBlogs: BlogType[] = data.blog.map((blog: BlogResponse) => ({
            id: blog.id,
            title: blog.title,
            content: blog.content,
            published: blog.published,
            createdAt: blog.createdAt,
            authorId: blog.authorId,
            authorName: blog.author?.name || "Unknown"
          }))

          setBlogs(prev => {
            const existingIds = new Set(prev.map(b => b.id))
            const newBlogs = updatedBlogs.filter(b => !existingIds.has(b.id))
            return [...prev, ...newBlogs]
          })
        } else {
          console.error("Invalid blog data format:", data.blog)
        }
      } catch (err) {
        console.error("Failed to fetch blogs", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  return {
    loading,
    blogs,
  }
}
