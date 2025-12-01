"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Minimize2, Sparkles, Terminal } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming this exists, standard in shadcn/ui-like setups. If not I'll check.

const formatMessage = (content: string) => {
  let formatted = content
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-neon-blue font-bold text-shadow-neon-sm">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-neon-pink/80">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-neon-blue/10 px-1 py-0.5 rounded text-neon-blue font-mono text-xs border border-neon-blue/30">$1</code>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<div class="my-2 rounded-lg overflow-hidden border border-neon-blue/20 bg-black/80 shadow-[0_0_10px_rgba(0,255,255,0.1)]">
        <div class="flex items-center justify-between px-3 py-1.5 bg-neon-blue/5 border-b border-neon-blue/10">
            <span class="text-[10px] font-mono uppercase text-neon-blue tracking-wider">${lang || 'code'}</span>
        </div>
        <pre class="p-3 overflow-x-auto text-xs font-mono text-gray-300"><code class="language-${lang}">${code}</code></pre>
      </div>`;
    })
    .replace(/\n/g, '<br/>');

  return formatted;
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  } as any) as any;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="pointer-events-auto mb-4 w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] bg-black/90 backdrop-blur-xl border border-neon-blue/30 rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.15)] flex flex-col overflow-hidden ring-1 ring-neon-pink/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neon-pink/20 bg-black/80 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-transparent to-neon-pink/20 opacity-50 animate-pulse-slow" />
              
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[size:100%_4px] pointer-events-none opacity-20" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue to-neon-pink rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
                  <div className="relative w-10 h-10 rounded-xl bg-black border border-neon-blue/50 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-neon-blue drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-neon-green rounded-full border-2 border-black animate-ping" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-neon-green rounded-full border-2 border-black" />
                </div>
                <div>
                  <h3 className="font-bold text-white font-mono tracking-tight flex items-center gap-2 text-shadow-neon">
                    SHINMEN
                    <span className="text-[8px] bg-neon-blue/20 text-neon-blue px-1 py-0.5 rounded border border-neon-blue/50">V.3.0</span>
                  </h3>
                  <p className="text-[10px] text-neon-pink uppercase tracking-[0.2em] font-medium animate-pulse">System Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1 relative z-10">
                 <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg text-neon-blue hover:text-white transition-colors group"
                >
                  <Minimize2 className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar relative">
               {/* Background Grid */}
               <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[size:20px_20px] -z-10" />

              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 opacity-80">
                    <div className="relative">
                      <div className="absolute inset-0 bg-neon-blue rounded-full blur-xl opacity-20 animate-pulse" />
                      <div className="w-16 h-16 rounded-2xl bg-black border border-neon-blue/30 flex items-center justify-center mb-2 relative z-10 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                          <Sparkles className="w-8 h-8 text-neon-blue" />
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm font-mono">
                      <span className="text-neon-pink">&gt;</span> INITIALIZE_SEQUENCE<br/>
                      <span className="text-neon-blue/50">AWAITING_INPUT...</span>
                    </p>
                </div>
              )}
              {messages.map((m: any) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: m.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 backdrop-blur-md ${
                      m.role === "user"
                        ? "bg-neon-blue/10 border border-neon-blue/30 text-white rounded-tr-sm shadow-[0_0_10px_rgba(0,255,255,0.1)]"
                        : "bg-black/40 border border-neon-pink/20 text-gray-200 rounded-tl-sm shadow-[0_0_10px_rgba(255,0,255,0.05)]"
                    }`}
                  >
                    <div 
                        className="text-sm leading-relaxed font-light prose prose-invert prose-p:my-0 prose-pre:my-0 font-sans tracking-wide"
                        dangerouslySetInnerHTML={{ __html: formatMessage(m.content) }}
                    />
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-black/40 border border-neon-pink/20 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-neon-pink rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-neon-blue/20 bg-black/80 relative">
              <div className="relative flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input || ""}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e as any);
                    }
                  }}
                  placeholder="Ask Shinmen..."
                  className="w-full bg-black/50 hover:bg-black/70 focus:bg-black border border-neon-blue/30 focus:border-neon-blue rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-1 focus:ring-neon-blue/50 transition-all min-h-[50px] max-h-[120px] custom-scrollbar font-mono"
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input?.trim()}
                  className="p-3 bg-neon-blue/10 hover:bg-neon-blue/20 border border-neon-blue/50 disabled:opacity-50 disabled:hover:bg-transparent text-neon-blue rounded-xl transition-all hover:scale-105 active:scale-95 flex-shrink-0 shadow-[0_0_10px_rgba(0,255,255,0.2)] group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
              <div className="text-[9px] text-center text-gray-500 mt-2 flex items-center justify-center gap-2 font-mono tracking-wider">
                <Terminal className="w-3 h-3 text-neon-green" />
                <span>POWERED_BY_MEGALLM_V3</span>
                <span className="w-1 h-1 rounded-full bg-neon-green animate-pulse" />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto p-4 bg-black/80 hover:bg-black text-neon-blue rounded-full shadow-[0_0_20px_rgba(0,255,255,0.4)] border border-neon-blue/50 transition-all group relative z-50"
      >
        {/* Trigger Pulse Effect */}
        <div className="absolute inset-0 rounded-full bg-neon-blue/20 animate-ping opacity-20" />
        
        <AnimatePresence mode="wait">
            {isOpen ? (
                 <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                 >
                    <X className="w-6 h-6" />
                 </motion.div>
            ) : (
                <motion.div
                    key="open"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                 >
                    <MessageCircle className="w-6 h-6 drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]" />
                 </motion.div>
            )}
        </AnimatePresence>
        
        {!isOpen && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-neon-pink rounded-full border-2 border-black animate-pulse shadow-[0_0_10px_rgba(255,0,255,0.5)]" />
        )}
      </motion.button>
    </div>
  );
}
