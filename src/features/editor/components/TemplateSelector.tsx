import React from 'react';
import { useCanvasActions } from '../hooks/useCanvasActions';

const TEMPLATES = [
    'https://i.imgflip.com/1g8my4.jpg', // Two buttons
    'https://i.imgflip.com/261o3j.jpg', // Buff doge
    'https://i.imgflip.com/30b1gx.jpg', // Drake
    'https://i.imgflip.com/9ehk.jpg',   // Disaster Girl,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzB4z2H5zFreMb11uwjLKyyWH4Vs5UKQYpOw&s", //Old Man yells

];

export const TemplateSelector: React.FC = () => {
    const { addBackgroundFromUrl } = useCanvasActions();

    return (
        <div className="p-4 grid grid-cols-2 gap-2">
            {TEMPLATES.map((url, idx) => (
                <button
                    key={idx}
                    onClick={() => addBackgroundFromUrl(url)}
                    className="border border-neutral-700 rounded overflow-hidden hover:ring-2 ring-blue-500 transition-all"
                >
                    <img src={url} alt={`Template ${idx}`} loading="lazy" className="w-full h-auto object-cover" />
                </button>
            ))}
        </div>
    );
}
