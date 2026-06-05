import { useState } from "react";

interface PasswordGateProps {
  onUnlock: () => void;
}

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "fluent2026") {
      onUnlock();
    } else {
      setError(true);
      setPassword("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b0f1a] to-[#111827]">
      <div className="w-full max-w-md px-6 animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Fluent with Sena
          </h1>
          <p className="text-gray-400 text-lg">Your English universe.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={`w-full px-4 py-3 rounded-lg bg-[#111827] text-white placeholder-gray-500 border transition-all duration-300 ${
                error
                  ? "border-red-500 bg-red-500 bg-opacity-10"
                  : "border-gray-700 focus:border-blue-500 focus:outline-none"
              }`}
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-sm mt-2">Incorrect password</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 active:scale-95 transform"
          >
            Enter
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
