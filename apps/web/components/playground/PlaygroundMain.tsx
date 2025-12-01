"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { 
  Play, 
  Trash2, 
  Terminal as TerminalIcon,
  Loader2,
  Globe,
  Copy,
  Check,
  Download,
  RotateCcw,
  Maximize2,
  Minimize2,
  Clock,
  ChevronDown
} from "lucide-react";
import Terminal from "./Terminal";
import { Terminal as XTerminal } from "xterm";
import { Icons } from "../icons";

const LANGUAGES = {
  python: {
    name: "Python",
    pistonParams: { language: "python", version: "3.10.0" },
    defaultCode: `# Python Playground
def greet(name):
    print(f"Hello, {name}!")

greet("World")

# Calculate fibonacci
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

print(f"Fibonacci(10) = {fib(10)}")`,
    icon: <Icons.python className="w-5 h-5" />,
    mode: "python"
  },
  javascript: {
    name: "JavaScript",
    pistonParams: { language: "javascript", version: "18.15.0" },
    defaultCode: `// JavaScript Playground
console.log("Hello from Node.js!");

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

// Async example
const delay = ms => new Promise(r => setTimeout(r, ms));
(async () => {
    console.log("Starting...");
    await delay(100);
    console.log("Done!");
})();`,
    icon: <Icons.javascript className="w-5 h-5" />,
    mode: "javascript"
  },
  typescript: {
    name: "TypeScript",
    pistonParams: { language: "typescript", version: "5.0.3" },
    defaultCode: `// TypeScript Playground
interface User {
    name: string;
    age: number;
}

function greet(user: User): string {
    return \`Hello, \${user.name}! You are \${user.age} years old.\`;
}

const user: User = { name: "Alice", age: 30 };
console.log(greet(user));`,
    icon: <Icons.typescript className="w-5 h-5" />,
    mode: "typescript"
  },
  html: {
    name: "HTML/CSS",
    pistonParams: null,
    defaultCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: system-ui, sans-serif; 
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .card {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 32px;
      text-align: center;
      border: 1px solid rgba(255,255,255,0.2);
    }
    h1 { margin-bottom: 16px; }
    button {
      padding: 12px 24px;
      background: #6366f1;
      border: none;
      border-radius: 8px;
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, background 0.2s;
    }
    button:hover { background: #4f46e5; transform: scale(1.05); }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello World!</h1>
    <p>Edit this code and click Run to see changes.</p>
    <br>
    <button onclick="alert('It works!')">Click Me</button>
  </div>
</body>
</html>`,
    icon: <Icons.html className="w-5 h-5" />,
    mode: "html"
  },
  c: {
    name: "C",
    pistonParams: { language: "c", version: "10.2.0" },
    defaultCode: `#include <stdio.h>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    printf("Hello from C!\\n");
    printf("Factorial of 5 = %d\\n", factorial(5));
    return 0;
}`,
    icon: <Icons.c className="w-5 h-5" />,
    mode: "c"
  },
  cpp: {
    name: "C++",
    pistonParams: { language: "cpp", version: "10.2.0" },
    defaultCode: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::cout << "Hello from C++!" << std::endl;
    
    std::vector<int> nums = {5, 2, 8, 1, 9};
    std::sort(nums.begin(), nums.end());
    
    std::cout << "Sorted: ";
    for (int n : nums) std::cout << n << " ";
    std::cout << std::endl;
    
    return 0;
}`,
    icon: <Icons.cpp className="w-5 h-5" />,
    mode: "cpp"
  },
  go: {
    name: "Go",
    pistonParams: { language: "go", version: "1.16.2" },
    defaultCode: `package main

import (
    "fmt"
    "strings"
)

func main() {
    fmt.Println("Hello from Go!")
    
    words := []string{"Hello", "Go", "World"}
    result := strings.Join(words, " ")
    fmt.Println(result)
}`,
    icon: <Icons.go className="w-5 h-5" />,
    mode: "go"
  },
  rust: {
    name: "Rust",
    pistonParams: { language: "rust", version: "1.68.2" },
    defaultCode: `fn main() {
    println!("Hello from Rust!");
    
    let numbers: Vec<i32> = (1..=5).collect();
    let sum: i32 = numbers.iter().sum();
    
    println!("Sum of 1-5: {}", sum);
}`,
    icon: <Icons.rust className="w-5 h-5" />,
    mode: "rust"
  },
  java: {
    name: "Java",
    pistonParams: { language: "java", version: "15.0.2" },
    defaultCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
        
        int[] nums = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int n : nums) sum += n;
        
        System.out.println("Sum: " + sum);
    }
}`,
    icon: <Icons.java className="w-5 h-5" />,
    mode: "java"
  }
};

type LanguageKey = keyof typeof LANGUAGES;

interface ExecutionResult {
  language: string;
  timestamp: Date;
  success: boolean;
  executionTime?: number;
}

export default function PlaygroundMain() {
  const [activeLang, setActiveLang] = useState<LanguageKey>("python");
  const [code, setCode] = useState(LANGUAGES["python"].defaultCode);
  const [isRunning, setIsRunning] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");
  const [mobileTab, setMobileTab] = useState<"editor" | "output">("editor");
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [executionHistory, setExecutionHistory] = useState<ExecutionResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const terminalRef = useRef<XTerminal | null>(null);
  const codeCache = useRef<Record<string, string>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLangChange = (lang: LanguageKey) => {
    codeCache.current[activeLang] = code;
    setActiveLang(lang);
    setCode(codeCache.current[lang] || LANGUAGES[lang].defaultCode);
    setIframeSrc("");
    
    if (terminalRef.current) {
      terminalRef.current.reset();
      terminalRef.current.writeln(`\x1b[1;36m→ Switched to ${LANGUAGES[lang].name}\x1b[0m`);
      terminalRef.current.writeln(`\x1b[90mPress Ctrl+Enter to run\x1b[0m\n`);
    }
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = useCallback(() => {
    const extensions: Record<LanguageKey, string> = {
      python: 'py', javascript: 'js', typescript: 'ts', html: 'html',
      c: 'c', cpp: 'cpp', go: 'go', rust: 'rs', java: 'java'
    };
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extensions[activeLang]}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [code, activeLang]);

  const resetCode = () => {
    setCode(LANGUAGES[activeLang].defaultCode);
    codeCache.current[activeLang] = LANGUAGES[activeLang].defaultCode;
    if (terminalRef.current) {
      terminalRef.current.reset();
      terminalRef.current.writeln(`\x1b[1;33m↺ Code reset to default\x1b[0m\n`);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const runCode = useCallback(async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setMobileTab("output");
    const currentLang = LANGUAGES[activeLang];
    const startTime = Date.now();

    if (activeLang === "html") {
      setIframeSrc(code);
      setIsRunning(false);
      setExecutionHistory(prev => [...prev.slice(-9), {
        language: currentLang.name,
        timestamp: new Date(),
        success: true,
        executionTime: Date.now() - startTime
      }]);
      return;
    }

    if (terminalRef.current) {
      terminalRef.current.reset();
      terminalRef.current.writeln(`\x1b[1;33m⚡ Running ${currentLang.name}...\x1b[0m\n`);
    }

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: currentLang.pistonParams?.language,
          version: currentLang.pistonParams?.version,
          files: [{ content: code }]
        })
      });

      const result = await response.json();
      const executionTime = Date.now() - startTime;
      
      if (terminalRef.current) {
        if (result.run) {
          const stdout = result.run.stdout || "";
          const stderr = result.run.stderr || "";
          
          if (stdout) {
            terminalRef.current.write(stdout.replace(/\n/g, '\r\n'));
          }
          if (stderr) {
            terminalRef.current.writeln(`\r\n\x1b[1;31m${stderr.replace(/\n/g, '\r\n')}\x1b[0m`);
          }
          
          const exitCode = result.run.code;
          const statusColor = exitCode === 0 ? '32' : '31';
          const statusIcon = exitCode === 0 ? '✓' : '✗';
          
          terminalRef.current.writeln(`\r\n\x1b[1;${statusColor}m${statusIcon} Exit: ${exitCode}\x1b[0m \x1b[90m(${executionTime}ms)\x1b[0m`);
          
          setExecutionHistory(prev => [...prev.slice(-9), {
            language: currentLang.name,
            timestamp: new Date(),
            success: exitCode === 0,
            executionTime
          }]);
        } else {
          terminalRef.current.writeln(`\x1b[1;31m✗ Execution failed\x1b[0m`);
          if (result.message) {
            terminalRef.current.writeln(`\x1b[90m${result.message}\x1b[0m`);
          }
        }
      }
    } catch (error) {
      if (terminalRef.current) {
        terminalRef.current.writeln(`\x1b[1;31m✗ Network error: ${error}\x1b[0m`);
      }
    } finally {
      setIsRunning(false);
    }
  }, [code, activeLang, isRunning]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        downloadCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [runCode, downloadCode]);

  if (!isMounted) return null;

  return (
    <div 
      ref={containerRef}
      className="flex flex-col md:flex-row h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] bg-[#0a0a0a] text-gray-300 overflow-hidden rounded-xl border border-white/10 relative"
    >
      {/* Language Sidebar */}
      <div className="w-full md:w-14 bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-white/10 flex flex-row md:flex-col items-center py-2 md:py-3 gap-1 z-10 overflow-x-auto px-2 md:px-0">
        {Object.entries(LANGUAGES).map(([key, lang]) => (
          <button
            key={key}
            onClick={() => handleLangChange(key as LanguageKey)}
            className={`p-2 rounded-lg transition-all shrink-0 ${
              activeLang === key 
                ? "bg-white/10 text-white" 
                : "text-gray-500 hover:text-white hover:bg-white/5"
            }`}
            title={lang.name}
          >
            {lang.icon}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="h-12 bg-[#0a0a0a] border-b border-white/10 flex items-center justify-between px-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-white flex items-center gap-2">
              {LANGUAGES[activeLang].icon}
              {LANGUAGES[activeLang].name}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Mobile Tab Switcher */}
            <div className="flex md:hidden bg-white/5 rounded-lg p-0.5 mr-2">
              <button
                onClick={() => setMobileTab("editor")}
                className={`px-3 py-1 text-xs font-medium rounded ${mobileTab === "editor" ? "bg-white/10 text-white" : "text-gray-500"}`}
              >
                Code
              </button>
              <button
                onClick={() => setMobileTab("output")}
                className={`px-3 py-1 text-xs font-medium rounded ${mobileTab === "output" ? "bg-white/10 text-white" : "text-gray-500"}`}
              >
                Output
              </button>
            </div>

            {/* Action Buttons */}
            <button onClick={copyCode} className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all" title="Copy code">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <button onClick={downloadCode} className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all hidden sm:block" title="Download">
              <Download className="w-4 h-4" />
            </button>
            <button onClick={resetCode} className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all" title="Reset code">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button onClick={toggleFullscreen} className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all hidden md:block" title="Fullscreen">
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            
            {/* History Dropdown */}
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                title="History"
              >
                <Clock className="w-4 h-4" />
              </button>
              {showHistory && executionHistory.length > 0 && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl z-50 py-1">
                  {executionHistory.slice().reverse().map((item, i) => (
                    <div key={i} className="px-3 py-2 text-xs flex items-center justify-between hover:bg-white/5">
                      <span className="text-gray-400">{item.language}</span>
                      <span className={item.success ? "text-green-500" : "text-red-500"}>
                        {item.executionTime}ms
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block" />
            
            {/* Run Button */}
            <button 
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg transition-all disabled:opacity-50 hover:bg-gray-200"
            >
              {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              <span className="hidden sm:inline">Run</span>
            </button>
          </div>
        </div>

        {/* Workspace */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Editor */}
          <div className={`flex-1 relative min-h-0 border-b lg:border-b-0 lg:border-r border-white/10 
            ${activeLang === 'html' ? 'lg:w-1/2' : 'lg:w-3/5'}
            ${mobileTab === 'editor' ? 'flex' : 'hidden lg:flex'}
          `}>
            <Editor
              height="100%"
              language={LANGUAGES[activeLang].mode}
              value={code}
              onChange={(val) => setCode(val || "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                lineHeight: 1.6,
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on",
                renderLineHighlight: "line",
                bracketPairColorization: { enabled: true },
                guides: { bracketPairs: true },
                wordWrap: "on",
              }}
            />
            {/* Keyboard shortcut hint */}
            <div className="absolute bottom-3 right-3 text-[10px] text-gray-600 hidden lg:block">
              Ctrl+Enter to run
            </div>
          </div>

          {/* Output / Preview */}
          <div className={`flex-1 bg-[#0a0a0a] flex flex-col 
            ${activeLang === 'html' ? 'lg:w-1/2' : 'lg:w-2/5'}
            ${mobileTab === 'output' ? 'flex' : 'hidden lg:flex'}
          `}>
            {activeLang === 'html' ? (
              <div className="flex-1 bg-white w-full h-full relative">
                {iframeSrc ? (
                  <iframe 
                    srcDoc={iframeSrc}
                    className="w-full h-full border-none"
                    sandbox="allow-scripts allow-modals"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
                    <div className="text-center text-gray-500">
                      <Globe className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Click Run to preview</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="h-10 bg-[#0a0a0a] flex items-center justify-between px-3 border-b border-white/10 shrink-0">
                  <span className="text-xs font-medium text-gray-400 flex items-center gap-2">
                    <TerminalIcon className="w-3.5 h-3.5" /> Output
                  </span>
                  <button 
                    onClick={() => terminalRef.current?.clear()}
                    className="p-1 hover:bg-white/5 rounded transition-colors"
                    title="Clear"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-gray-500 hover:text-white" />
                  </button>
                </div>
                <div className="flex-1 relative min-h-0">
                  <Terminal onMount={(term) => { terminalRef.current = term; }} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
