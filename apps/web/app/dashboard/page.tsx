import { auth } from "@/auth";
import { getUserProgress, getCourses } from "@/app/lib/actions";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/DashboardClient";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch full user data including stats
  let fullUser = session.user;
  if (session.user.email) {
    const dbUser = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
    });
    if (dbUser) {
      fullUser = { ...session.user, ...dbUser };
    }
  }

  const progress = await getUserProgress();
  // Fetch courses with lessons to calculate totals
  const courses = await db.query.courses.findMany({
      with: {
          lessons: true
      }
  });

  return <DashboardClient user={fullUser} progress={progress} courses={courses} />;
}
