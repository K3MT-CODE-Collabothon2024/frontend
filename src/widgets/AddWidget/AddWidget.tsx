import React, { useState } from "react";

const AddWidget: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Record the initial mouse position
    setStartPos({ x: event.clientX, y: event.clientY });
    setIsDragging(false); // Reset dragging state
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    
  };

  return (
    <div className="w-full h-full bg-transparent border-8 border-dashed border-blue-400 rounded-3xl flex items-center justify-center text-white hover:scale-105 transition-all transition-300">
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="w-24 h-24 rounded-full font-bold text-4xl border-8 border-dashed border-blue-400 text-blue-400 flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
};

export default AddWidget;
