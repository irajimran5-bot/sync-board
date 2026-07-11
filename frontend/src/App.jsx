import React, { useState, useEffect } from 'react';
import { fetchBoardData, createList, createCard, deleteCard, moveCardInDatabase } from './api/boardApi'; 
import ListColumn from './components/ListColumn';

function App() {
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const TARGET_BOARD_ID = "6a4a29348b37e4f8b7b2fce0"; 
  const [newListTitle, setNewListTitle] = useState('');
  const [isAddingList, setIsAddingList] = useState(false);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWorkspaceData();
  }, []);

  const handleAddList = async (e) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;
    try {
      await createList(newListTitle, TARGET_BOARD_ID);
      setNewListTitle('');
      setIsAddingList(false);
      await getWorkspaceData();
    } catch (err) {
      alert("Error adding column. Check console.");
    }
  };

  const handleAddCard = async (listId, cardTitle) => {
    try {
      const cardPayload = {
        title: cardTitle,
        description: "Task created from browser workspace UI.",
        listId: listId,
        label: "High" 
      };
      await createCard(cardPayload);
      await getWorkspaceData(); 
    } catch (err) {
      alert("Error adding card. Check console.");
    }
  };

  const handleCardDelete = async (cardId) => {
    if (!window.confirm("Are you sure you want to completely remove this task?")) 
      return;
    try {
      console.log("Broadcasting Delete Trigger for ID:", cardId);
      await deleteCard(cardId);
      await getWorkspaceData();
    } catch(err){
      console.error("MUTATION fault on delete", err);
      alert(`Deletion aborted: ${err.message}`);
    }
  };

  const handleCardDrop = async (cardId, sourceListId, targetListId) => {
    try {
      console.log(`State Sync: Moving ${cardId} to Column ${targetListId}`);
      await moveCardInDatabase(cardId, sourceListId, targetListId);
      await getWorkspaceData();
    } catch (err) {
      console.error("Drag handler fault:", err);
      alert(`Failed to save new position: ${err.message}`);
    }
  };

  if (loading && !board) {
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
      <header className="bg-slate-800/50 border-b border-slate-800 px-8 py-4 backdrop-blur-md">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black tracking-wider bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent uppercase">
              {board?.title || "Workspace Dashboard"}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">{board?.description || "Collaborative Kanban space"}</p>
          </div>
          <div className="text-xs bg-slate-700/50 border border-slate-600 px-3 py-1 rounded-md text-slate-300">
            Status: Fully Operational 
          </div>
        </div>
      </header>

      <main className="flex-1 p-8 overflow-x-auto flex items-start gap-6">
        {board && board.lists && board.lists.map((list) => (
          <ListColumn 
            key={list._id} 
            list={list} 
            onCardAdded={handleAddCard}
            onCardDeleted={handleCardDelete}
            onCardDropped={handleCardDrop}
          />
        ))}

        {isAddingList ? (
          <form onSubmit={handleAddList} className="w-80 bg-slate-800/40 p-4 rounded-xl border border-slate-700/60 space-y-3 shrink-0">
            <input
              type="text"
              id="new-list-input"
              name="newListTitle"
              className="w-full bg-slate-900 text-sm text-white p-2 rounded-lg border border-cyan-400 focus:outline-hidden"
              placeholder="Enter column name..."
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              autoFocus
            />
            <div className="flex items-center gap-2">
              <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-md transition-colors">
                Add Column
              </button>
              <button type="button" onClick={() => setIsAddingList(false)} className="text-xs text-slate-400 hover:text-white px-2 py-1.5">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAddingList(true)}
            className="w-80 border-2 border-dashed border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/40 text-slate-500 hover:text-cyan-400 p-4 rounded-xl font-bold text-sm transition-all duration-200 text-center shrink-0"
          >
            + Add New Column
          </button>
        )}
      </main>
    </div>
  );
}

export default App;