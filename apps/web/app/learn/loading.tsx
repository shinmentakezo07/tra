import { SkeletonCard } from "@/components/ui/loading-spinner";

export default function LearnLoading() {
  return (
    <div className="min-h-screen pt-24 px-4 pb-12 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 space-y-4">
          <div className="h-8 w-64 bg-white/5 rounded animate-pulse" />
          <div className="h-12 w-full max-w-2xl bg-white/5 rounded animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
