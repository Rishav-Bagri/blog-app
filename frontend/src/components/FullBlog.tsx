interface BlogType  {
    id: string
    title: string
    content: string
    published: boolean
    createdAt: string
    authorId: string
    authorName: string
  }

export const FullBlog=({blog}:{blog:BlogType})=>{
    return <div className="grid grid-cols-12 lg:px-65 md:px-50 sm:px-35 px-10 pt-10">
        <div className="col-span-9 ">
            <div className="text-4xl md:text-6xl font-bold break-words overflow-hidden">
                {blog.title}
            </div>

            <div className="py-6 font-thin text-gray-500 text">
                Posted on : {blog.createdAt.slice(0,10)}
            </div>
            <div className="text-lg">
                {blog.content}
            </div>
            
        </div>
        <div className=" pl-10 text-sm text-gray-700 col-span-3">
            Author
            <div className="text-2xl text-black font-bold pt-4">
                {blog.authorName || "anonymous"}
            </div>
        </div>
    </div>
}