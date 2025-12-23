"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Search, Filter, ArrowRight, BookOpen, Clock, BarChart, Code2, Star, Hash,
  Trophy, Brain, Terminal, ChevronRight, Zap, Lock, Play, Sparkles
} from "lucide-react";
import CodeEditor from "@/components/CodeEditor";

// --- Mock Data (Combined) ---
const courses = [
  { 
    id: "c1",
    type: "course",
    title: "HTML5 Mastery", 
    slug: "html5-mastery",
    description: "Master the semantic structure of the modern web. Build accessible and SEO-friendly pages.",
    category: "Frontend", 
    level: "Beginner", 
    lessons: 45, 
    duration: "10h",
    rating: 4.8,
    color: "from-orange-500 to-red-600",
    icon: Code2
  },
  { 
    id: "c2",
    type: "course",
    title: "Advanced CSS3 & Animations", 
    slug: "advanced-css",
    description: "Create stunning, responsive layouts and complex animations without JavaScript.",
    category: "Frontend", 
    level: "Intermediate", 
    lessons: 32, 
    duration: "8h",
    rating: 4.9,
    color: "from-blue-400 to-blue-600",
    icon: Sparkles
  },
  { 
    id: "c3",
    type: "course",
    title: "JavaScript: The Hard Parts", 
    slug: "js-hard-parts",
    description: "Deep dive into closures, prototypes, async patterns, and the event loop.",
    category: "Language", 
    level: "Advanced", 
    lessons: 60, 
    duration: "15h",
    rating: 5.0,
    color: "from-yellow-400 to-yellow-600",
    icon: Terminal
  },
  { 
    id: "c4",
    type: "course",
    title: "React.js 19 & Server Components", 
    slug: "react-19",
    description: "Build modern full-stack applications with the latest React features and Next.js.",
    category: "Framework", 
    level: "Intermediate", 
    lessons: 55, 
    duration: "12h",
    rating: 4.9,
    color: "from-cyan-400 to-blue-500",
    icon: Zap
  },
];

const exercises = [
  {
    id: "e1",
    type: "exercise",
    title: "Reverse a String",
    difficulty: "Easy",
    language: "javascript",
    description: "Write a function that reverses a string. The input string is given as an argument.",
    starterCode: `function reverseString(str) {
  // Your code here
  return str;
}

console.log(reverseString("hello"));`,
    testCase: "hello -> olleh",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: "e2",
    type: "exercise",
    title: "FizzBuzz",
    difficulty: "Easy",
    language: "python",
    description: "Write a program that prints the numbers from 1 to 100. For multiples of three print 'Fizz' instead of the number and for the multiples of five print 'Buzz'.",
    starterCode: `def fizz_buzz(n):
    # Your code here
    pass

fizz_buzz(15)`,
    testCase: "3 -> Fizz, 5 -> Buzz, 15 -> FizzBuzz",
    color: "from-purple-500 to-pink-600"
  },
  {
    id: "e3",
    type: "exercise",
    title: "Two Sum",
    difficulty: "Medium",
    language: "javascript",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    starterCode: `function twoSum(nums, target) {
  // Your code here
}

console.log(twoSum([2,7,11,15], 9));`,
    testCase: "[2,7,11,15], 9 -> [0, 1]",
    color: "from-orange-500 to-amber-600"
  }
];

// --- Components ---

