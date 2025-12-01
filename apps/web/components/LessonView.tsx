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
      {/* Breadcrumbs */}
      <div className="hidden md:flex items-center text-xs font-mono text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2 px-3 py-1 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10">
            <Home className="w-3 h-3" />
        </Link>
        <ChevronRight className="w-3 h-3 mx-1 opacity-30" />
        <Link href={`/courses`} className="hover:text-primary transition-colors uppercase px-3 py-1 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10">Courses</Link>
        <ChevronRight className="w-3 h-3 mx-1 opacity-30" />
        <span className="text-primary/70 uppercase px-3 py-1 rounded-full bg-primary/10 border border-primary/20 tracking-wider">{courseSlug}</span>
        <ChevronRight className="w-3 h-3 mx-1 opacity-30" />
        <span className="text-white uppercase font-bold px-2 tracking-wider">{lesson.title}</span>
      </div>
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between mb-6 backdrop-blur-md bg-[#050505]/80 sticky top-0 z-50 p-4 -mx-4 border-b border-white/10">
        <Link href={`/courses`} className="text-gray-400 hover:text-white p-2">
            <ChevronLeft className="w-5 h-5" />
        </Link>
        <span className="text-sm font-bold truncate px-4 text-white font-mono uppercase">{lesson.title}</span>
        <div className="w-9" /> {/* Spacer */}
      </div>

      {/* Mobile Tab Toggle */}
      <div className="md:hidden flex bg-white/5 p-1 rounded-xl mb-6 border border-white/10 sticky top-[73px] z-40 backdrop-blur-md">
        <button 
            onClick={() => setActiveTab('lesson')}
            className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'lesson' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
        >
            <BookOpen className="w-4 h-4" /> Lesson
        </button>
        <button 
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'code' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
        >
            <CodeIcon className="w-4 h-4" /> Code
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Content Column */}
        <div className={`space-y-8 ${activeTab === 'code' ? 'hidden lg:block' : 'block'}`}>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white drop-shadow-sm font-mono">
                    {lesson.title}
                </h1>
                <button className="p-3 hover:bg-white/10 rounded-xl transition-colors border border-white/5 hover:border-white/20 text-gray-400 hover:text-white group">
                    <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-primary prose-headings:text-white prose-pre:bg-[#0A0A0A] prose-pre:border prose-pre:border-white/10 prose-code:text-primary/80 bg-white/[0.02] backdrop-blur-sm rounded-3xl p-8 border border-white/5 relative overflow-hidden">
                {/* Deco */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 pointer-events-none" />
                
                {/* Render Markdown content */}
                <div dangerouslySetInnerHTML={{ __html: lesson.content.replace(/\n/g, '<br/>').replace(/# (.*)/g, '<h1 class="text-3xl font-bold mb-4">$1</h1>').replace(/## (.*)/g, '<h2 class="text-2xl font-bold mt-8 mb-4 border-b border-white/10 pb-2">$1</h2>').replace(/```python([\s\S]*?)```/g, '<pre class="relative group"><div class="absolute top-2 right-2 px-2 py-1 bg-white/10 rounded text-[10px] text-gray-400 font-mono uppercase">Python</div><code class="language-python">$1</code></pre>') }} />
            </div>

            {/* Exercises Section */}
            {exercises.length > 0 && (
                <div className="mt-12 pt-8 border-t border-white/10">
                    <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-3 font-mono uppercase tracking-widest">
                        <div className="p-2 rounded bg-green-500/10 border border-green-500/20 text-green-400">
                            <PlayCircle className="w-5 h-5" /> 
                        </div>
                        Simulation Modules
                    </h2>
                    <div className="space-y-6">
                        {exercises.map((ex: any, i: number) => (
                            <div key={i} className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 hover:border-green-500/30 transition-all group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <h3 className="font-bold text-white group-hover:text-green-400 transition-colors font-mono">Module {i + 1}</h3>
                                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-gray-500 border border-white/5">XP_REWARD: 50</span>
                                </div>
                                <p className="text-gray-400 mb-6 leading-relaxed text-sm relative z-10">{ex.question}</p>
                                <div className="bg-black/50 p-4 rounded-xl border border-white/5 text-sm font-mono text-gray-500 flex gap-3 relative z-10">
                                    <span className="text-yellow-500 uppercase text-xs font-bold tracking-wider pt-1 flex items-center gap-1">
                                        <Zap className="w-3 h-3" /> Hint
                                    </span>
                                    <span className="text-gray-400">{ex.hint}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quiz Section */}
            {quiz.length > 0 && (
                <div className="mt-12 pt-8 border-t border-white/10">
                    <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-3 font-mono uppercase tracking-widest">
                         <div className="p-2 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                            <FileQuestion className="w-5 h-5" /> 
                        </div>
                        Knowledge Check
                    </h2>
                    <div className="space-y-6">
                        {quiz.map((q: any, i: number) => (
                            <div key={i} className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                                <h3 className="font-bold text-white mb-6 font-mono text-sm"><span className="text-primary mr-2">0{i + 1}.</span> {q.question}</h3>
                                <div className="space-y-3">
                                    {q.options.map((opt: string, idx: number) => (
                                        <label key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group border border-transparent hover:border-primary/30 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                                            <div className="w-5 h-5 rounded border border-gray-600 group-hover:border-primary transition-colors relative flex items-center justify-center z-10">
                                                <div className="w-2.5 h-2.5 rounded bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <span className="text-gray-300 group-hover:text-white transition-colors text-sm font-mono z-10">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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

        {/* Editor Column */}
        <div className={`lg:h-[calc(100vh-8rem)] lg:sticky lg:top-24 ${activeTab === 'lesson' ? 'hidden lg:block' : 'block h-[calc(100vh-12rem)]'}`}>
            <div className="h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A0A0A] relative group flex flex-col">
                 {/* Editor Header */}
                 <div className="flex items-center justify-between px-4 py-2 bg-[#111] border-b border-white/5 text-xs font-mono text-gray-500">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                    <span>main.{courseSlug === 'html' ? 'html' : 'js'}</span>
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 pointer-events-none" />
                 <div className="flex-1 relative">
                    <CodeEditor 
                        initialCode={lesson.codeSnippet || "// Write your code here"} 
                        language={courseSlug === 'html' ? 'html' : 'javascript'} 
                    />
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
}
