import React from 'react';

const AddWidget: React.FC = () => {
    return (
        <div className="w-full h-full bg-transparent border-8 border-dashed border-blue-400 rounded-3xl flex items-center justify-center text-white">
            <button className="w-24 h-24 rounded-full font-bold text-4xl border-8 border-dashed border-blue-400 text-blue-400 flex items-center justify-center">
                +
            </button>
        </div>
    );
};

export default AddWidget;
