import { getLesson, getNextLesson, getPrevLesson } from "@/app/lib/actions";
import { notFound } from "next/navigation";
import { LessonView } from "@/components/LessonView";

export default async function LearnPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const slugPath = (await params).slug;
  
  if (slugPath.length < 2) {
      return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center">
             <div className="text-center py-20 text-white" suppressHydrationWarning>Please select a specific lesson.</div>
        </div>
      );
  }

  const courseSlug = slugPath[0];
  const lessonSlug = slugPath[1];

  const lesson = await getLesson(courseSlug, lessonSlug);

  if (!lesson) {
    return notFound();
  }

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
        <LessonView 
            lesson={lesson} 
            courseSlug={courseSlug} 
            nextLesson={nextLesson} 
            prevLesson={prevLesson} 
        />
       </div>
    </div>
  );
}
