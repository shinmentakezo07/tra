"use client";

import { motion } from "framer-motion";
import { Zap, Cpu, Scan } from "lucide-react";
import { useEffect, useState } from "react";

export const CyberpunkLogo = ({ className }: { className?: string }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="group relative flex items-center gap-4 cursor-pointer select-none py-2">
        <div className="relative w-12 h-12 flex items-center justify-center bg-black border border-[#00ff9d]/30 rounded-lg overflow-hidden">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff9d10_1px,transparent_1px),linear-gradient(to_bottom,#00ff9d10_1px,transparent_1px)] bg-[size:4px_4px]" />
           <div className="relative z-10 text-[#00ff9d] drop-shadow-[0_0_5px_rgba(0,255,157,0.8)]">
                <span className="font-black text-2xl italic">P</span>
            </div>
        </div>
        <div className="flex flex-col relative">
            <div className="relative">
                <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic" style={{ textShadow: "2px 2px 0px rgba(0, 255, 157, 0.2)" }}>
                    PRANISA
                </h1>
            </div>
             <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-[#00ff9d] rounded-sm" />
                <div className="h-[1px] w-12 bg-gradient-to-r from-[#00ff9d] to-transparent" />
                <span className="text-[10px] font-mono text-[#00ff9d] tracking-widest uppercase">
                    Netrunner
                </span>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex items-center gap-4 cursor-pointer select-none py-2" suppressHydrationWarning>
        {/* Glitch Background for Icon */}
        <div className="absolute left-0 w-12 h-12 bg-[#00ff9d]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" suppressHydrationWarning />

        {/* Icon Container */}
        <div className="relative w-12 h-12 flex items-center justify-center bg-black border border-[#00ff9d]/30 rounded-lg overflow-hidden" suppressHydrationWarning>
            {/* Scanline */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff9d]/20 to-transparent h-[30%]"
                animate={{ top: ["-30%", "130%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Tech Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff9d10_1px,transparent_1px),linear-gradient(to_bottom,#00ff9d10_1px,transparent_1px)] bg-[size:4px_4px]" />

            {/* Rotating Tech Rings */}
            <motion.div 
                className="absolute inset-1 border border-[#00ff9d]/50 rounded border-t-transparent border-l-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
                className="absolute inset-2 border border-blue-500/50 rounded border-b-transparent border-r-transparent"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />

            {/* Center Icon */}
            <div className="relative z-10 text-[#00ff9d] drop-shadow-[0_0_5px_rgba(0,255,157,0.8)]">
                <span className="font-black text-2xl italic">P</span>
            </div>
            
            {/* Glitch Fragments (visible on hover) */}
            <div className="absolute inset-0 hidden group-hover:block">
                <div className="absolute top-2 left-1 w-2 h-[1px] bg-[#ff00ff]" />
                <div className="absolute bottom-3 right-2 w-3 h-[1px] bg-[#00ffff]" />
            </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col relative">
            {/* Main Text with Glitch Effect */}
            <div className="relative">
                <motion.h1 
                    className="text-2xl font-black tracking-tighter text-white uppercase italic"
                    style={{ textShadow: "2px 2px 0px rgba(0, 255, 157, 0.2)" }}
                >
                    PRANISA
                </motion.h1>
                
                {/* Glitch Layers */}
                <motion.h1 
                    className="absolute top-0 left-0 text-2xl font-black tracking-tighter text-[#ff00ff] opacity-0 group-hover:opacity-70 mix-blend-screen uppercase italic"
                    animate={{ x: [-2, 2, -1, 0], y: [1, -1, 0] }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 0.5 }}
                >
                    PRANISA
                </motion.h1>
                <motion.h1 
                    className="absolute top-0 left-0 text-2xl font-black tracking-tighter text-[#00ffff] opacity-0 group-hover:opacity-70 mix-blend-screen uppercase italic"
                    animate={{ x: [2, -2, 1, 0], y: [-1, 1, 0] }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 0.3 }}
                >
                    PRANISA
                </motion.h1>
            </div>

            {/* Subtext / Tech Line */}
            <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-[#00ff9d] rounded-sm animate-pulse" />
                <div className="h-[1px] w-12 bg-gradient-to-r from-[#00ff9d] to-transparent" />
                <span className="text-[10px] font-mono text-[#00ff9d] tracking-widest uppercase">
                    Netrunner
                </span>
            </div>
        </div>
    </div>
  );
};
