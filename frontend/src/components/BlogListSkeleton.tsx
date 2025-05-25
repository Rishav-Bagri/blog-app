export const BlogListSkeleton = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="p-6  rounded-lg animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    <div className="mt-4 flex items-center space-x-3">
                        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};