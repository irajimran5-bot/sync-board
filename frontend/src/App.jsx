import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          SyncBoard Core UI
        </h1>
        <p className="mt-2 text-slate-400 font-medium">Day 4 Frontend Framework </p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Tailwind CSS Operational
        </div>
      </div>
    </div>
  );
}

export default App;