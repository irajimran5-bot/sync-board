import React from 'react';

function TaskCard({ card }) {
  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow-md border border-slate-600 space-y-2 hover:border-cyan-500 transition-all cursor-pointer">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-white text-sm">{card.title}</h4>
        {card.label && (
          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
            card.label === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
          }`}>
            {card.label}
          </span>
        )}
      </div>
      {card.description && <p className="text-xs text-slate-400 line-clamp-2">{card.description}</p>}
    </div>
  );
}

export default TaskCard;