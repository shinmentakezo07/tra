"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Filter, ArrowRight, BookOpen, Clock, BarChart, X } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  slug: string;
  image?: string | null;
  published: boolean;
  lessonCount: number;
  duration: string;
}

interface CoursesClientProps {
  courses: Course[];
}

export default function CoursesClient({ courses }: CoursesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = !selectedLevel || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <>
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <div className="relative flex-1 md:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..." 
            className="w-full pl-10 pr-10 h-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:ring-2 ring-primary/50 focus:border-primary/50 outline-none transition-all hover:bg-white/10"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className={`h-12 px-4 flex items-center gap-2 rounded-xl border transition-all ${
              selectedLevel 
                ? "bg-primary/10 border-primary/30 text-primary" 
                : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20"
            }`}
          >
            <Filter className="w-5 h-5" />
            {selectedLevel && <span className="text-sm font-medium">{selectedLevel}</span>}
          </button>
          {showFilterMenu && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-full mt-2 right-0 bg-[#0A0A0A] border border-white/10 rounded-xl p-2 shadow-2xl z-10 min-w-[180px]"
            >
              <div className="px-3 py-2 text-xs font-mono text-gray-500 uppercase">Level Filter</div>
              {["Beginner", "Intermediate", "Advanced"].map(level => (
                <button
                  key={level}
                  onClick={() => {
                    setSelectedLevel(level);
                    setShowFilterMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedLevel === level 
                      ? "bg-primary/10 text-primary" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {level}
                </button>
              ))}
              {selectedLevel && (
                <button
                  onClick={() => {
                    setSelectedLevel(null);
                    setShowFilterMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors mt-1 border-t border-white/5"
                >
                  Clear Filter
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Course Grid or Empty State */}
      {filteredCourses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-full text-center py-20"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6">
            <Search className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No courses found</h3>
          <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedLevel(null);
            }}
            className="px-6 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
          >
            Clear all filters
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                href={`/learn/${course.slug}`}
                className="group block h-full"
              >
                <div className="h-full bg-[#0A0A0A] rounded-3xl border border-white/10 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,157,0.1)]">
                  {/* Course Image/Gradient */}
                  <div className={`h-32 ${course.image || 'bg-gradient-to-br from-violet-600 to-blue-600'} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/40 backdrop-blur-sm text-white border border-white/20">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Course Meta */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      {course.lessonCount && (
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.lessonCount} lessons</span>
                        </div>
                      )}
                      {course.duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <BarChart className="w-4 h-4" />
                        <span>{course.level}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      <span>Start Learning</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
