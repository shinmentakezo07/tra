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
      <section id="pricing" className="w-full py-32 px-4 relative z-20 bg-[#050505] overflow-hidden">
           {/* Cyberpunk Background */}
           <div className="absolute inset-0 -z-10 overflow-hidden">
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
               
               {/* Accent Glows */}
               <motion.div 
                   animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                   transition={{ duration: 8, repeat: Infinity }}
                   className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[150px]" 
               />
               <motion.div 
                   animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.3, 1] }}
                   transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                   className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-fuchsia-600/20 rounded-full blur-[150px]" 
               />
           </div>
           
           <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="group inline-flex items-center gap-3 px-3 py-1.5 rounded bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all cursor-default hover:border-violet-500/50 mb-6"
                    >
                        <div className="flex items-center gap-2 px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400 text-[10px] font-mono font-bold">
                            <Crown className="w-3 h-3" />
                            ACCESS
                        </div>
                        <span className="text-xs font-mono text-gray-400 tracking-wide group-hover:text-white transition-colors uppercase">
                            SYSTEM TIER SELECTION // INITIALIZE
                        </span>
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-white mb-6"
                    >
                        Choose Your{" "}
                        <span className="relative inline-block text-6xl md:text-8xl lg:text-9xl font-black">
                            <span className="relative inline-block">
                                PROTOCOL
                                {/* Glitch effect */}
                                <span className="absolute inset-0 text-violet-500 opacity-70 blur-[2px] animate-pulse" aria-hidden="true">
                                    PROTOCOL
                                </span>
                                <span className="absolute inset-0 text-fuchsia-400 translate-x-0.5 translate-y-0.5 opacity-50" aria-hidden="true">
                                    PROTOCOL
                                </span>
                            </span>
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Select your access tier and unlock the full potential of our platform.
                        <span className="text-white font-medium"> Flexible plans</span> for every journey.
                    </motion.p>
                </div>

                {/* Cyber Toggle */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-16"
                >
                    <div className="p-1 bg-white/5 border border-white/10 rounded flex backdrop-blur-sm">
                        <button 
                            onClick={() => setBillingCycle('monthly')}
                            className={`relative group px-8 py-3 font-mono text-sm font-bold tracking-wider transition-all flex items-center justify-center gap-2 ${
                                billingCycle === 'monthly' ? 'text-black' : 'text-white'
                            }`}
                        >
                            <div className={`absolute inset-0 transition-all duration-300 ${
                                billingCycle === 'monthly' ? "bg-white" : "bg-white/5 hover:bg-white/10"
                            }`} />
                            {billingCycle === 'monthly' && (
                                <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                            )}
                            <span className="relative z-10">MONTHLY</span>
                        </button>
                        <button 
                            onClick={() => setBillingCycle('yearly')}
                            className={`relative group px-8 py-3 font-mono text-sm font-bold tracking-wider transition-all flex items-center justify-center gap-2 ${
                                billingCycle === 'yearly' ? 'text-black' : 'text-white'
                            }`}
                        >
                            <div className={`absolute inset-0 transition-all duration-300 ${
                                billingCycle === 'yearly' ? "bg-white" : "bg-white/5 hover:bg-white/10"
                            }`} />
                            {billingCycle === 'yearly' && (
                                <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                            )}
                            <span className="relative z-10">YEARLY</span>
                            <span className="relative z-10 text-[9px] bg-green-500 text-black px-1.5 py-0.5 rounded font-bold">-20%</span>
                        </button>
                    </div>
                </motion.div>

                {/* Enhanced Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingPlans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            whileHover={{ y: -8 }}
                            className="relative flex flex-col group"
                        >
                            {/* Glow Effect */}
                            <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 ${
                                plan.popular 
                                    ? 'bg-violet-600/30' 
                                    : 'bg-blue-600/20'
                            }`} />
                            
                            {/* Card Container */}
                            <div className={`relative flex flex-col h-full p-1 rounded-2xl ${
                                plan.popular 
                                ? 'bg-gradient-to-b from-violet-500 to-fuchsia-600' 
                                : 'bg-white/10'
                            }`}>
                                {/* Top Accent Line */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-white/50 blur-sm" />
                                
                                <div className="h-full bg-[#0A0A0A] rounded-xl p-8 flex flex-col relative overflow-hidden">
                                    {/* Animated Grid Pattern */}
                                    <motion.div 
                                        className="absolute inset-0 opacity-20"
                                        animate={{
                                            backgroundPosition: ['0% 0%', '100% 100%'],
                                        }}
                                        transition={{
                                            duration: 20,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}
                                        style={{
                                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                                            backgroundSize: '20px 20px'
                                        }}
                                    />
                                
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
                                        className={`relative w-full py-4 font-mono text-sm font-bold tracking-wider transition-all overflow-hidden group/btn ${
                                            plan.popular ? 'text-black' : 'text-white'
                                        }`}
                                    >
                                        {/* Background */}
                                        <div className={`absolute inset-0 transition-all duration-300 ${
                                            plan.popular 
                                                ? 'bg-white group-hover/btn:bg-cyan-400' 
                                                : 'bg-white/5 hover:bg-white/10 border border-white/10'
                                        }`} />
                                        
                                        {/* Shine Effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                                        
                                        <span className="relative z-10 flex items-center justify-center gap-2 uppercase">
                                            {plan.cta} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </span>
                                    </button>
                                    </div>
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
