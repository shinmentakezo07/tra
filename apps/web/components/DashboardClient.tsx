"use client";

import { motion } from "framer-motion";
import { CheckCircle, Circle, Clock, Trophy, BookOpen, Activity, Flame, Target, TrendingUp, Play, Star, Code2, Zap, Shield, Bot } from "lucide-react";
import Link from "next/link";

interface DashboardProps {
  user: any;
  progress: any[];
  courses: any[];
}

export default function DashboardClient({ user, progress, courses }: DashboardProps) {
  // Calculate stats
  const completedCount = progress.filter(p => p.completed).length;
  const totalLessons = courses.reduce((acc, course) => acc + (course.lessons?.length || 0), 0);
  const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-6 pb-12 px-4 sm:px-6 lg:px-8 bg-[#050505] relative overflow-hidden">
       {/* Ambient Background */}
       <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
       </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Welcome Header */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 sm:mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-0"
        >
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono font-medium mb-3 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    SYSTEM ONLINE // USER_VERIFIED
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{user.name?.split(' ')[0]}</span>
                </h1>
                <p className="text-gray-400 mt-1 text-sm sm:text-base font-light">
                    Your daily briefing is ready. <span className="text-white font-medium">3 tasks pending.</span>
                </p>
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
                <div className="flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm group cursor-pointer">
                    <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500 group-hover:bg-orange-500/20 transition-colors">
                        <Flame className="w-5 h-5 fill-orange-500/20" />
                    </div>
                    <div>
                        <div className="text-[10px] sm:text-xs text-gray-400 uppercase font-bold tracking-wider">Streak</div>
                        <div className="text-sm font-mono font-bold text-white">3 DAYS</div>
                    </div>
                </div>
                <div className="flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm group cursor-pointer">
                    <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500/20 transition-colors">
                        <Star className="w-5 h-5 fill-yellow-500/20" />
                    </div>
                    <div>
                        <div className="text-[10px] sm:text-xs text-gray-400 uppercase font-bold tracking-wider">Experience</div>
                        <div className="text-sm font-mono font-bold text-white">1,250 XP</div>
                    </div>
                </div>
            </div>
        </motion.div>

        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Stats Overview */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-colors shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-mono text-blue-500/50 bg-blue-500/5 px-2 py-1 rounded">+12%</span>
                            </div>
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Total Progress</p>
                            <h3 className="text-2xl font-bold text-white">{progressPercentage}%</h3>
                            <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progressPercentage}%` }} />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 relative overflow-hidden group hover:border-purple-500/30 transition-colors shadow-lg">
                         <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Lessons Done</p>
                            <h3 className="text-2xl font-bold text-white">{completedCount}<span className="text-sm text-gray-600 font-medium">/{totalLessons}</span></h3>
                            <p className="text-[10px] text-gray-500 mt-2">2 this week</p>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 relative overflow-hidden group hover:border-green-500/30 transition-colors shadow-lg">
                         <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
                                    <Trophy className="w-5 h-5" />
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Current Rank</p>
                            <h3 className="text-2xl font-bold text-white">Novice</h3>
                            <div className="mt-2 flex items-center gap-2 text-[10px]">
                                <span className="text-gray-500">Next:</span>
                                <span className="text-green-400 font-bold">Apprentice (250 XP)</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Active Courses */}
                <motion.div variants={itemVariants}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <div className="w-1 h-5 bg-primary rounded-full shadow-[0_0_10px_#3b82f6]" />
                            Active Protocols
                        </h2>
                        <Link href="/courses" className="text-xs font-mono text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-white">
                            VIEW_ALL_MODULES
                        </Link>
                    </div>
                    
                    {/* AI Lab Promo Card */}
                    <div className="mb-6 group relative p-[1px] rounded-2xl bg-gradient-to-r from-violet-600/50 to-indigo-600/50 hover:from-violet-500 hover:to-indigo-500 transition-all duration-500 shadow-[0_0_30px_rgba(124,58,237,0.1)] hover:shadow-[0_0_40px_rgba(124,58,237,0.2)]">
                        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/30 to-indigo-600/30 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                        <div className="relative h-full bg-[#0e0e0e]/90 backdrop-blur-sm rounded-[15px] p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-center group-hover:bg-[#050505] transition-colors overflow-hidden">
                            {/* Decorative Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(124,58,237,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(124,58,237,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-50" />
                            
                            <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                                <div className="absolute inset-0 rounded-xl bg-violet-500/5 blur-sm animate-pulse-slow" />
                                <Bot className="w-8 h-8 text-violet-300 relative z-10" />
                            </div>
                            
                            <div className="relative flex-1 w-full text-center sm:text-left z-10">
                                <h3 className="text-xl font-bold text-white mb-1 flex items-center justify-center sm:justify-start gap-2">
                                    Shinmen Research Lab
                                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-violet-500/20 text-violet-300 border border-violet-500/30 font-mono uppercase tracking-wide flex items-center gap-1">
                                        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                                        ONLINE
                                    </span>
                                </h3>
                                <p className="text-sm text-gray-400 mb-0 font-light leading-relaxed">
                                    Collaborate with our PhD AI Assistant for <span className="text-violet-300">advanced code reviews</span>, <span className="text-violet-300">system design</span>, and <span className="text-violet-300">personalized curriculum</span>.
                                </p>
                            </div>
                            
                            <Link 
                                href="/dashboard/chat"
                                className="relative inline-flex items-center justify-center px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all shadow-lg shadow-violet-900/20 shrink-0 group/btn overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                                <span className="relative flex items-center gap-2">
                                    Enter Lab
                                    <Play className="w-3 h-3 fill-current" />
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {courses.map((course, i) => {
                            const courseLessonIds = course.lessons?.map((l: any) => l.id) || [];
                            const courseCompleted = progress.filter(p => courseLessonIds.includes(p.lessonId) && p.completed).length;
                            const courseTotal = courseLessonIds.length;
                            const coursePercent = courseTotal > 0 ? Math.round((courseCompleted / courseTotal) * 100) : 0;

                            return (
                                <div
                                    key={course.id}
                                    className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-blue-500/50 hover:to-purple-500/50 transition-all duration-300"
                                >
                                    <div className="relative h-full bg-[#0e0e0e] rounded-[15px] p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start group-hover:bg-[#050505] transition-colors">
                                        {/* Icon/Image Placeholder */}
                                        <div className="w-16 h-16 rounded-xl bg-[#151515] border border-white/5 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300 group-hover:border-blue-500/20 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                            <Code2 className="w-8 h-8 text-gray-500 group-hover:text-blue-400 transition-colors" />
                                        </div>
                                        
                                        <div className="flex-1 w-full text-center sm:text-left">
                                            <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                                        {course.title}
                                                        <span className="hidden group-hover:inline-flex px-1.5 py-0.5 rounded text-[9px] bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono uppercase">ACTIVE</span>
                                                    </h3>
                                                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                                                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-gray-400 border border-white/5 uppercase tracking-wider">
                                                            {course.level}
                                                        </span>
                                                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-gray-400 border border-white/5 uppercase tracking-wider">
                                                            JS/TS
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="hidden sm:block text-right">
                                                    <span className="text-2xl font-bold text-white font-mono">{coursePercent}%</span>
                                                </div>
                                            </div>
                                            
                                            <p className="text-sm text-gray-400 mb-4 line-clamp-2 font-light mt-2">{course.description}</p>
                                            
                                            {/* Progress Bar Mobile/Desktop */}
                                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-4">
                                                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 relative" style={{ width: `${coursePercent}%` }}>
                                                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between sm:justify-start gap-4">
                                                 <Link 
                                                    href={`/learn/${course.slug}`}
                                                    className="inline-flex items-center justify-center px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-all hover:border-blue-500/50 hover:text-blue-400 group/btn hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                                                >
                                                    <Play className="w-3 h-3 mr-2 fill-current" />
                                                    Continue Sequence
                                                </Link>
                                                <span className="text-xs text-gray-500 sm:hidden font-mono">{coursePercent}% COMPLETED</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Sidebar / Right Column */}
            <div className="space-y-6">
                {/* Activity Feed */}
                <motion.div variants={itemVariants} className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/5 shadow-xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
                     <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2 relative z-10 uppercase tracking-widest font-mono border-b border-white/5 pb-4">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        System Log
                     </h3>
                     
                     <div className="space-y-6 relative z-10">
                        <div className="relative pl-6 border-l border-white/10 pb-6 last:pb-0 group">
                            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#1a1a1a] border border-blue-500 group-hover:bg-blue-500 transition-colors" />
                            <p className="text-sm text-gray-300 mb-1">Completed module <span className="text-white font-medium">Python Basics</span></p>
                            <span className="text-[10px] text-gray-600 font-mono">2 HOURS AGO</span>
                        </div>
                        <div className="relative pl-6 border-l border-white/10 pb-6 last:pb-0 group">
                            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#1a1a1a] border border-purple-500 group-hover:bg-purple-500 transition-colors" />
                            <p className="text-sm text-gray-300 mb-1">Acquired badge <span className="text-white font-medium">First Code</span></p>
                            <span className="text-[10px] text-gray-600 font-mono">YESTERDAY</span>
                        </div>
                         <div className="relative pl-6 border-l border-white/10 group">
                            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#1a1a1a] border border-green-500 group-hover:bg-green-500 transition-colors" />
                            <p className="text-sm text-gray-300 mb-1">System initialization complete</p>
                            <span className="text-[10px] text-gray-600 font-mono">2 DAYS AGO</span>
                        </div>
                     </div>
                </motion.div>
                
                {/* Daily Challenge */}
                <motion.div variants={itemVariants} className="p-1 rounded-3xl bg-gradient-to-br from-orange-500/20 to-red-600/20 relative overflow-hidden">
                    <div className="bg-[#0A0A0A] rounded-[20px] p-6 h-full relative">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest font-mono">Daily Mission</h3>
                                <p className="text-[10px] text-orange-400 font-mono mt-1">EXPIRES: 14h 22m</p>
                            </div>
                            <div className="p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                <Target className="w-5 h-5 text-orange-500" />
                            </div>
                        </div>
                        <p className="text-sm text-gray-300 mb-6 font-light">Optimize the "Reverse Linked List" algorithm for O(1) space complexity.</p>
                        <button className="w-full py-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-2 group">
                            <span>Accept Challenge</span>
                            <span className="bg-orange-500/20 px-1.5 py-0.5 rounded text-[9px] group-hover:bg-white/20">+50 XP</span>
                        </button>
                    </div>
                </motion.div>

                {/* Achievements / Badges */}
                <motion.div variants={itemVariants} className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/5 shadow-xl relative overflow-hidden">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 relative z-10 uppercase tracking-widest font-mono border-b border-white/5 pb-4">
                        <Shield className="w-4 h-4 text-purple-500" />
                        Achievements
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                        <div className="aspect-square rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group relative cursor-pointer">
                            <Zap className="w-6 h-6 text-yellow-500" />
                            <div className="absolute inset-0 bg-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                        </div>
                        <div className="aspect-square rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group relative cursor-pointer">
                            <Code2 className="w-6 h-6 text-blue-500" />
                            <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                        </div>
                        <div className="aspect-square rounded-xl bg-white/5 border border-white/5 flex items-center justify-center opacity-30">
                            <Trophy className="w-6 h-6 text-gray-500" />
                        </div>
                        <div className="aspect-square rounded-xl bg-white/5 border border-white/5 flex items-center justify-center opacity-30">
                            <Star className="w-6 h-6 text-gray-500" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
      </div>
    </div>
  );
}
