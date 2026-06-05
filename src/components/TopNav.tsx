import { Circle } from "lucide-react";

export default function TopNav() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0b0f1a] border-b border-gray-800">
      <div className="max-w-8xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-poppins text-xl font-normal gradient-blue tracking-tight">
            The Fluency Library
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Circle className="w-2 h-2 fill-blue-500 text-blue-500 animate-pulse-glow" />
        </div>
      </div>
    </nav>
  );
}
