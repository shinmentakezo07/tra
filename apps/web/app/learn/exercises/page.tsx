"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, PlayCircle, CheckCircle, Terminal, Brain, Sparkles, ChevronRight, Trophy } from "lucide-react";
import CodeEditor from "@/components/CodeEditor";

const exercises = [
  {
    id: 1,
    title: "Reverse a String",
    difficulty: "Easy",
    language: "javascript",
    description: "Write a function that reverses a string. The input string is given as an argument.",
    starterCode: `function reverseString(str) {
  // Your code here
  return str;
}

console.log(reverseString("hello"));`,
    testCase: "hello -> olleh"
  },
  {
    id: 2,
    title: "FizzBuzz",
    difficulty: "Easy",
    language: "python",
    description: "Write a program that prints the numbers from 1 to 100. But for multiples of three print 'Fizz' instead of the number and for the multiples of five print 'Buzz'. For numbers which are multiples of both three and five print 'FizzBuzz'.",
    starterCode: `def fizz_buzz(n):
    # Your code here
    pass

fizz_buzz(15)`,
    testCase: "3 -> Fizz, 5 -> Buzz, 15 -> FizzBuzz"
  },
  {
    id: 3,
    title: "Two Sum",
    difficulty: "Medium",
    language: "javascript",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    starterCode: `function twoSum(nums, target) {
  // Your code here
}

console.log(twoSum([2,7,11,15], 9));`,
    testCase: "[2,7,11,15], 9 -> [0, 1]"
  },
  {
    id: 4,
    title: "Valid Palindrome",
    difficulty: "Easy",
    language: "python",
    description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
    starterCode: `def is_palindrome(s):
    # Your code here
    pass

print(is_palindrome("A man, a plan, a canal: Panama"))`,
    testCase: "\"A man, a plan, a canal: Panama\" -> True"
  },
  {
    id: 5,
    title: "Sum of List",
    difficulty: "Easy",
    language: "python",
    description: "Write a function that receives a list of numbers and returns the sum of all numbers.",
    starterCode: `def sum_list(numbers):
    # Your code here
    pass

print(sum_list([1, 2, 3, 4, 5]))`,
    testCase: "[1, 2, 3, 4, 5] -> 15"
  },
  {
    id: 6,
    title: "Factorial",
    difficulty: "Medium",
    language: "python",
    description: "Write a function that returns the factorial of a non-negative integer. The factorial of n is the product of all positive integers less than or equal to n.",
    starterCode: `def factorial(n):
    # Your code here
    pass

print(factorial(5))`,
    testCase: "5 -> 120"
  },
  {
    id: 7,
    title: "Count Vowels",
    difficulty: "Easy",
    language: "python",
    description: "Write a function that counts the number of vowels (a, e, i, o, u) in a given string (case insensitive).",
    starterCode: `def count_vowels(text):
    # Your code here
    pass

print(count_vowels("Hello World"))`,
    testCase: "\"Hello World\" -> 3"
  },
  {
    id: 8,
    title: "Check Prime",
    difficulty: "Medium",
    language: "python",
    description: "Write a function that checks if a number is prime. Returns True if prime, False otherwise.",
    starterCode: `def is_prime(n):
    # Your code here
    pass

print(is_prime(17))`,
    testCase: "17 -> True, 4 -> False"
  }
];

export default function ExercisesPage() {
  const [activeExercise, setActiveExercise] = useState(exercises[0]);

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 bg-[#050505] relative overflow-hidden">
       {/* Ambient Background */}
       <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-green-600/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
       </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium mb-4">
                    <Brain className="w-3 h-3" />
                    DAILY CHALLENGES
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                  Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">Gym</span>
                </h1>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Sharpen your problem-solving skills with targeted algorithmic challenges.
                  Level up your coding fluency one function at a time.
                </p>
            </motion.div>
            
            <div className="flex items-center gap-4">
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <div>
                        <div className="text-[10px] font-bold text-gray-500 uppercase">Total Solved</div>
                        <div className="text-sm font-mono font-bold text-white">12/50</div>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar List */}
            <div className="lg:col-span-4 space-y-4 h-[calc(100vh-24rem)] overflow-y-auto pr-2 custom-scrollbar">
                {exercises.map((ex, i) => (
                    <motion.button
                        key={ex.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setActiveExercise(ex)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
                            activeExercise.id === ex.id 
                            ? "bg-primary/10 border-primary/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
                            : "bg-[#0A0A0A] border-white/5 hover:border-white/10 hover:bg-white/5"
                        }`}
                    >
                        {activeExercise.id === ex.id && (
                             <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-20" />
                        )}
                        
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className={`font-bold transition-colors ${activeExercise.id === ex.id ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                    {ex.title}
                                </h3>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                    ex.difficulty === "Easy" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                    ex.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                                    "bg-red-500/10 text-red-400 border-red-500/20"
                                }`}>
                                    {ex.difficulty}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                                    <Code2 className="w-3 h-3" />
                                    <span className="capitalize">{ex.language}</span>
                                </div>
                                {activeExercise.id === ex.id && <ChevronRight className="w-4 h-4 text-primary animate-pulse" />}
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8">
                <motion.div 
                    key={activeExercise.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-1 relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    
                    <div className="relative bg-[#0A0A0A] rounded-[28px] overflow-hidden">
                         {/* Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                                    <Terminal className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">{activeExercise.title}</h2>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span>Live Environment</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors border border-transparent hover:border-white/10">
                                    <Sparkles className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Description & Test Case */}
                        <div className="p-6 grid gap-6">
                             <div className="prose prose-invert max-w-none">
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {activeExercise.description}
                                </p>
                             </div>

                             <div className="bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-gray-500 uppercase font-bold">Expected Output</span>
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400">Read-only</span>
                                </div>
                                <div className="flex items-center gap-3 text-green-400">
                                    <ChevronRight className="w-4 h-4 opacity-50" />
                                    {activeExercise.testCase}
                                </div>
                             </div>
                        </div>

                        {/* Editor */}
                        <div className="h-[450px] border-t border-white/10">
                            <CodeEditor 
                                initialCode={activeExercise.starterCode}
                                language={activeExercise.language}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
      </div>
    </div>
  );
}