const CourseCard = ({ course }: { course: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.3 }}
    className="group relative flex flex-col h-full"
  >
    {/* Subtle glow on hover */}
    <div className="absolute inset-0 bg-blue-600/10 rounded-xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
    
    <div className="relative h-full bg-gradient-to-br from-[#0A0A0A] to-[#050505] border border-white/10 rounded-3xl p-1 overflow-hidden hover:border-primary/50 transition-all duration-500 flex flex-col shadow-2xl">
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500" />
      
      {/* Card Header */}
      <div className={`h-40 rounded-2xl bg-gradient-to-br ${course.color} p-6 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Animated background pattern */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
        
        <div className="absolute -right-4 -bottom-4 opacity-30 transform rotate-12 group-hover:scale-125 group-hover:rotate-6 transition-all duration-700">
           <course.icon className="w-28 h-28 text-white" />
        </div>
        
        <div className="relative z-10 flex justify-between items-start">
            <span className="px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md text-white text-xs font-bold border border-white/20 uppercase tracking-wider">
                {course.category}
            </span>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20"
            >
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold text-white">{course.rating}</span>
            </motion.div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col bg-[#0A0A0A]/50 backdrop-blur-sm rounded-2xl">
        <div className="mb-6">
            <h3 className="text-2xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 transition-all duration-300 line-clamp-1">
              {course.title}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{course.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
                <BarChart className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-gray-300">{course.level}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-medium text-gray-300">{course.lessons} Lessons</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5 col-span-2">
                <Clock className="w-4 h-4 text-pink-400" />
                <span className="text-xs font-medium text-gray-300">{course.duration}</span>
            </div>
        </div>

        <div className="mt-auto pt-6 border-t border-white/10">
            <Link 
                href={`/learn/${course.slug}`}
                className="relative group/btn w-full flex items-center justify-between px-5 py-3 font-mono text-sm font-bold tracking-wider overflow-hidden transition-all duration-300"
            >
                {/* Background */}
                <div className="absolute inset-0 bg-white group-hover/btn:bg-cyan-400 transition-all duration-300" />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                
                {/* Content */}
                <span className="relative z-10 text-black">START SEQUENCE</span>
                <ArrowRight className="w-4 h-4 relative z-10 text-black transform group-hover/btn:translate-x-1 transition-transform" />
            </Link>
        </div>
      </div>
    </div>
  </motion.div>
);

const ExerciseCard = ({ exercise, isActive, onClick }: { exercise: any, isActive: boolean, onClick: () => void }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
            isActive 
            ? "bg-gradient-to-br from-primary/20 to-purple-500/10 border-primary/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]" 
            : "bg-gradient-to-br from-[#0A0A0A] to-[#050505] border-white/10 hover:border-primary/30 hover:bg-white/5"
        }`}
    >
        {isActive && (
          <>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 rounded-bl-full blur-xl" />
          </>
        )}
        
        <div className="relative z-10">
            <div className="flex justify-between items-start mb-3">
                <h3 className={`font-bold text-base transition-colors leading-tight pr-2 ${
                  isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                }`}>
                    {exercise.title}
                </h3>
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border uppercase tracking-wider flex-shrink-0 ${
                    exercise.difficulty === "Easy" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                    exercise.difficulty === "Medium" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                    "bg-red-500/20 text-red-400 border-red-500/30"
                }`}>
                    {exercise.difficulty}
                </span>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 group-hover:text-gray-400 transition-colors">
                    <div className={`p-1 rounded ${isActive ? 'bg-primary/20' : 'bg-white/5'}`}>
                      <Code2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="capitalize">{exercise.language}</span>
                </div>
                {isActive && (
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </motion.div>
                )}
            </div>
        </div>
    </motion.button>
);

const ExerciseViewer = ({ exercise }: { exercise: any }) => (
     <motion.div 
        key={exercise.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-1 relative overflow-hidden shadow-2xl h-full flex flex-col"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        
        <div className="relative bg-[#0A0A0A] rounded-[28px] overflow-hidden flex flex-col h-full">
             {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02] shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                        <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">{exercise.title}</h2>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span>Live Environment</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                     <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-400">
                        <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                        <span>+50 XP</span>
                     </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
                {/* Description Side */}
                <div className="w-full lg:w-1/3 p-6 overflow-y-auto border-b lg:border-b-0 lg:border-r border-white/10 bg-[#050505]">
                    <div className="prose prose-invert max-w-none mb-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Problem Description</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {exercise.description}
                        </p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 border border-white/5 font-mono text-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-500 uppercase font-bold">Example Case</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400">Read-only</span>
                        </div>
                        <div className="flex items-center gap-3 text-green-400 text-xs break-all">
                            <ChevronRight className="w-3 h-3 opacity-50 shrink-0" />
                            {exercise.testCase}
                        </div>
                    </div>
                </div>
                
                {/* Editor Side */}
                <div className="w-full lg:w-2/3 flex flex-col">
                    <div className="flex-1 relative">
                        <CodeEditor 
                            initialCode={exercise.starterCode}
                            language={exercise.language}
                        />
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);


export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<'courses' | 'exercises'>('courses');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);

  const filteredCourses = useMemo(() => 
    courses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase())),
  [searchQuery]);

  const filteredExercises = useMemo(() => 
    exercises.filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase())),
  [searchQuery]);

  return (
    <div className="min-h-screen pt-20 px-4 pb-12 bg-[#050505] relative overflow-hidden selection:bg-primary/30 selection:text-white">
      {/* Cyberpunk Background matching Hero */}
       <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
          {/* Moving Grid like Hero */}
          <div className="absolute inset-0 perspective-1000">
            <motion.div 
              animate={{ backgroundPosition: ["0px 0px", "0px 40px"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-grid-white opacity-[0.15] transform-gpu rotate-x-12 scale-150 origin-top"
            />
          </div>
          
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />
          
          {/* Subtle gradient orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px]" 
          />
       </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Enhanced Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl"
            >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="group inline-flex items-center gap-3 px-3 py-1.5 rounded bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-default hover:border-primary/50 mb-6"
                >
                    <div className="flex items-center gap-2 px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-mono font-bold">
                        <Hash className="w-3 h-3" />
                        V2.4
                    </div>
                    <span className="text-xs font-mono text-gray-400 tracking-wide group-hover:text-white transition-colors uppercase">
                        LEARNING CENTER // READY TO DEPLOY
                    </span>
                </motion.div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-white mb-6">
                  Master the{" "}
                  <span className="relative inline-block text-6xl md:text-8xl lg:text-9xl font-black">
                    <span className="relative inline-block">
                      CRAFT
                      {/* Glitch effect layers */}
                      <span className="absolute inset-0 text-primary opacity-70 blur-[2px] animate-pulse" aria-hidden="true">
                        CRAFT
                      </span>
                      <span className="absolute inset-0 text-cyan-400 translate-x-0.5 translate-y-0.5 opacity-50" aria-hidden="true">
                        CRAFT
                      </span>
                    </span>
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl font-light leading-relaxed">
                  Initialize your learning sequence with advanced curriculum.
                  <span className="text-white font-medium"> Interactive Exercises</span>, 
                  <span className="text-white font-medium"> Live Code Editor</span>, and 
                  <span className="text-white font-medium"> Progress Tracking</span>.
                </p>
                
                {/* Stats row */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-6 mt-8"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{courses.length}</div>
                      <div className="text-xs text-gray-500 uppercase">Courses</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                      <Code2 className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{exercises.length}</div>
                      <div className="text-xs text-gray-500 uppercase">Challenges</div>
                    </div>
                  </div>
                </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-end"
            >
                 {/* Cyber Tab Switcher matching Hero */}
                <div className="p-1 bg-white/5 border border-white/10 rounded flex w-full sm:w-auto backdrop-blur-sm">
                    <button 
                        onClick={() => setActiveTab('courses')}
                        className={`relative group px-6 py-2.5 font-mono text-sm font-bold tracking-wider transition-all flex items-center justify-center gap-2 ${
                            activeTab === 'courses' 
                            ? 'text-black' 
                            : 'text-white'
                        }`}
                    >
                        {/* Background */}
                        <div className={`absolute inset-0 transition-all duration-300 ${
                            activeTab === 'courses'
                                ? "bg-white"
                                : "bg-white/5 hover:bg-white/10"
                        }`} />
                        
                        {/* Shine Effect */}
                        {activeTab === 'courses' && (
                            <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                        )}

                        <BookOpen className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">COURSES</span>
                    </button>
                    <button 
                         onClick={() => setActiveTab('exercises')}
                         className={`relative group px-6 py-2.5 font-mono text-sm font-bold tracking-wider transition-all flex items-center justify-center gap-2 ${
                            activeTab === 'exercises' 
                            ? 'text-black' 
                            : 'text-white'
                        }`}
                    >
                        {/* Background */}
                        <div className={`absolute inset-0 transition-all duration-300 ${
                            activeTab === 'exercises'
                                ? "bg-white"
                                : "bg-white/5 hover:bg-white/10"
                        }`} />
                        
                        {/* Shine Effect */}
                        {activeTab === 'exercises' && (
                            <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                        )}

                        <Code2 className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">EXERCISES</span>
                    </button>
                </div>

                {/* Cyber Search Bar */}
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`SEARCH_${activeTab.toUpperCase()}...`} 
                        className="w-full pl-11 pr-4 h-12 bg-white/5 border border-white/10 text-white placeholder:text-gray-500 placeholder:font-mono placeholder:text-xs focus:border-white/30 outline-none transition-all hover:bg-white/10 backdrop-blur-sm font-mono text-sm"
                    />
                </div>
            </motion.div>
        </div>

        {/* Enhanced Content Area */}
        <AnimatePresence mode="wait">
            {activeTab === 'courses' ? (
                <motion.div
                    key="courses-grid"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredCourses.map((course, idx) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <CourseCard course={course} />
                        </motion.div>
                    ))}
                    {filteredCourses.length === 0 && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="col-span-full py-32 text-center text-gray-500"
                        >
                            <Search className="w-16 h-16 mx-auto mb-6 opacity-20" />
                            <p className="text-xl">No courses found matching "{searchQuery}"</p>
                            <button 
                              onClick={() => setSearchQuery("")}
                              className="mt-4 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
                            >
                              Clear search
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            ) : (
                <motion.div
                    key="exercises-layout"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-20rem)]"
                >
                     {/* Enhanced Exercise List Sidebar */}
                    <div className="lg:col-span-4 flex flex-col gap-4 h-full overflow-hidden">
                         <div className="flex items-center justify-between px-2 mb-2">
                            <span className="text-sm font-black text-white uppercase tracking-wider">Challenge List</span>
                            <span className="text-xs text-primary font-bold bg-primary/10 px-3 py-1 rounded-full border border-primary/20">{filteredExercises.length} Available</span>
                         </div>
                         <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                             {filteredExercises.map((ex, idx) => (
                                 <motion.div
                                   key={ex.id}
                                   initial={{ opacity: 0, x: -20 }}
                                   animate={{ opacity: 1, x: 0 }}
                                   transition={{ delay: idx * 0.05 }}
                                 >
                                   <ExerciseCard 
                                      exercise={ex} 
                                      isActive={selectedExercise.id === ex.id} 
                                      onClick={() => setSelectedExercise(ex)}
                                   />
                                 </motion.div>
                             ))}
                             {filteredExercises.length === 0 && (
                                <div className="py-10 text-center text-gray-500">
                                    <p>No exercises found.</p>
                                </div>
                             )}
                         </div>
                    </div>
                    
                    {/* Exercise Detail/Editor */}
                    <div className="lg:col-span-8 h-full">
                        <ExerciseViewer exercise={selectedExercise} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}
