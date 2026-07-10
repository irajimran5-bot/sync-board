import React from 'react'

function TaskCard({card,onDeleteClick}){
  const labelColors={
    High:"bg-rose-500/10 text-rose-400 border-rose-500/20",
    Medium:"bg-amber-500/10 text-amber-400 border-amber-500/20",
    Low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  };
  const handleDragStart=(e)=>{
    console.log("Drag started for card ID",card._id);
    e.dataTransfer.setData("text/plain",card._id);
    e.dataTransfer.setData("sourceListId",card.listId);
    e.dataTransfer.effectAllowed="move";

  };

  return(

    <div 
     draggable="true"
     onDragStart={handleDragStart}
     className="group relative bg-slate-900/90 border border-slate-700/50 hover:border-slate-600 p-3 rounded-lg shadow-xs hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-center gap-2 mb-2">
        <span className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold tracking-wider uppercase ${labelColors[card.label] || "bg-slate-700 text-slate-300"}`}>
          {card.label}
        </span>
        <button 
          onClick={() => onDeleteClick(card._id)}
          className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 text-sm p-1 rounded-sm hover:bg-slate-800 transition-all duration-200"
          title="Delete Task"
        >
          🗑️
        </button>
      </div>
      <h4 className="text-sm font-semibold text-slate-200 tracking-wide line-clamp-2 mb-1">
        {card.title}
      </h4>
      {card.description && (
        <p className="text-xs text-slate-400 font-normal line-clamp-2 leading-relaxed">
          {card.description}
        </p>
      )}
    </div>
  );
}

export default TaskCard;
