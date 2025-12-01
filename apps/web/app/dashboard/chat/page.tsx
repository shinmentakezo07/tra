import ChatPlayground from "@/components/ChatPlayground";

export default function ChatPage() {
  return (
    <div className="min-h-screen pt-24 px-4 pb-8 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none z-[-1]" />
        
        <div className="max-w-5xl mx-auto mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">AI Research Lab</h1>
            <p className="text-gray-400">Collaborate with our advanced AI tutor, Shinmen.</p>
        </div>

      <ChatPlayground />
    </div>
  );
}
