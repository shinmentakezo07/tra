import { auth } from "@/auth";
import { getUserProgress, getCourses } from "@/app/lib/actions";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/DashboardClient";
import { db } from "@/db";

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  const progress = await getUserProgress();
  // Fetch courses with lessons to calculate totals
  const courses = await db.query.courses.findMany({
      with: {
          lessons: true
      }
  });

  return <DashboardClient user={session.user} progress={progress} courses={courses} />;
}
