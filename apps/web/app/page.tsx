"use client";

import { motion } from "framer-motion";
import { 
    Terminal, Activity, UserPlus, Search, TrendingUp, 
    Globe, Zap, Award, Code2, Check, Star, Crown, Shield, Sparkles, ArrowRight
} from "lucide-react";
import { Hero } from "../components/Hero";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

const pricingPlans = [
    {
        name: "Starter",
        price: "Free",
        period: "forever",
        description: "Perfect for beginners starting their coding journey.",
        features: [
            "Access to basic courses (HTML/CSS)",
            "Browser-based IDE",
            "Community support",
            "5 Daily exercises"
        ],
        icon: Code2,
        color: "text-blue-400",
        cta: "Start Learning",
        popular: false,
        gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
        name: "Pro",
        price: "Rs. 2500",
        period: "/month",
        description: "Accelerate your mastery with advanced tools.",
        features: [
            "All Premium Courses (React, Python, etc.)",
            "Unlimited IDE Usage",
            "AI Code Assistant",
            "Real-time Mentorship",
            "Certificate of Completion",
            "Priority Support"
        ],
        icon: Crown,
        color: "text-yellow-400",
        cta: "Go Pro",
        popular: true,
        gradient: "from-yellow-500/20 to-orange-500/20"
    },
    {
        name: "Team",
        price: "Rs. 6500",
        period: "/user/month",
        description: "Collaborate and build with your team.",
        features: [
            "Everything in Pro",
            "Team Dashboards",
            "Assignment Management",
            "Custom Learning Paths",
            "SSO & Advanced Security",
            "API Access"
        ],
        icon: Shield,
        color: "text-purple-400",
        cta: "Contact Sales",
        popular: false,
        gradient: "from-purple-500/20 to-pink-500/20"
    }
];

