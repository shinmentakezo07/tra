import Link from "next/link";
import { getCourseBySlug, getLesson, getNextLesson, getPrevLesson } from "@/app/lib/actions";
import { notFound } from "next/navigation";
import { LessonView } from "@/components/LessonView";
import { BookOpen, Clock, BarChart, ArrowRight, CheckCircle2 } from "lucide-react";

export default async function LearnPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const slugPath = (await params).slug;

  const courseSlug = slugPath[0];

  // 1) Course overview: /learn/[course]
  if (slugPath.length === 1) {
    const course = await getCourseBySlug(courseSlug);
    if (!course) return notFound();

    const lessons = course.lessons ?? [];
    const firstLesson = lessons[0];

    return (
      <div className="min-h-screen bg-[#050505] relative overflow-hidden">
        {/* Ambient Background */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-60" />
          <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-violet-600/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16">
          {/* Breadcrumb */}
          <div className="text-xs font-mono text-gray-500 mb-8 flex items-center gap-2">
            <Link href="/learn" className="hover:text-white transition-colors">LEARN</Link>
            <span className="opacity-30">/</span>
            <span className="text-white font-bold uppercase tracking-wider">{course.slug}</span>
          </div>

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
                {course.title}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                {course.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{course.level}</span>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-violet-300" />
                  <span className="font-semibold">{lessons.length} lessons</span>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-300" />
                  <span className="font-semibold">Self-paced</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                {firstLesson ? (
                  <Link
                    href={`/learn/${course.slug}/${firstLesson.slug}`}
                    className="relative group/btn inline-flex items-center justify-center gap-2 px-6 py-4 font-mono text-sm font-bold tracking-wider overflow-hidden transition-all rounded-2xl"
                  >
                    <div className="absolute inset-0 bg-white group-hover/btn:bg-cyan-400 transition-all duration-300" />
                    <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                    <span className="relative z-10 text-black">START COURSE</span>
                    <ArrowRight className="w-4 h-4 relative z-10 text-black group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 text-sm">
                    No lessons published yet.
                  </div>
                )}

                <Link
                  href="/learn"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-colors"
                >
                  Back to Learn
                </Link>
              </div>
            </div>

            {/* Lessons list */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                  <div className="text-xs font-mono font-bold tracking-wider text-gray-400 uppercase">
                    Course Modules
                  </div>
                  <div className="text-[10px] font-mono text-gray-500">
                    {lessons.length} total
                  </div>
                </div>
                <div className="max-h-[520px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {lessons.map((l, idx) => (
                    <Link
                      key={l.id}
                      href={`/learn/${course.slug}/${l.slug}`}
                      className="group flex items-start gap-3 px-5 py-4 border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <div className="mt-0.5 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-gray-300">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-white truncate group-hover:text-primary transition-colors">
                          {l.title}
                        </div>
                        <div className="text-[10px] font-mono text-gray-500 truncate mt-1">
                          SLUG: {l.slug}
                        </div>
                      </div>
                      <div className="text-gray-600 group-hover:text-gray-300 transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2) Lesson view: /learn/[course]/[lesson]
  if (slugPath.length < 2) return notFound();

  const lessonSlug = slugPath[1];
  const lesson = await getLesson(courseSlug, lessonSlug);
  if (!lesson) return notFound();

  const nextLesson = await getNextLesson(lesson.courseId, lesson.order);
  const prevLesson = await getPrevLesson(lesson.courseId, lesson.order);

  return (
    <div className="min-h-screen bg-[#050505] relative">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <LessonView lesson={lesson} courseSlug={courseSlug} nextLesson={nextLesson} prevLesson={prevLesson} />
      </div>
    </div>
  );
}
