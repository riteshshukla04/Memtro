import React from 'react';
import { Monitor } from 'lucide-react';

export const MobileWarning: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 bg-neutral-950 flex flex-col items-center justify-center p-8 text-center lg:hidden">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-full mb-6">
                <Monitor className="w-16 h-16 text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Desktop Experience Required</h1>
            <p className="text-neutral-400 text-lg max-w-md">
                Memtro is designed for a rich desktop editing experience. Please open this website on your computer to create your memes.
            </p>
            <div className="mt-8 px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-500 text-sm">
                Screen width must be &gt; 1024px
            </div>
        </div>
    );
};
