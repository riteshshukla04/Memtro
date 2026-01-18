import React from 'react';
import { EditorSidebar } from './components/EditorSidebar';
import { MemeCanvas } from './components/MemeCanvas';
import { EditorToolbar } from './components/EditorToolbar';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

export const EditorLayout: React.FC = () => {
    useKeyboardShortcuts();

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-neutral-900 text-white font-sans">
            <EditorSidebar />
            <main className="flex-1 flex flex-col relative bg-neutral-950">
                <MemeCanvas />
            </main>
            <EditorToolbar />
        </div>
    );
};
