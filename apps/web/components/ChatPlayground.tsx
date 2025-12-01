"use client";

import { useChat } from "@ai-sdk/react";
import { Send, Bot, User, Sparkles, Terminal, BookOpen, Code2, Zap, Layout, Settings, PanelLeftClose, PanelLeftOpen, Brain, Trash2, MessageSquare, Moon, Sun, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Mermaid from "./Mermaid";
import LessonPlan from "./LessonPlan";
import { GlassCard } from "./ui/glass-card";
import { AIThinkingProcess } from "./AIThinkingProcess";

export default function ChatPlayground() {
  // Reverted: Use sendMessage as append is not available in this version
  const { messages, status, sendMessage, stop, setMessages } = useChat({
    api: "/api/chat",
  } as any) as any;
  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    
    const text = input;
    setInput("");
    // Reverted: Use sendMessage instead of append
    await sendMessage({ role: 'user', content: text });
  };

  const handleClearChat = () => {
    setMessages([]);
    setInput("");
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'notes'>('chat');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleQuickAction = (action: string) => {
    const prompts: Record<string, string> = {
      review: "Review the following code for correctness, efficiency (Big O), and style. Be strict like a senior engineer:\n\n",
      explain: "Explain this concept using a real-world analogy and a diagram:\n",
      plan: "Create a structured learning path/curriculum for: ",
    };
    
    setInput(prompts[action]);
    textareaRef.current?.focus();
  };

  return (
    <div className="flex h-[calc(100vh-140px)] max-w-7xl mx-auto w-full gap-4 p-4">
      {/* Sidebar - Context & Tools */}
      <AnimatePresence mode="wait">
        {showSidebar && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="hidden md:flex flex-col gap-4 shrink-0"
          >
             <GlassCard className="flex-1 flex flex-col overflow-hidden !bg-[#0A0A0A]/90 border-white/5">
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <Terminal className="w-3 h-3" />
                        System Context
                    </h3>
                    <Settings className="w-3 h-3 text-gray-500 cursor-pointer hover:text-white transition-colors" />
                </div>
                <div className="p-4 flex-1 overflow-y-auto space-y-6">
                    {/* AI Status */}
                    <div className="space-y-2">
                        <div className="text-[10px] text-gray-500 font-mono uppercase">Model Status</div>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/5 border border-green-500/10 group hover:border-green-500/20 transition-colors">
                            <div className="relative">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-50" />
                            </div>
                            <span className="text-xs font-mono text-green-400">Minimax-M2 Online</span>
                        </div>
                    </div>

                    {/* Active Mode */}
                    <div className="space-y-2">
                        <div className="text-[10px] text-gray-500 font-mono uppercase">Persona Active</div>
                        <div className="p-3 rounded-lg bg-violet-500/5 border border-violet-500/10 flex items-start gap-3 group hover:bg-violet-500/10 transition-all">
                            <div className="p-1.5 bg-violet-500/10 rounded border border-violet-500/20 group-hover:scale-105 transition-transform">
                                <Bot className="w-4 h-4 text-violet-300" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-violet-200">Shinmen</div>
                                <div className="text-[10px] text-violet-400/70 mt-0.5">PhD Level • Socratic • Technical</div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Sessions (Mock) */}
                     <div className="space-y-2">
                        <div className="text-[10px] text-gray-500 font-mono uppercase flex justify-between items-center">
                            <span>Recent Sessions</span>
                            <Plus className="w-3 h-3 cursor-pointer hover:text-white" />
                        </div>
                        <div className="space-y-1">
                            {['React Performance', 'Big O Notation', 'System Design'].map((t, i) => (
                                <div key={i} className="px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer truncate flex items-center gap-2 transition-colors">
                                    <MessageSquare className="w-3 h-3 opacity-50" />
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats / Visualization Placeholder */}
                    <div className="space-y-2 mt-auto">
                        <div className="text-[10px] text-gray-500 font-mono uppercase">Neural Processing</div>
                         <AIThinkingProcess steps={[
                             { title: "Context Analysis", status: isLoading ? 'completed' : 'completed' },
                             { title: "Knowledge Retrieval", status: isLoading ? 'completed' : 'completed' },
                             { title: "Structure Generation", status: isLoading ? 'active' : 'completed' },
                             { title: "Response Formatting", status: isLoading ? 'pending' : 'completed' }
                         ]} />
                    </div>
                </div>
             </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <GlassCard className="flex-1 flex flex-col overflow-hidden relative border-white/10 shadow-2xl bg-[#050505]/80">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-black/60 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="p-2 hover:bg-white/10 rounded-lg text-gray-400 transition-colors hidden md:block"
                >
                    {showSidebar ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
                </button>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="absolute inset-0 bg-violet-500/20 blur-lg rounded-full" />
                        <div className="relative p-2 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl shadow-lg shadow-violet-500/20 border border-white/10">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-white flex items-center gap-2">
                            Shinmen <span className="px-1.5 py-0.5 rounded text-[9px] bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono">v2.1</span>
                        </h2>
                        <p className="text-[10px] text-gray-400 font-mono">Research Assistant</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/5 mr-2">
                    <button 
                        onClick={() => setActiveTab('chat')}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === 'chat' ? 'bg-violet-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Chat
                    </button>
                    <button 
                        onClick={() => setActiveTab('notes')}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === 'notes' ? 'bg-violet-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Notes
                    </button>
                </div>
                
                <button 
                    onClick={handleClearChat}
                    className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg text-gray-500 transition-colors border border-transparent hover:border-red-500/20"
                    title="Clear Chat"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto pt-24 pb-4 px-4 md:px-8 space-y-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
             {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-100 animate-in fade-in duration-500">
                    <div className="relative mb-8 group cursor-default">
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
                        <div className="relative w-24 h-24 bg-[#0A0A0A] rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500 z-10">
                            <Sparkles className="w-10 h-10 text-violet-400" />
                        </div>
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#111] rounded-xl border border-white/10 flex items-center justify-center shadow-xl -rotate-6 group-hover:rotate-12 transition-transform duration-500 delay-75 z-20">
                            <Code2 className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#111] rounded-xl border border-white/10 flex items-center justify-center shadow-xl -rotate-3 group-hover:-rotate-6 transition-transform duration-500 delay-100 z-20">
                            <Brain className="w-5 h-5 text-purple-400" />
                        </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Research Interface Ready</h3>
                    <p className="text-sm text-gray-400 max-w-md mb-8 leading-relaxed">
                        Collaborate with Shinmen on complex architectural decisions, algorithm optimization, and deep technical learning paths.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-2xl">
                        {[
                            { icon: Code2, label: "Code Review", action: "review", desc: "Senior-level analysis" },
                            { icon: BookOpen, label: "Curriculum", action: "plan", desc: "Structured learning path" },
                            { icon: Zap, label: "Deep Dive", action: "explain", desc: "Visual explanations" },
                        ].map((item) => (
                            <button 
                                key={item.label}
                                onClick={() => handleQuickAction(item.action)}
                                className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/30 transition-all text-left relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative z-10">
                                    <div className="mb-3 p-2 w-fit rounded-lg bg-black/40 border border-white/10 group-hover:border-violet-500/50 transition-colors">
                                        <item.icon className="w-4 h-4 text-gray-300 group-hover:text-violet-400" />
                                    </div>
                                    <div className="text-sm font-bold text-gray-200 group-hover:text-white">{item.label}</div>
                                    <div className="text-[10px] text-gray-500 mt-1">{item.desc}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <AnimatePresence initial={false}>
                {messages.map((mRaw: any) => {
                    const m = mRaw as any;
                    return (
                    <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        {m.role !== "user" && (
                             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/20 mt-1">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                        )}
                        
                        <div className={`flex flex-col max-w-[85%] gap-2 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                            {/* Name Tag */}
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider ml-1">
                                {m.role === 'user' ? 'You' : 'Shinmen'}
                            </span>

                            <div
                                className={`p-6 rounded-2xl shadow-xl backdrop-blur-sm ${
                                m.role === "user"
                                    ? "bg-white/10 border border-white/10 text-white rounded-tr-none"
                                    : "bg-black/40 border border-white/5 text-gray-200 rounded-tl-none"
                                }`}
                            >
                                {(m as any).toolInvocations?.map((toolInvocation: any) => {
                                    const toolCallId = toolInvocation.toolCallId;
                                    
                                    if (toolInvocation.toolName === 'create_lesson_plan') {
                                        if ('result' in toolInvocation) {
                                        return <LessonPlan key={toolCallId} data={toolInvocation.result} />;
                                        }
                                        return <div key={toolCallId} className="flex items-center gap-2 text-xs text-violet-400 font-mono animate-pulse p-4 bg-violet-500/5 rounded-lg border border-violet-500/20">
                                            <Brain className="w-3 h-3" />
                                            Constructing Pedagogical Structure...
                                        </div>;
                                    }
                                    return null;
                                })}

                                {m.role === "user" ? (
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap font-sans">{m.content}</p>
                                ) : (
                                <div className="prose prose-invert prose-sm max-w-none prose-headings:text-gray-200 prose-p:text-gray-300 prose-strong:text-white prose-pre:bg-[#050505] prose-pre:border prose-pre:border-white/10">
                                <ReactMarkdown
                                    components={{
                                    code(props) {
                                        const {children, className, node, ref, ...rest} = props as any
                                        const match = /language-(\w+)/.exec(className || '')
                                        const language = match ? match[1] : '';
                                        
                                        if (language === 'mermaid') {
                                            return <Mermaid chart={String(children)} />;
                                        }

                                        return match ? (
                                        <SyntaxHighlighter
                                            {...rest}
                                            PreTag="div"
                                            language={language}
                                            style={atomDark}
                                            customStyle={{ margin: 0, borderRadius: '0.5rem', padding: '1.5rem', background: 'transparent', fontSize: '12px' }}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                        ) : (
                                        <code {...rest} className="bg-white/10 px-1.5 py-0.5 rounded text-violet-200 font-mono text-xs border border-white/5">
                                            {children}
                                        </code>
                                        )
                                    }
                                    }}
                                >
                                    {m.content}
                                </ReactMarkdown>
                                </div>
                                )}
                            </div>
                        </div>

                         {m.role === "user" && (
                            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                                <User className="w-4 h-4 text-white" />
                            </div>
                        )}
                    </motion.div>
                    );
                })}
            </AnimatePresence>
            
            {isLoading && (
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 justify-start"
                >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/20">
                        <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-black/40 p-4 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-3">
                        <span className="text-xs text-gray-500 font-mono">Thinking...</span>
                        <div className="flex gap-1">
                             <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                             <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                             <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                        </div>
                    </div>
                </motion.div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/40 backdrop-blur-md border-t border-white/5">
             <form onSubmit={handleSubmit} className="relative flex items-end gap-2 max-w-4xl mx-auto w-full">
                <div className="relative flex-1 group bg-white/5 rounded-2xl border border-white/10 focus-within:border-violet-500/50 focus-within:bg-black/60 transition-all overflow-hidden shadow-inner">
                    <textarea
                        ref={textareaRef}
                        className="w-full bg-transparent text-white p-4 pr-12 max-h-[200px] min-h-[60px] focus:outline-none placeholder:text-gray-600 text-sm resize-none scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e as any);
                            }
                        }}
                        placeholder="Ask Shinmen complex technical questions..."
                        disabled={isLoading}
                        rows={1}
                        style={{ height: 'auto', minHeight: '60px' }} 
                    />
                    <div className="absolute right-2 bottom-2 flex items-center gap-2">
                        <button
                            type="button"
                            className="p-2 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                            title="Attach Context"
                        >
                             <Layout className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                
                <button
                    type="submit"
                    disabled={isLoading || !input?.trim()}
                    className="p-4 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-900/20 border border-violet-500/50 hover:scale-105 active:scale-95 h-[60px] w-[60px] flex items-center justify-center"
                >
                    {isLoading ? (
                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Send className="w-5 h-5 ml-0.5" />
                    )}
                </button>
             </form>
             <div className="text-center mt-3 flex justify-center items-center gap-4 text-[10px] text-gray-600 font-mono">
                 <span className="flex items-center gap-1">
                     <Terminal className="w-3 h-3" />
                     Minimax-M2
                 </span>
                 <span>•</span>
                 <span>Markdown Supported</span>
                 <span>•</span>
                 <span>Mermaid Diagrams</span>
             </div>
        </div>
      </GlassCard>
    </div>
  );
}
