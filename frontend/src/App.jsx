import React, { useState, useEffect } from 'react';
import { fetchBoardData } from './api/boardApi';
import ListColumn from './components/ListColumn';

function App() {
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const TARGET_BOARD_ID = "6a4a29348b37e4f8b7b2fce0"; 

  useEffect(() => {
    const getWorkspaceData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching started for ID:", TARGET_BOARD_ID);
        const data = await fetchBoardData(TARGET_BOARD_ID);
        console.log("RAW DATABASE TREE FETCHED:", JSON.stringify(data, null, 2));
        setBoard(data);
      } catch (err) {
        console.error("CRITICAL GATEWAY ERROR:", err.message, err.response?.data);
        setError(err.message || "Failed to load workspace");
      }finally{
        setLoading(false);
      }
    };
    getWorkspaceData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-slate-400 font-medium">Synchronizing Workspace Architecture...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Header Bar */}
      <header className="bg-slate-800/50 border-b border-slate-800 px-8 py-4 backdrop-blur-md">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black tracking-wider bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent uppercase">
              {board?.title || "Workspace Dashboard"}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">{board?.description || "Collaborative space"}</p>
          </div>
          <div className="text-xs bg-slate-700/50 border border-slate-600 px-3 py-1 rounded-md text-slate-300">
            Status: Connected to Node Gateway
          </div>
        </div>
      </header>

      {/* Main Board Viewport */}
      <main className="flex-1 p-8 overflow-x-auto flex items-start gap-6">
        {board?.lists && board.lists.length > 0 ? (
          board.lists.map((list) => <ListColumn key={list._id} list={list} />)
        ) : (
          <div className="m-auto text-center py-12">
            <p className="text-slate-400">No layout structures matching this board profile.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;