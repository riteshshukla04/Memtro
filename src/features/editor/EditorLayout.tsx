import React from 'react';
import { EditorSidebar } from './components/EditorSidebar';
import { MemeCanvas } from './components/MemeCanvas';
import { EditorToolbar } from './components/EditorToolbar';
import { MobileSidebar } from './components/MobileSidebar';
import { MobileToolbar } from './components/MobileToolbar';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

export const EditorLayout: React.FC = () => {
    useKeyboardShortcuts();

    return (
        <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden bg-neutral-900 text-white font-sans">
            {/* Desktop Sidebar - hidden on mobile */}
            <div className="hidden lg:block">
                <EditorSidebar />
            </div>

            {/* Mobile Sidebar - visible only on mobile */}
            <div className="lg:hidden">
                <MobileSidebar />
            </div>

            <main className="flex-1 flex flex-col relative bg-neutral-950">
                <MemeCanvas />
            </main>

            {/* Desktop Toolbar - hidden on mobile */}
            <div className="hidden lg:block">
                <EditorToolbar />
            </div>

            {/* Mobile Toolbar - visible only on mobile */}
            <div className="lg:hidden">
                <MobileToolbar />
            </div>
        </div>
    );
};
