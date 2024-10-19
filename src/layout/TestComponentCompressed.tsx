import React, { useState, useEffect } from 'react';

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};



const TestComponentCompressed: React.FC = () => {
    const [bgColor, setBgColor] = useState<string>('');

    useEffect(() => {
        setBgColor(getRandomColor());
    }, []);

    return (
        <div
            style={{ backgroundColor: bgColor }}
            className="flex w-full h-full p-3"
        >
            <div className="w-full h-full bg-white rounded-3xl flex items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-800">
                    TestComponentCompressedProps
                </h1>
            </div>
        </div>
    );
};

export default TestComponentCompressed;
