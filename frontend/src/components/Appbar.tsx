import { useNavigate } from "react-router-dom"
import { Avatar } from "./Avatar"
import { useState, useRef, useEffect } from "react"

export const Appbar = () => {
    const navigate = useNavigate()
    const [showPopup, setShowPopup] = useState(false)
    const popupRef = useRef<HTMLDivElement>(null)
    const name: string = localStorage.getItem("userName") || ""

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowPopup(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleSignOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
        navigate("/signin")
    }

    return (
        <div className="h-15 border-b border-gray-200 px-20 flex justify-between items-center">
            <div 
                onClick={() => navigate("/")} 
                className="font-bold text-2xl cursor-pointer hover:text-gray-600 transition-colors"
            >
                Blogs
            </div>
            
            <div className="flex gap-10 items-center">
                <div 
                    onClick={() => navigate("/publish")} 
                    className="text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
                >
                    Publish
                </div>
                <div 
                    onClick={() => navigate("/blogs")} 
                    className="text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
                >
                    Blogs
                </div>
                
                {name ? (
                    <div className="relative" ref={popupRef}>
                        <div 
                            onClick={() => setShowPopup(!showPopup)}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <Avatar name={name} />
                        </div>
                        
                        {showPopup && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                                    Hello, {name}
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button 
                        onClick={() => navigate("/signin")}
                        className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </div>
    )
}