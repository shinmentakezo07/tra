export default function LessonLoading() {
    return (
      <div className="h-[calc(100vh-64px)] flex animate-pulse bg-[#050505]">
        {/* Sidebar Skeleton */}
        <div className="w-64 border-r border-white/5 hidden md:flex flex-col">
          <div className="p-4 border-b border-white/5">
            <div className="h-6 w-32 bg-white/10 rounded-lg" />
          </div>
          <div className="flex-1 p-4 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-white/5 rounded-lg" />
                <div className="space-y-1 pl-4">
                  <div className="h-3 w-full bg-white/5 rounded-lg" />
                  <div className="h-3 w-3/4 bg-white/5 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Main Content Skeleton */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Lesson Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 border-r border-white/5">
            <div className="space-y-4">
              <div className="h-10 w-2/3 bg-white/10 rounded-lg" />
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-white/5 rounded-full" />
                <div className="h-6 w-20 bg-white/5 rounded-full" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="h-4 w-full bg-white/5 rounded-lg" />
              <div className="h-4 w-full bg-white/5 rounded-lg" />
              <div className="h-4 w-3/4 bg-white/5 rounded-lg" />
            </div>
  
            <div className="h-64 w-full bg-white/5 rounded-xl" />
            
            <div className="space-y-4">
              <div className="h-4 w-full bg-white/5 rounded-lg" />
              <div className="h-4 w-5/6 bg-white/5 rounded-lg" />
            </div>
          </div>
  
          {/* Code Editor Skeleton */}
          <div className="flex-1 flex flex-col bg-[#0A0A0A] lg:w-1/2">
            <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2">
              <div className="h-6 w-24 bg-white/10 rounded-lg" />
            </div>
            <div className="flex-1 bg-white/5" />
            <div className="h-48 border-t border-white/5 bg-[#0A0A0A] p-4">
               <div className="h-6 w-32 bg-white/10 rounded-lg mb-2" />
               <div className="h-full bg-white/5 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }
