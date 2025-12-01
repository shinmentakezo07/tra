import { pgTable, text, timestamp, uuid, integer, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  role: text("role", { enum: ["user", "admin"] }).default("user").notNull(),
  xp: integer("xp").default(0).notNull(),
  streakCurrent: integer("streak_current").default(0).notNull(),
  streakMax: integer("streak_max").default(0).notNull(),
  lastActivityDate: timestamp("last_activity_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  slug: text("slug").notNull().unique(),
  level: text("level").notNull(), // Beginner, Intermediate, Advanced
  image: text("image"), // URL or color gradient class
  published: boolean("published").default(false).notNull(),
});

export const lessons = pgTable("lessons", {
  id: uuid("id").defaultRandom().primaryKey(),
  courseId: uuid("course_id").references(() => courses.id).notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  order: integer("order").notNull(),
  content: text("content").notNull(), // Markdown content
  codeSnippet: text("code_snippet"), // Initial code for the editor
  exercises: text("exercises"), // JSON string of exercises
  quiz: text("quiz"), // JSON string of quiz questions
});

export const enrollments = pgTable("enrollments", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  courseId: uuid("course_id").references(() => courses.id).notNull(),
  enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
});

export const progress = pgTable("progress", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  lessonId: uuid("lesson_id").references(() => lessons.id).notNull(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completed_at"),
});

// Relations
export const coursesRelations = relations(courses, ({ many }) => ({
  lessons: many(lessons),
  enrollments: many(enrollments),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  course: one(courses, {
    fields: [lessons.courseId],
    references: [courses.id],
  }),
  progress: many(progress),
}));

export const usersRelations = relations(users, ({ many }) => ({
  enrollments: many(enrollments),
  progress: many(progress),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, {
    fields: [enrollments.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
}));

export const progressRelations = relations(progress, ({ one }) => ({
  user: one(users, {
    fields: [progress.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [progress.lessonId],
    references: [lessons.id],
  }),
}));
