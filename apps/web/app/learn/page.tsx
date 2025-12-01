"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Search, Filter, ArrowRight, BookOpen, Clock, BarChart, Code2, Star, Sparkles,
  Trophy, Brain, Terminal, ChevronRight, Zap, Lock, Play
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
    className="group relative flex flex-col h-full"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-3xl transform transition-transform group-hover:scale-[1.02] duration-300" />
    <div className="relative h-full bg-[#0A0A0A] border border-white/10 rounded-3xl p-1 overflow-hidden hover:border-primary/50 transition-colors duration-300 flex flex-col">
      {/* Card Header */}
      <div className={`h-32 rounded-2xl bg-gradient-to-br ${course.color} p-6 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
           <course.icon className="w-24 h-24 text-white" />
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
);

const ExerciseCard = ({ exercise, isActive, onClick }: { exercise: any, isActive: boolean, onClick: () => void }) => (
    <motion.button
        onClick={onClick}
        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 group relative overflow-hidden mb-4 ${
            isActive 
            ? "bg-primary/10 border-primary/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
            : "bg-[#0A0A0A] border-white/5 hover:border-white/10 hover:bg-white/5"
        }`}
    >
        {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-20" />
        )}
        
        <div className="relative z-10">
            <div className="flex justify-between items-center mb-2">
                <h3 className={`font-bold transition-colors ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                    {exercise.title}
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    exercise.difficulty === "Easy" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                    exercise.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                    "bg-red-500/10 text-red-400 border-red-500/20"
                }`}>
                    {exercise.difficulty}
                </span>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                    <Code2 className="w-3 h-3" />
                    <span className="capitalize">{exercise.language}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-primary animate-pulse" />}
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
    <div className="min-h-screen pt-24 px-4 pb-12 bg-[#050505] relative overflow-hidden selection:bg-primary/30 selection:text-white">
      {/* Ambient Background */}
       <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
       </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-4">
                    <Sparkles className="w-3 h-3" />
                    LEARNING CENTER V2.0
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                  Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Craft</span>
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                  Access world-class curriculum and interactive coding challenges. 
                  Switch between structured learning and hands-on practice.
                </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-end"
            >
                 {/* Tab Switcher */}
                <div className="p-1 bg-white/5 rounded-xl border border-white/10 flex w-full sm:w-auto">
                    <button 
                        onClick={() => setActiveTab('courses')}
                        className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                            activeTab === 'courses' 
                            ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <BookOpen className="w-4 h-4" />
                        Courses
                    </button>
                    <button 
                         onClick={() => setActiveTab('exercises')}
                         className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                            activeTab === 'exercises' 
                            ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <Code2 className="w-4 h-4" />
                        Exercises
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-72 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Search ${activeTab}...`} 
                        className="w-full pl-10 h-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all hover:bg-white/10"
                    />
                </div>
            </motion.div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
            {activeTab === 'courses' ? (
                <motion.div
                    key="courses-grid"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                    {filteredCourses.length === 0 && (
                        <div className="col-span-full py-20 text-center text-gray-500">
                            <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>No courses found matching "{searchQuery}"</p>
                        </div>
                    )}
                </motion.div>
            ) : (
                <motion.div
                    key="exercises-layout"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-20rem)]"
                >
                     {/* Exercise List Sidebar */}
                    <div className="lg:col-span-4 flex flex-col gap-4 h-full overflow-hidden">
                         <div className="flex items-center justify-between px-1 mb-2">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Challenge List</span>
                            <span className="text-xs text-primary">{filteredExercises.length} Available</span>
                         </div>
                         <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                             {filteredExercises.map((ex) => (
                                 <ExerciseCard 
                                    key={ex.id} 
                                    exercise={ex} 
                                    isActive={selectedExercise.id === ex.id} 
                                    onClick={() => setSelectedExercise(ex)}
                                 />
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
