export const BlogSkeleton = () => {
    return (
        <div className="max-w-4xl mx-auto p-4 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex items-center space-x-4 mb-6">
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
            
            {/* Title Skeleton */}
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            
            {/* Content Skeleton */}
            <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            
            {/* Footer Skeleton */}
            <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
        </div>
    );
};