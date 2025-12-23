import { Suspense } from "react";
import { db } from "@/db";
import LearnClient from "@/components/learn/LearnClient";
import { SkeletonCard } from "@/components/ui/loading-spinner";
import { GraduationCap, Sparkles } from "lucide-react";

// Server Component - Fetch data on the server
export default async function LearnPage() {
  // Fetch all published courses with lessons
  const coursesData = await db.query.courses.findMany({
    with: {
      lessons: true,
    },
    where: (courses, { eq }) => eq(courses.published, true),
  });

  // Transform data for client component
  const courses = coursesData.map(course => ({
    id: course.id,
    title: course.title,
    description: course.description,
    level: course.level,
    slug: course.slug,
    image: course.image,
    lessonCount: course.lessons?.length || 0,
    duration: `${Math.ceil((course.lessons?.length || 0) * 15 / 60)}h ${((course.lessons?.length || 0) * 15) % 60}m`,
  }));

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 bg-[#050505] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section - Server Rendered */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-mono mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            START_YOUR_JOURNEY
          </div>
          
          <div className="flex items-start gap-4 mb-6">
            <GraduationCap className="w-12 h-12 text-primary" />
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
                Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">Hub</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                Choose your path and start building real-world projects today.
                All courses include hands-on exercises and AI assistance.
              </p>
            </div>
          </div>

          {/* Stats - Server Rendered */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-primary mb-1">{courses.length}</div>
              <div className="text-sm text-gray-400">Courses</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-primary mb-1">
                {courses.reduce((acc, c) => acc + c.lessonCount, 0)}
              </div>
              <div className="text-sm text-gray-400">Lessons</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-gray-400">AI Support</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-primary mb-1">Free</div>
              <div className="text-sm text-gray-400">Forever</div>
            </div>
          </div>
        </div>

        {/* Client Component for Interactivity */}
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        }>
          <LearnClient courses={courses} />
        </Suspense>
      </div>
    </div>
  );
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour
