"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Filter, ArrowRight, BookOpen, Clock, BarChart, Code2, Star, Sparkles } from "lucide-react";

const courses = [
  { 
    title: "HTML5 Mastery", 
    slug: "html5-mastery",
    description: "Master the semantic structure of the modern web. Build accessible and SEO-friendly pages.",
    category: "Frontend", 
    level: "Beginner", 
    lessons: 45, 
    duration: "10h",
    rating: 4.8,
    color: "from-orange-500 to-red-600"
  },
  { 
    title: "Advanced CSS3 & Animations", 
    slug: "advanced-css",
    description: "Create stunning, responsive layouts and complex animations without JavaScript.",
    category: "Frontend", 
    level: "Intermediate", 
    lessons: 32, 
    duration: "8h",
    rating: 4.9,
    color: "from-blue-400 to-blue-600"
  },
  { 
    title: "JavaScript: The Hard Parts", 
    slug: "js-hard-parts",
    description: "Deep dive into closures, prototypes, async patterns, and the event loop.",
    category: "Language", 
    level: "Advanced", 
    lessons: 60, 
    duration: "15h",
    rating: 5.0,
    color: "from-yellow-400 to-yellow-600"
  },
  { 
    title: "React.js 19 & Server Components", 
    slug: "react-19",
    description: "Build modern full-stack applications with the latest React features and Next.js.",
    category: "Framework", 
    level: "Intermediate", 
    lessons: 55, 
    duration: "12h",
    rating: 4.9,
    color: "from-cyan-400 to-blue-500"
  },
  { 
    title: "Next.js Full Stack", 
    slug: "nextjs-fullstack",
    description: "From database to deployment. Build scalable apps with the App Router.",
    category: "Fullstack", 
    level: "Advanced", 
    lessons: 40, 
    duration: "14h",
    rating: 4.7,
    color: "from-violet-600 to-indigo-600"
  },
  { 
    title: "Python for Data Science", 
    slug: "python-data-science",
    description: "Analyze data, create visualizations, and train machine learning models.",
    category: "Data", 
    level: "Beginner", 
    lessons: 70, 
    duration: "20h",
    rating: 4.8,
    color: "from-green-400 to-emerald-600"
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen pt-24 px-4 pb-12 bg-[#050505] relative overflow-hidden">
      {/* Ambient Background */}
       <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
       </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-4">
                    <Sparkles className="w-3 h-3" />
                    PREMIUM CONTENT
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                  Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Knowledge</span>
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Detailed guides and interactive lessons designed to take you from beginner to expert. 
                  Choose your path and start building.
                </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-3 w-full md:w-auto"
            >
                <div className="relative flex-1 md:w-80 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search courses..." 
                        className="w-full pl-10 h-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:ring-2 ring-primary/50 focus:border-primary/50 outline-none transition-all hover:bg-white/10"
                    />
                </div>
                <button className="h-12 w-12 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all">
                    <Filter className="w-5 h-5" />
                </button>
            </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, i) => (
                <motion.div
                    key={course.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.2 }}
                    className="group relative flex flex-col h-full"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-3xl transform transition-transform group-hover:scale-[1.02] duration-300" />
                    <div className="relative h-full bg-[#0A0A0A] border border-white/10 rounded-3xl p-1 overflow-hidden hover:border-primary/50 transition-colors duration-300 flex flex-col">
                        
                        {/* Card Header with Gradient */}
                        <div className={`h-32 rounded-2xl bg-gradient-to-br ${course.color} p-6 relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-black/10" />
                            <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                                <Code2 className="w-24 h-24 text-white" />
                            </div>
                            
                            <div className="relative z-10 flex justify-between items-start">
                                <span className="px-3 py-1 rounded-full bg-black/20 backdrop-blur-md text-white text-xs font-medium border border-white/10">
                                    {course.category}
                                </span>
                                <div className="flex items-center gap-1 bg-black/20 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs font-bold text-white">{course.rating}</span>
                                </div>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">{course.title}</h3>
                                <p className="text-sm text-gray-400 line-clamp-2">{course.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <BarChart className="w-4 h-4 text-primary/70" />
                                    <span>{course.level}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <BookOpen className="w-4 h-4 text-primary/70" />
                                    <span>{course.lessons} Lessons</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Clock className="w-4 h-4 text-primary/70" />
                                    <span>{course.duration}</span>
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-white/5">
                                <Link 
                                    href={`/learn/${course.slug}`}
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-primary hover:text-white text-white font-medium transition-all duration-300 group/btn"
                                >
                                    <span>Start Course</span>
                                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
