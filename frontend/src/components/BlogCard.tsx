import { useNavigate } from "react-router-dom"
import { Avatar } from "./Avatar"

interface BlogCardProps {
    id: string,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
}
export const BlogCard = ({id, authorName, title, content, publishedDate }: BlogCardProps) => {
    const navigate=useNavigate()
    return <div onClick={()=>{
        console.log(id);
        
        navigate(`/blog/${id}`)
    }} className="cursor-pointer">
        <div className="flex items-center mb-2">
            <Avatar name={authorName} />
            <div className=" flex ml-3  items-center">
                <div className="font-normal ">
                    {authorName}
                </div>
                <span className="flex mx-2 size-1  bg-slate-300 rounded-full"></span>
                <div className="font-thin text-gray-500 text-md">
                    {publishedDate.slice(0,10)}
                </div>
            </div>
        </div>
        <div className="font-bold text-xl">
            {title}
        </div>
        <div className="text-gray-700 font-normal text-md">
            {content.length >= 300 ? content.slice(0, 300) + "..." : content}
        </div>
        <div className="flex items-center text-gray-600 mt-7 gap-1 mb-2 text-sm  w-fit px-1 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock-fading-icon lucide-clock-fading"><path d="M12 2a10 10 0 0 1 7.38 16.75" /><path d="M12 6v6l4 2" /><path d="M2.5 8.875a10 10 0 0 0-.5 3" /><path d="M2.83 16a10 10 0 0 0 2.43 3.4" /><path d="M4.636 5.235a10 10 0 0 1 .891-.857" /><path d="M8.644 21.42a10 10 0 0 0 7.631-.38" /></svg>
        {`${Math.ceil((content.length ) / 250)} ${Math.ceil((content.length ) / 250) === 1 ? "minute" : "minutes"
                } read`}
        </div>
        <div className="border-1 border-slate-100 border-bottom"></div>
    </div>
}