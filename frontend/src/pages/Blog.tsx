import { useParams } from "react-router-dom"
import { useBlog } from "../hooks/useBlogs"
import { FullBlog } from "../components/FullBlog"
import { BlogSkeleton } from "../components/BlodSkeleton"

export function Blog(){
    const {id}=useParams()
    const {loading,blog}=useBlog({
        id:id||"",
    })
    return <div>
        {loading?<div ><BlogSkeleton></BlogSkeleton></div>:null}
        {blog &&<FullBlog blog={blog} />}
    </div>
}