
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-500 p-2 rounded-lg">
              <i className="fas fa-chart-line text-slate-900 text-xl"></i>
            </div>
            <div>
              <h1 className="brand-font text-2xl font-bold tracking-tight">IconInc <span className="text-amber-500">Price Watch</span></h1>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">Market Intelligence • Glasgow</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-semibold hover:text-amber-500 transition-colors">Dashboard</a>
            <a href="#" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Competitors</a>
            <a href="#" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Reports</a>
            <div className="bg-slate-800 px-4 py-2 rounded-full flex items-center space-x-2 border border-slate-700">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               <span className="text-xs font-bold text-slate-300">LIVE MARKET DATA</span>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-slate-100 border-t border-slate-200 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">© 2024 IconInc Bonnie Glasgow Intelligence Unit. Data powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
};
