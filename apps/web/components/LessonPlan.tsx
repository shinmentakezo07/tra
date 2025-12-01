"use client";

import React from 'react';
import { CheckCircle2, BookOpen, GraduationCap } from 'lucide-react';

interface LessonPlanProps {
  data: {
    topic: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    modules: Array<{
      title: string;
      description: string;
      key_concepts: string[];
    }>;
  };
}

export default function LessonPlan({ data }: LessonPlanProps) {
  return (
    <div className="my-4 bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-violet-500/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-500/20 rounded-lg">
            <GraduationCap className="w-5 h-5 text-violet-300" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-violet-200">Curriculum: {data.topic}</h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
              data.difficulty === 'Advanced' ? 'bg-red-500/20 text-red-300 border-red-500/30' :
              data.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
              'bg-green-500/20 text-green-300 border-green-500/30'
            }`}>
              {data.difficulty}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {data.modules.map((module, idx) => (
          <div key={idx} className="relative pl-6 pb-4 border-l border-white/10 last:border-0 last:pb-0">
            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-violet-500 border-2 border-[#1a1a1a]" />
            <h4 className="text-sm font-bold text-white mb-1">{module.title}</h4>
            <p className="text-xs text-gray-400 mb-2">{module.description}</p>
            <div className="flex flex-wrap gap-2">
              {module.key_concepts.map((concept, cIdx) => (
                <div key={cIdx} className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded text-[10px] text-gray-300 border border-white/5">
                  <BookOpen className="w-3 h-3 text-violet-400" />
                  {concept}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 bg-black/20 border-t border-white/10 text-center">
        <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors flex items-center justify-center gap-2 w-full">
          <CheckCircle2 className="w-3 h-3" />
          Save to My Learning Path
        </button>
      </div>
    </div>
  );
}
