import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';

import { askCollege, AskResponse } from './collegeapi';


export default function App() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"search" | "ai">("ai");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const res =  await askCollege(query, mode); // Replace with: await askCollege(query, mode);
      setData(res);
      setShowResults(true);
    } catch (err) {
      console.error(err);
      // Using a custom alert or modal in a real app is better.
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const closeResults = () => {
    setShowResults(false);
    setData(null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
       <style>{`
        @keyframes text-shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        .animate-text-shimmer {
            animation: text-shimmer 5s linear infinite;
        }
        
        @keyframes fade-in-up {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in-up-slow {
            animation: fade-in-up 1s ease-out 0.5s forwards;
            opacity: 0;
        }
    `}</style>
      {/* 3D Spline Background */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/Dxfd5ItuornHna6n/scene.splinecode" />
      </div>
      
      {/* Main Content Overlay - Moved up */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-20 md:pt-24 p-4 min-h-screen">
        
        {/* Hero Title Section - With animations */}
        <div className="text-center mb-8 backdrop-blur-lg bg-black/20 rounded-2xl p-6 border border-white/10 shadow-xl">
          <div className="flex items-center justify-center mb-3 pb-2">
            <div className="text-5xl mr-3">🎓</div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_auto]">
              College AI
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/80 font-light mb-2 animate-fade-in-up-slow">
            Discover your perfect college with AI
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Search Interface - Made smaller and narrower */}
        <div className="w-full max-w-2xl backdrop-blur-lg bg-black/25 rounded-2xl p-6 border border-white/20 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          
          {/* Search Input */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <div className="text-white/70 text-lg">🔍</div>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about colleges..."
              className="w-full pl-14 pr-5 py-4 text-md bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm transition-all duration-300 focus:bg-white/20"
              disabled={loading}
            />
          </div>

          {/* Mode Selection */}
          <div className="flex justify-center space-x-6 mb-6">
            <label className="flex items-center space-x-2 text-white cursor-pointer group">
              <div className="relative">
                <input
                  type="radio"
                  value="search"
                  checked={mode === "search"}
                  onChange={(e) => setMode(e.target.value as "search" | "ai")}
                  className="w-4 h-4 text-blue-400 focus:ring-blue-400/50 bg-white/20 border-white/30"
                  disabled={loading}
                />
              </div>
              <span className="text-md group-hover:text-blue-300 transition-colors">📚 Search</span>
            </label>
            <label className="flex items-center space-x-2 text-white cursor-pointer group">
              <div className="relative">
                <input
                  type="radio"
                  value="ai"
                  checked={mode === "ai"}
                  onChange={(e) => setMode(e.target.value as "search" | "ai")}
                  className="w-4 h-4 text-blue-400 focus:ring-blue-400/50 bg-white/20 border-white/30"
                  disabled={loading}
                />
              </div>
              <span className="text-md group-hover:text-purple-300 transition-colors">🤖 AI Assistant</span>
            </label>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !query.trim()}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-2xl hover:shadow-3xl"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Searching...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-3">
                <span>{mode === "ai" ? "🚀" : "🔍"}</span>
                <span>{mode === "ai" ? "Ask AI" : "Search"}</span>
              </div>
            )}
          </button>
        </div>

        {/* Footer Credits */}
        <div className="absolute bottom-4 text-center">
          <p className="text-white/40 text-xs">Powered by AI • Built with ❤️</p>
        </div>
      </div>

      {/* Results Modal */}
      {showResults && data && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeResults}
          ></div>
          
          {/* Modal */}
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden transform animate-fade-in">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{mode === "ai" ? "🤖" : "📚"}</div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {mode === "ai" ? "AI Analysis Results" : "Search Results"}
                    </h2>
                    <p className="text-white/80">Query: "{query}"</p>
                  </div>
                </div>
                <button
                  onClick={closeResults}
                  className="text-white/80 hover:text-white text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-all transform hover:scale-110"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[70vh]">
              
              {/* AI Answer Section */}
              {mode === "ai" && data.answer && (
                <div className="mb-8">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border-l-4 border-blue-500 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <span className="mr-3 text-2xl">🎯</span> 
                      AI Analysis
                    </h3>
                    <div className="prose prose-lg text-gray-700">
                      <p className="leading-relaxed whitespace-pre-wrap text-lg">
                        {data.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Results Section */}
              {data.results && data.results.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="mr-3 text-2xl">📚</span>
                    {mode === "ai" ? "Supporting Evidence" : `Found ${data.results.length} Colleges`}
                  </h3>
                  
                  <div className="grid gap-6">
                    {data.results.map((doc: any, i: number) => (
                      <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {i + 1}
                            </div>
                            <span className="font-semibold text-gray-600">College Match</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              Similarity: {(doc.similarity_score || 0).toFixed(2)}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-800 leading-relaxed text-lg break-words">
                          {doc.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {(!data.results || data.results.length === 0) && (
                <div className="text-center py-16 text-gray-500">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p>Try a different search term or check your spelling.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

