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
        <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen w-screen lg:overflow-hidden overflow-y-auto bg-neutral-900 text-white font-sans">
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex shrink">
                <EditorSidebar />
            </div>

            {/* Mobile Sidebar */}
            <div className="lg:hidden">
                <MobileSidebar />
            </div>

            {/* Canvas - shared between layouts */}
            <main className="flex-1 shrink-0 flex flex-col relative bg-neutral-950">
                <MemeCanvas />
            </main>

            {/* Desktop Toolbar */}
            <div className="hidden lg:flex shrink">
                <EditorToolbar />
            </div>

            {/* Mobile Toolbar */}
            <div className="lg:hidden">
                <MobileToolbar />
            </div>
        </div>
    );
};
