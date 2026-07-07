import React from 'react';
import TaskCard from './TaskCard';

function ListColumn({ list }) {
  return (
    <div className="w-80 bg-slate-800/80 rounded-xl p-4 flex flex-col max-h-[80vh] border border-slate-700/60 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-200 tracking-wide">{list.title}</h3>
        <span className="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full font-medium">
          {list.cards?.length || 0}
        </span>
      </div>
      
      {/* Scrollable container for cards */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {list.cards && list.cards.length > 0 ? (
          list.cards.map((card) => <TaskCard key={card._id} card={card} />)
        ) : (
          <div className="text-center py-8 text-xs text-slate-500 italic border-2 border-dashed border-slate-700 rounded-lg">
            Empty column
          </div>
        )}
      </div>
    </div>
  );
}

export default ListColumn;