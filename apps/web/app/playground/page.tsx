import PlaygroundMain from "@/components/playground/PlaygroundMain";

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen pt-16 pb-4 px-4 bg-[#000] text-white overflow-hidden">
      <div className="max-w-[1800px] mx-auto h-full flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">
              Code Playground
            </h1>
            <p className="text-sm text-gray-500">
              Write and execute code in 9 languages
            </p>
          </div>
        </div>
        <PlaygroundMain />
      </div>
    </div>
  );
}
