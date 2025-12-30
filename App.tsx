
import React, { useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { performMarketAnalysis } from './services/geminiService';
import { AnalysisResult } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startAnalysis = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await performMarketAnalysis();
      setData(result);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch market data. Please ensure the API key is valid and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {!data && !loading && (
          <div className="max-w-2xl mx-auto text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 p-12">
            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <i className="fas fa-search-dollar text-4xl text-amber-600"></i>
            </div>
            <h2 className="brand-font text-4xl font-bold mb-6 text-slate-900">Glasgow Student Market Analysis</h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              Compare <span className="font-bold text-slate-900">IconInc The Bonnie</span> against top-tier Glasgow student accommodations. 
              Get real-time pricing intelligence using Gemini's search grounding.
            </p>
            <button 
              onClick={startAnalysis}
              className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center mx-auto"
            >
              <i className="fas fa-bolt mr-3 text-amber-500"></i>
              Launch Market Analysis
            </button>
            <div className="mt-8 pt-8 border-t border-slate-100">
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold mb-4">
                Analysis Coverage
              </p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] font-medium text-slate-500">
                <span>Vita West End</span>
                <span>•</span>
                <span>Canvas Student</span>
                <span>•</span>
                <span>Derwent Student</span>
                <span>•</span>
                <span>Student Roost</span>
                <span>•</span>
                <span>Social Hub</span>
                <span>•</span>
                <span>Aparto</span>
                <span>•</span>
                <span>Clifton & Stewart</span>
                <span>•</span>
                <span>Capitol Students</span>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-32 space-y-8">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-slate-200 border-t-amber-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <i className="fas fa-building text-slate-300 animate-pulse"></i>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-800 animate-pulse">Accessing Market Intelligence...</h3>
              <p className="text-slate-500 mt-2">Crawling competitor data for Glasgow student housing market.</p>
              <div className="mt-8 flex justify-center space-x-2">
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl max-w-2xl mx-auto shadow-sm">
            <div className="flex items-center">
              <i className="fas fa-exclamation-triangle text-red-500 text-xl mr-4"></i>
              <div>
                <h3 className="font-bold text-red-800">Analysis Error</h3>
                <p className="text-red-700 text-sm mt-1">{error}</p>
                <button 
                  onClick={startAnalysis}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors"
                >
                  Retry Analysis
                </button>
              </div>
            </div>
          </div>
        )}

        {data && !loading && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Latest Analysis Result • {new Date().toLocaleDateString()}
              </h2>
              <button 
                onClick={startAnalysis}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 underline flex items-center"
              >
                <i className="fas fa-sync-alt mr-1"></i> Refresh Data
              </button>
            </div>
            <Dashboard data={data} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