export default function Home() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="flex flex-col items-center w-full overflow-hidden bg-[#000000] text-foreground selection:bg-primary/30 selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <Hero />

      {/* --- FEATURES SECTION --- */}
      <section className="w-full py-32 px-4 relative z-20 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-primary/5 rounded-full blur-[120px] -z-10" />
          
          <div className="max-w-7xl mx-auto">
             <div className="mb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block mb-4 px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono font-bold tracking-widest uppercase"
                >
                    Core Capabilities
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight"
                >
                    Master the Art of Code
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-muted-foreground text-lg max-w-2xl mx-auto"
                >
                    Empowering learners to code with confidence and joy through advanced tooling and gamified progression.
                </motion.p>
             </div>

             <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
             >
                {/* Code Editor Card */}
                <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 row-span-2 glass-card rounded-[32px] p-1 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="h-full bg-[#0A0A0A] rounded-[28px] p-8 flex flex-col justify-between border border-white/5 relative z-10">
                        <div>
                            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 text-primary ring-1 ring-primary/20 group-hover:scale-110 transition-transform duration-500">
                                <Terminal className="w-7 h-7" />
                            </div>
                            <h3 className="text-3xl font-bold mb-3 text-white">In-Browser IDE</h3>
                            <p className="text-muted-foreground text-lg">Write and execute code directly without software installation. Real-time feedback on your output.</p>
                        </div>
                        <div className="w-full mt-8 rounded-xl bg-black border border-white/10 p-5 font-mono text-sm text-green-400 shadow-2xl">
                            <div className="flex gap-2 mb-4 opacity-50">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="space-y-2">
                                <p className="flex"><span className="text-blue-400 mr-2">~</span> npm install pranisa-sherstha-ui</p>
                                <p className="text-gray-500">Installing packages...</p>
                                <p className="text-green-400">Added 42 packages in 1.4s</p>
                                <p className="animate-pulse flex"><span className="text-blue-400 mr-2">~</span> _</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Card */}
                <motion.div variants={itemVariants} className="col-span-1 row-span-2 glass-card rounded-[32px] p-1 group">
                     <div className="h-full bg-[#0A0A0A] rounded-[28px] p-8 flex flex-col justify-between border border-white/5 relative z-10 overflow-hidden">
                        <div className="relative z-20">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400 ring-1 ring-blue-500/20">
                                <Activity className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Live Progress</h3>
                            <p className="text-muted-foreground text-sm">Monitor your learning velocity.</p>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-48">
                             <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style={{stopColor:'rgb(59, 130, 246)', stopOpacity:0.2}} />
                                        <stop offset="100%" style={{stopColor:'rgb(59, 130, 246)', stopOpacity:0}} />
                                    </linearGradient>
                                </defs>
                                <path d="M0 100 C 20 80, 40 90, 60 60 S 80 20, 100 10 V 100 Z" fill="url(#grad1)" />
                                <path d="M0 100 C 20 80, 40 90, 60 60 S 80 20, 100 10" fill="none" stroke="#3b82f6" strokeWidth="2" className="drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                            </svg>
                        </div>
                     </div>
                </motion.div>

                {/* Feature Cards */}
                <motion.div variants={itemVariants} className="col-span-1 glass-card rounded-[32px] p-8 flex flex-col justify-center hover:-translate-y-1 transition-transform bg-[#0A0A0A] border border-white/5">
                    <Globe className="w-10 h-10 mb-6 text-purple-500" />
                    <h3 className="text-xl font-bold mb-2">Global Access</h3>
                    <p className="text-sm text-muted-foreground">Learn from anywhere, on any device with a browser.</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="col-span-1 glass-card rounded-[32px] p-8 flex flex-col justify-center hover:-translate-y-1 transition-transform bg-[#0A0A0A] border border-white/5">
                    <Zap className="w-10 h-10 mb-6 text-yellow-500" />
                    <h3 className="text-xl font-bold mb-2">Instant Feedback</h3>
                    <p className="text-sm text-muted-foreground">Get automated code reviews and suggestions instantly.</p>
                </motion.div>

                 <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 glass-card rounded-[32px] p-8 flex items-center justify-between relative overflow-hidden group bg-[#0A0A0A] border border-white/5">
                    <div className="relative z-10 max-w-xs">
                        <h3 className="text-2xl font-bold mb-3">Gamified Learning</h3>
                        <p className="text-muted-foreground">Earn XP, unlock badges, and compete on leaderboards as you master new skills.</p>
                    </div>
                    <div className="relative z-10 p-4 bg-yellow-500/10 rounded-full border border-yellow-500/20 group-hover:bg-yellow-500/20 transition-colors">
                        <Award className="w-12 h-12 text-yellow-500" />
                    </div>
                    <div className="absolute right-0 top-0 w-64 h-64 bg-yellow-500/5 blur-3xl rounded-full group-hover:bg-yellow-500/10 transition-colors" />
                </motion.div>
             </motion.div>
          </div>
      </section>

      {/* User Workflow Section */}
      <section className="w-full py-24 px-4 relative z-20">
        <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center">
                <h2 className="text-3xl md:text-5xl font-mono font-bold mb-6 text-white">User Workflow</h2>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
                    The platform guides learners through a seamless journey, from initial registration through course selection, interactive learning, and progress monitoring.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />

                {[
                    { 
                        step: "01", 
                        title: "Join", 
                        desc: "Create account & dashboard",
                        icon: UserPlus,
                        color: "text-purple-400",
                        bg: "bg-purple-500/10",
                        border: "border-purple-500/20"
                    },
                    { 
                        step: "02", 
                        title: "Explore", 
                        desc: "Choose your path",
                        icon: Search,
                        color: "text-blue-400",
                        bg: "bg-blue-500/10",
                        border: "border-blue-500/20"
                    },
                    { 
                        step: "03", 
                        title: "Build", 
                        desc: "Interactive coding labs",
                        icon: Code2,
                        color: "text-green-400",
                        bg: "bg-green-500/10",
                        border: "border-green-500/20"
                    },
                    { 
                        step: "04", 
                        title: "Grow", 
                        desc: "Track & certify skills",
                        icon: TrendingUp,
                        color: "text-yellow-400",
                        bg: "bg-yellow-500/10",
                        border: "border-yellow-500/20"
                    }
                ].map((item, i) => (
                    <motion.div
                        key={item.step}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center group"
                    >
                        <div className="relative mb-6">
                            <div className={`w-24 h-24 rounded-[2rem] ${item.bg} border ${item.border} flex items-center justify-center relative z-10 group-hover:scale-110 transition-all duration-300 shadow-2xl`}>
                                <item.icon className={`w-10 h-10 ${item.color}`} />
                            </div>
                            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-white font-mono font-bold text-xs border border-white/10 z-20 shadow-lg">
                                {item.step}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed px-4">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>
      
      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="w-full py-32 px-4 relative z-20 bg-[#050505]">
           <div className="absolute inset-0 -z-10 overflow-hidden">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-violet-600/10 via-transparent to-transparent rounded-full blur-[120px]" />
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
           </div>
           
           <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4 px-3 py-1 rounded border border-violet-500/30 bg-violet-500/10 text-violet-400 text-[10px] font-mono font-bold tracking-widest uppercase"
                    >
                        System Access
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
                    >
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Protocol</span>
                    </motion.h2>
                </div>

                {/* Toggle */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-16"
                >
                    <div className="relative p-1 rounded bg-white/5 border border-white/10 flex">
                        <div 
                            className={`absolute top-1 bottom-1 rounded bg-violet-600 transition-all duration-300 ${billingCycle === 'monthly' ? 'left-1 w-[calc(50%-4px)]' : 'left-[50%] w-[calc(50%-4px)]'}`}
                        />
                        <button 
                            onClick={() => setBillingCycle('monthly')}
                            className="relative z-10 px-6 py-2 text-sm font-mono font-medium text-white transition-colors w-32"
                        >
                            Monthly
                        </button>
                        <button 
                            onClick={() => setBillingCycle('yearly')}
                            className="relative z-10 px-6 py-2 text-sm font-mono font-medium text-white transition-colors w-32 flex items-center justify-center gap-2"
                        >
                            Yearly
                            <span className="text-[9px] bg-green-500 text-black px-1 rounded font-bold">-20%</span>
                        </button>
                    </div>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pricingPlans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative flex flex-col p-1 rounded-2xl ${
                                plan.popular 
                                ? 'bg-gradient-to-b from-violet-500 to-fuchsia-600' 
                                : 'bg-white/10'
                            }`}
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-white/50 blur-sm" />
                            
                            <div className="h-full bg-[#0A0A0A] rounded-xl p-8 flex flex-col relative overflow-hidden">
                                {/* Grid Overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
                                
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${plan.color}`}>
                                            <plan.icon className="w-6 h-6" />
                                        </div>
                                        {plan.popular && (
                                            <span className="px-3 py-1 rounded bg-violet-500/20 border border-violet-500/30 text-violet-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                                                Recommended
                                            </span>
                                        )}
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className="text-gray-400 text-sm h-10 mb-6">{plan.description}</p>

                                    <div className="mb-8 pb-8 border-b border-white/10">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-bold text-white tracking-tight">
                                                {plan.price === "Free" ? "Rs. 0" : (billingCycle === 'monthly' ? plan.price : `Rs. ${Math.floor(parseInt(plan.price.replace(/[^0-9]/g, '')) * 0.8).toLocaleString()}`)}
                                            </span>
                                            <span className="text-gray-500 font-mono text-xs">
                                                {plan.price === "Free" ? "" : (billingCycle === 'monthly' ? '/mo' : '/mo')}
                                            </span>
                                        </div>
                                        {billingCycle === 'yearly' && plan.price !== "Free" && (
                                            <p className="text-emerald-400 text-xs mt-2 font-mono">
                                                {"// Billed yearly (Save 20%)"}
                                            </p>
                                        )}
                                    </div>

                                    <ul className="space-y-4 mb-8 flex-1">
                                        {plan.features.map((feature, fIndex) => (
                                            <li key={fIndex} className="flex items-start gap-3 text-sm text-gray-300">
                                                <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.popular ? 'text-violet-400' : 'text-gray-600'}`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <button 
                                        className={`w-full py-4 rounded font-mono text-sm font-bold tracking-wider transition-all relative overflow-hidden group ${
                                            plan.popular 
                                            ? 'bg-violet-600 text-white hover:bg-violet-500' 
                                            : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                                        }`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {plan.cta} <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
           </div>
      </section>

      <footer className="w-full py-12 border-t border-white/10 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground relative z-10 font-mono text-sm">
            <p className="flex items-center justify-center gap-2">
                <span>&copy; 2077 Pranisa Sherstha Corp.</span>
                <span className="w-1 h-1 rounded-full bg-green-500"></span>
                <span>All systems nominal.</span>
            </p>
        </div>
      </footer>
    </div>
  );
}
