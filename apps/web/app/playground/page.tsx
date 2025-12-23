"use client";

import PlaygroundMain from "@/components/playground/PlaygroundMain";
import { motion } from "framer-motion";
import { Terminal, Code2, Hash } from "lucide-react";

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen pt-16 pb-6 px-6 bg-[#050505] text-white overflow-hidden relative">
      {/* Dark Background matching website theme */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
        {/* Moving Grid */}
        <div className="absolute inset-0 perspective-1000">
          <motion.div 
            animate={{ backgroundPosition: ["0px 0px", "0px 40px"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-grid-white opacity-[0.15] transform-gpu rotate-x-12 scale-150 origin-top"
          />
        </div>
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />
        
        {/* Subtle Accent Glow */}
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[150px]" 
        />
      </div>

      <div className="max-w-[1800px] mx-auto h-full flex flex-col relative z-10">
        {/* Cyberpunk Header matching website theme */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            {/* Badge matching hero style */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="group inline-flex items-center gap-3 px-3 py-1.5 rounded bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-default hover:border-primary/50 mb-4"
            >
              <div className="flex items-center gap-2 px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-mono font-bold">
                <Terminal className="w-3 h-3" />
                LIVE
              </div>
              <span className="text-xs font-mono text-gray-400 tracking-wide group-hover:text-white transition-colors uppercase">
                CODE EXECUTION ENGINE // READY
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2">
              Code Playground
            </h1>
            <p className="text-muted-foreground text-base max-w-2xl">
              Execute code in real-time across{" "}
              <span className="text-white font-medium">9 programming languages</span>.
            </p>
          </div>

          {/* Dark Stats Cards */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
              <Code2 className="w-5 h-5 text-primary" />
              <div className="text-right">
                <div className="text-xl font-bold text-white">9</div>
                <div className="text-[10px] text-gray-500 uppercase font-medium">Languages</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10">
              <Terminal className="w-5 h-5 text-green-400" />
              <div className="text-right">
                <div className="text-xl font-bold text-white">Instant</div>
                <div className="text-[10px] text-gray-500 uppercase font-medium">Execution</div>
              </div>
            </div>
          </div>
        </motion.div>

        <PlaygroundMain />
      </div>
    </div>
  );
}
