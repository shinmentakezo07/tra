export default function CoursesLoading() {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-8 animate-pulse">
        <div className="space-y-2">
          <div className="h-10 w-48 bg-white/10 rounded-lg" />
          <div className="h-4 w-96 bg-white/5 rounded-lg" />
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col h-full bg-[#0A0A0A]/50 border border-white/5 rounded-2xl overflow-hidden">
              <div className="aspect-video bg-white/5" />
              <div className="p-6 space-y-4 flex-1">
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-white/10 rounded-lg" />
                  <div className="h-4 w-full bg-white/5 rounded-lg" />
                  <div className="h-4 w-2/3 bg-white/5 rounded-lg" />
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <div className="h-4 w-16 bg-white/5 rounded-lg" />
                  <div className="h-8 w-24 bg-white/10 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
