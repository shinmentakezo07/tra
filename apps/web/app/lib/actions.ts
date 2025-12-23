"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users, courses, lessons, progress, enrollments } from "@/db/schema";
import { eq, and, or, sql } from "drizzle-orm";
import { signIn, signOut, auth } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const SignupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
});

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function signup(prevState: State, formData: FormData) {
  const validatedFields = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Account.",
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    // Check if email already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
        return {
            message: "Email already exists.",
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return {
      message: "Database Error: Failed to Create Account.",
    };
  }
  
  // Sign in the user immediately after signup
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    console.error("Auto-login error:", error);
  }
  
  redirect("/dashboard");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function authenticateSocial(provider: string) {
    await signIn(provider);
}

export async function forgotPassword(prevState: any, formData: FormData) {
    const email = formData.get("email");
    // Mock logic: In a real app, send an email here.
    // For now, we'll just pretend we did.
    if (!email) return { message: "Email is required" };
    
    // Validate email format
    const emailSchema = z.string().email();
    const result = emailSchema.safeParse(email);
    
    if (!result.success) {
        return { message: "Invalid email address" };
    }

    return { message: "If an account exists, a password reset link has been sent." };
}

export async function signOutAction() {
  "use server";
  await signOut();
}

// Course & Lesson Actions

export async function getCourses() {
  return await db.query.courses.findMany({
    where: eq(courses.published, true),
  });
}

export async function getCourseBySlug(slug: string) {
  // Backward-compatible aliases for older slugs used in the UI.
  // Example: the Learn UI uses `react-19`, while the DB seed historically used `react-mastery`.
  const aliases: Record<string, string> = {
    "react-19": "react-mastery",
  };

  const normalized = aliases[slug] ?? slug;

  return await db.query.courses.findFirst({
    where: normalized === slug ? eq(courses.slug, slug) : or(eq(courses.slug, slug), eq(courses.slug, normalized)),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
      },
    },
  });
}

export async function getLesson(courseSlug: string, lessonSlug: string) {
  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, courseSlug),
  });

  if (!course) return null;

  return await db.query.lessons.findFirst({
    where: and(
      eq(lessons.courseId, course.id),
      eq(lessons.slug, lessonSlug)
    ),
  });
}

export async function getNextLesson(courseId: string, currentOrder: number) {
  return await db.query.lessons.findFirst({
    where: and(
      eq(lessons.courseId, courseId),
      eq(lessons.order, currentOrder + 1)
    ),
  });
}

export async function getPrevLesson(courseId: string, currentOrder: number) {
  return await db.query.lessons.findFirst({
    where: and(
      eq(lessons.courseId, courseId),
      eq(lessons.order, currentOrder - 1)
    ),
  });
}

export async function markLessonComplete(lessonId: string) {
  const session = await auth();
  if (!session?.user?.email) return null;

  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email),
  });

  if (!user) return null;

  // Check if already completed
  const existingProgress = await db.query.progress.findFirst({
    where: and(
      eq(progress.userId, user.id),
      eq(progress.lessonId, lessonId)
    ),
  });

  if (existingProgress?.completed) {
    return;
  }

  // Award XP and Update Streak
  const today = new Date();
  const lastActivity = user.lastActivityDate ? new Date(user.lastActivityDate) : null;
  
  let streakIncrement = 0;
  let resetStreak = false;

  if (lastActivity) {
    const diffTime = Math.abs(today.getTime() - lastActivity.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays === 1) {
        // Activity was yesterday (approx), increment streak
        // Note: This is a naive check. Ideally use "start of day" comparison.
        streakIncrement = 1;
    } else if (diffDays > 1) {
        // Missed a day
        resetStreak = true;
        streakIncrement = 1; // Reset to 1
    }
    // If diffDays == 0 (same day), do nothing to streak
  } else {
      streakIncrement = 1; // First activity
  }

  await db.transaction(async (tx) => {
      if (!existingProgress) {
          await tx.insert(progress).values({
            userId: user.id,
            lessonId: lessonId,
            completed: true,
            completedAt: new Date(),
          });
      } else {
           await tx.update(progress)
            .set({ completed: true, completedAt: new Date() })
            .where(eq(progress.id, existingProgress.id));
      }

      // Update User XP and Streak
      const updates: any = {
        xp: sql`${users.xp} + 10`,
        lastActivityDate: today,
      };

      if (resetStreak) {
          updates.streakCurrent = 1;
      } else if (streakIncrement > 0) {
          updates.streakCurrent = sql`${users.streakCurrent} + ${streakIncrement}`;
      }
      
      // Update Max Streak
      if (resetStreak || streakIncrement > 0) {
         // We need to check if current streak > max streak. 
         // Since we are in sql template, it's hard to do conditional max update in one go without raw sql complexity.
         // For simplicity, let's trust the user reads the new value or we do it in app logic if strict correctness needed.
         // Actually, let's just update streakCurrent first, then we might need another query to update max if we want to be precise.
         // Or simpler: just update streakCurrent. Max streak logic can be: 
         // updates.streakMax = sql`GREATEST(${users.streakMax}, ${users.streakCurrent} + ${streakIncrement})` (Postgres specific)
         updates.streakMax = sql`GREATEST(${users.streakMax}, ${resetStreak ? 1 : sql`${users.streakCurrent} + ${streakIncrement}`})`;
      }

      await tx.update(users)
        .set(updates)
        .where(eq(users.id, user.id));
  });

  revalidatePath("/dashboard");
}

export async function getUserProgress() {
    const session = await auth();
    if (!session?.user?.email) return [];
  
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.email, session.user.email),
      });
    
      if (!user) return [];

      return await db.query.progress.findMany({
          where: eq(progress.userId, user.id),
      });
    } catch (error) {
      console.error("Failed to fetch user progress:", error);
      return [];
    }
}

export async function updateProfile(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) {
    return { message: "Not authenticated" };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
  });

  const validated = schema.safeParse({ name, email });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  try {
    const currentUser = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
    });

    if (!currentUser) return { message: "User not found" };

    if (email !== currentUser.email) {
      const existing = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (existing) {
        return { message: "Email already in use" };
      }
    }

    await db.update(users)
      .set({ name, email })
      .where(eq(users.id, currentUser.id));

    revalidatePath("/dashboard/settings");
    revalidatePath("/", "layout"); 
    return { message: "Profile updated successfully" };
  } catch (e) {
    return { message: "Failed to update profile" };
  }
}

export async function changePassword(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) {
    return { message: "Not authenticated" };
  }

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (newPassword !== confirmPassword) {
    return { message: "New passwords do not match" };
  }

  if (newPassword.length < 6) {
    return { message: "Password must be at least 6 characters" };
  }

  try {
    const userRecord = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
    });

    if (!userRecord || !userRecord.password) {
      return { message: "User not found or invalid state" };
    }

    const passwordsMatch = await bcrypt.compare(currentPassword, userRecord.password);
    if (!passwordsMatch) {
      return { message: "Incorrect current password" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, userRecord.id));

    return { message: "Password updated successfully" };
  } catch (e) {
    return { message: "Failed to update password" };
  }
}
