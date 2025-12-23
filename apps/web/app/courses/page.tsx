import { Suspense } from "react";
import { db } from "@/db";
import CoursesClient from "@/components/courses/CoursesClient";
import { SkeletonCard } from "@/components/ui/loading-spinner";
import { Sparkles } from "lucide-react";

// Server Component - Fetch data on the server
export default async function CoursesPage() {
  // Fetch courses with lesson count
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
    published: course.published,
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
            EXPLORE_COURSES
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Learn <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">Modern</span> Tech
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl">
            Master the latest technologies with interactive courses, hands-on exercises, and real-world projects.
          </p>
        </div>

        {/* Client Component for Interactivity */}
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        }>
          <CoursesClient courses={courses} />
        </Suspense>
      </div>
    </div>
  );
}

// Enable static generation for better performance
export const dynamic = 'force-dynamic'; // Change to 'force-static' after adding revalidation
// export const revalidate = 3600; // Revalidate every hour
