import React, { useState } from 'react';
import TaskCard from './TaskCard';

function ListColumn({ list, onCardAdded }) {
  const [isAdding, setIsAdding] = useState(false);
  const [cardTitle, setCardTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cardTitle.trim()) return;
    await onCardAdded(list._id, cardTitle);
    setCardTitle('');
    setIsAdding(false);
  };

  return (
    <div className="w-80 bg-slate-800/80 rounded-xl p-4 flex flex-col max-h-[80vh] border border-slate-700/60 shadow-lg">
      {}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-200 tracking-wide">{list.title}</h3>
        <span className="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full font-medium">
          {list.cards?.length || 0}
        </span>
      </div> 
      {}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-3">
        {list.cards && list.cards.length > 0 ? (
          list.cards.map((card) => <TaskCard key={card._id} card={card} />)
        ) : (
          <div className="text-center py-8 text-xs text-slate-500 italic border-2 border-dashed border-slate-700 rounded-lg">
            Empty column
          </div>
        )}
      </div>
      {}
      {isAdding ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            className="w-full bg-slate-900 text-sm text-white p-2 rounded-lg border border-cyan-500 focus:outline-hidden"
            placeholder="Enter card title..."
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            autoFocus
          />
          <div className="flex items-center gap-2">
            <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-md transition-colors">
              Add Task
            </button>
            <button type="button" onClick={() => setIsAdding(false)} className="text-xs text-slate-400 hover:text-white px-2 py-1.5">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button 
          onClick={() => setIsAdding(true)} 
          className="w-full border border-dashed border-slate-700 hover:border-cyan-500/50 hover:bg-slate-700/30 text-slate-400 hover:text-cyan-400 text-xs py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-1"
        >
          <span>+</span> Add Card
        </button>
      )}
    </div>
  );
}

export default ListColumn;