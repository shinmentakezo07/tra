"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Home, Share2, CheckCircle, BookOpen, Code as CodeIcon, PlayCircle, FileQuestion, Zap } from "lucide-react";
import CodeEditor from "@/components/CodeEditor";
import { markLessonComplete } from "@/app/lib/actions";
import { motion, AnimatePresence } from "framer-motion";

interface LessonViewProps {
  lesson: any;
  courseSlug: string;
  nextLesson: any;
  prevLesson: any;
}

export function LessonView({ lesson, courseSlug, nextLesson, prevLesson }: LessonViewProps) {
  const [activeTab, setActiveTab] = useState<'lesson' | 'code'>('lesson');
  const exercises = lesson.exercises ? JSON.parse(lesson.exercises) : [];
  const quiz = lesson.quiz ? JSON.parse(lesson.quiz) : [];

  return (
    <div className="w-full max-w-7xl mx-auto py-6 md:py-12 px-4 md:px-8 pb-24 md:pb-8 bg-[#050505] min-h-screen">
      {/* Enhanced Breadcrumbs */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:flex items-center text-xs font-mono text-gray-500 mb-10 overflow-x-auto whitespace-nowrap"
      >
        <Link href="/" className="hover:text-primary transition-all flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 hover:scale-105">
            <Home className="w-4 h-4" />
        </Link>
        <ChevronRight className="w-4 h-4 mx-2 opacity-30" />
        <Link href={`/learn`} className="hover:text-primary transition-all uppercase px-4 py-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 hover:scale-105 font-bold tracking-wider">Learn</Link>
        <ChevronRight className="w-4 h-4 mx-2 opacity-30" />
        <span className="text-primary uppercase px-4 py-2 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 tracking-wider font-bold shadow-lg shadow-primary/10">{courseSlug}</span>
        <ChevronRight className="w-4 h-4 mx-2 opacity-30" />
        <span className="text-white uppercase font-black px-3 tracking-wider">{lesson.title}</span>
      </motion.div>
      
      {/* Enhanced Mobile Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="md:hidden flex items-center justify-between mb-6 backdrop-blur-xl bg-gradient-to-r from-[#050505]/90 to-[#0A0A0A]/90 sticky top-0 z-50 p-4 -mx-4 border-b border-white/20 shadow-lg"
      >
        <Link href={`/learn/${courseSlug}`} className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-all">
            <ChevronLeft className="w-5 h-5" />
        </Link>
        <span className="text-sm font-black truncate px-4 text-white font-mono uppercase tracking-wider">{lesson.title}</span>
        <div className="w-9" /> {/* Spacer */}
      </motion.div>

      {/* Enhanced Mobile Tab Toggle */}
      <div className="md:hidden flex bg-gradient-to-br from-white/10 to-white/5 p-1 rounded-2xl mb-6 border border-white/20 sticky top-[73px] z-40 backdrop-blur-xl shadow-xl">
        <button 
            onClick={() => setActiveTab('lesson')}
            className={`flex-1 py-3 flex items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all relative overflow-hidden ${
              activeTab === 'lesson' ? 'bg-gradient-to-br from-primary to-blue-600 text-white shadow-xl shadow-primary/30' : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
        >
            {activeTab === 'lesson' && (
              <motion.div 
                layoutId="mobileActiveTab"
                className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <BookOpen className="w-4 h-4 relative z-10" /> 
            <span className="relative z-10">Lesson</span>
        </button>
        <button 
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-3 flex items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all relative overflow-hidden ${
              activeTab === 'code' ? 'bg-gradient-to-br from-primary to-blue-600 text-white shadow-xl shadow-primary/30' : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
        >
            {activeTab === 'code' && (
              <motion.div 
                layoutId="mobileActiveTab"
                className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <CodeIcon className="w-4 h-4 relative z-10" /> 
            <span className="relative z-10">Code</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Enhanced Content Column */}
        <div className={`space-y-8 ${activeTab === 'code' ? 'hidden lg:block' : 'block'}`}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white drop-shadow-lg font-mono bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text">
                    {lesson.title}
                </h1>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 hover:bg-gradient-to-br hover:from-primary/20 hover:to-purple-500/20 rounded-xl transition-all border border-white/10 hover:border-primary/50 text-gray-400 hover:text-primary group shadow-lg"
                >
                    <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </motion.button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="prose prose-invert prose-lg max-w-none prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-primary prose-headings:text-white prose-pre:bg-[#0A0A0A] prose-pre:border prose-pre:border-white/10 prose-code:text-primary/80 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden shadow-2xl"
            >
                {/* Enhanced decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-bl-full -z-10 pointer-events-none blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full -z-10 pointer-events-none blur-2xl" />
                
                {/* Render Markdown content */}
                <div dangerouslySetInnerHTML={{ __html: lesson.content.replace(/\n/g, '<br/>').replace(/# (.*)/g, '<h1 class="text-3xl font-bold mb-4">$1</h1>').replace(/## (.*)/g, '<h2 class="text-2xl font-bold mt-8 mb-4 border-b border-white/10 pb-2">$1</h2>').replace(/```python([\s\S]*?)```/g, '<pre class="relative group"><div class="absolute top-2 right-2 px-2 py-1 bg-white/10 rounded text-[10px] text-gray-400 font-mono uppercase">Python</div><code class="language-python">$1</code></pre>') }} />
            </motion.div>

            {/* Enhanced Exercises Section */}
            {exercises.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-12 pt-8 border-t border-white/10"
                >
                    <h2 className="text-2xl font-black mb-8 text-white flex items-center gap-4 font-mono uppercase tracking-widest">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 shadow-lg shadow-green-500/10">
                            <PlayCircle className="w-6 h-6" /> 
                        </div>
                        Simulation Modules
                    </h2>
                    <div className="space-y-6">
                        {exercises.map((ex: any, i: number) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              whileHover={{ x: 4 }}
                              className="bg-gradient-to-br from-[#0A0A0A] to-[#050505] border border-white/10 rounded-2xl p-6 hover:border-green-500/50 transition-all group relative overflow-hidden shadow-xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <h3 className="font-black text-lg text-white group-hover:text-green-400 transition-colors font-mono">Module {i + 1}</h3>
                                    <span className="text-[10px] font-black px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30 uppercase tracking-wider shadow-lg">XP_REWARD: 50</span>
                                </div>
                                <p className="text-gray-300 mb-6 leading-relaxed relative z-10">{ex.question}</p>
                                <div className="bg-gradient-to-br from-black/70 to-black/50 p-5 rounded-xl border border-yellow-500/20 text-sm font-mono flex gap-3 relative z-10 shadow-lg">
                                    <span className="text-yellow-400 uppercase text-xs font-black tracking-wider pt-1 flex items-center gap-2 flex-shrink-0">
                                        <Zap className="w-4 h-4" /> Hint
                                    </span>
                                    <span className="text-gray-300">{ex.hint}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Enhanced Quiz Section */}
            {quiz.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-12 pt-8 border-t border-white/10"
                >
                    <h2 className="text-2xl font-black mb-8 text-white flex items-center gap-4 font-mono uppercase tracking-widest">
                         <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-400 shadow-lg shadow-yellow-500/10">
                            <FileQuestion className="w-6 h-6" /> 
                        </div>
                        Knowledge Check
                    </h2>
                    <div className="space-y-6">
                        {quiz.map((q: any, i: number) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + i * 0.1 }}
                              className="bg-gradient-to-br from-[#0A0A0A] to-[#050505] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl hover:border-yellow-500/30 transition-all"
                            >
                                <h3 className="font-black text-white mb-6 font-mono text-base md:text-lg">
                                  <span className="text-primary mr-3 text-xl">0{i + 1}.</span> 
                                  {q.question}
                                </h3>
                                <div className="space-y-3">
                                    {q.options.map((opt: string, idx: number) => (
                                        <motion.label 
                                          key={idx}
                                          whileHover={{ x: 4 }}
                                          className="flex items-center gap-4 p-4 md:p-5 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/10 transition-all cursor-pointer group border border-white/10 hover:border-primary/50 relative overflow-hidden shadow-lg"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                                            <div className="w-6 h-6 rounded-lg border-2 border-gray-600 group-hover:border-primary transition-all relative flex items-center justify-center z-10 group-hover:shadow-lg group-hover:shadow-primary/20">
                                                <motion.div 
                                                  className="w-3 h-3 rounded bg-gradient-to-br from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                  whileHover={{ scale: 1.2 }}
                                                />
                                            </div>
                                            <span className="text-gray-300 group-hover:text-white transition-colors font-medium z-10">{opt}</span>
                                        </motion.label>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 sticky bottom-0 bg-[#050505]/95 backdrop-blur-xl p-6 -mx-8 sm:mx-0 rounded-t-3xl sm:rounded-none z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <div className="w-full sm:w-auto flex justify-between sm:justify-start gap-4">
                    {prevLesson ? (
                        <Link 
                            href={`/learn/${courseSlug}/${prevLesson.slug}`}
                            className="flex items-center text-xs font-mono font-bold text-gray-400 hover:text-white transition-colors px-4 py-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 uppercase tracking-wider"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" /> PREV_MODULE
                        </Link>
                    ) : <div className="w-16" />}

                    {nextLesson ? (
                        <Link 
                            href={`/learn/${courseSlug}/${nextLesson.slug}`}
                            className="sm:hidden flex items-center text-xs font-mono font-bold text-gray-400 hover:text-white transition-colors px-4 py-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 uppercase tracking-wider"
                        >
                            NEXT <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
                    ) : null}
                </div>

                <form action={async () => {
                    await markLessonComplete(lesson.id);
                }} className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 font-mono uppercase tracking-wider text-xs">
                        <CheckCircle className="w-4 h-4" /> Complete Protocol
                    </button>
                </form>

                {nextLesson ? (
                    <Link 
                        href={`/learn/${courseSlug}/${nextLesson.slug}`}
                        className="hidden sm:flex items-center text-xs font-mono font-bold text-gray-400 hover:text-white transition-colors px-4 py-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 uppercase tracking-wider"
                    >
                        NEXT_MODULE <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                ) : <div className="hidden sm:block w-16" />}
            </div>
        </div>

        {/* Enhanced Editor Column */}
        <div className={`lg:h-[calc(100vh-8rem)] lg:sticky lg:top-24 ${activeTab === 'lesson' ? 'hidden lg:block' : 'block h-[calc(100vh-12rem)]'}`}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="h-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#0A0A0A] relative group flex flex-col hover:border-primary/30 transition-all"
            >
                 {/* Enhanced Editor Header */}
                 <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#111] to-[#0A0A0A] border-b border-white/10 text-xs font-mono text-gray-400 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70 group-hover:bg-red-500 transition-colors" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 group-hover:bg-yellow-500 transition-colors" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70 group-hover:bg-green-500 transition-colors" />
                    </div>
                    <span className="font-bold uppercase tracking-wider">main.{courseSlug === 'html' ? 'html' : 'js'}</span>
                 </div>
                 
                 {/* Gradient overlay */}
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                 
                 <div className="flex-1 relative">
                    <CodeEditor 
                        initialCode={lesson.codeSnippet || "// Write your code here"} 
                        language={courseSlug === 'html' ? 'html' : 'javascript'} 
                    />
                 </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
