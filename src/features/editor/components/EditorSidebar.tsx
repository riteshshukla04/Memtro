import React from 'react';
import { Type, Github } from 'lucide-react';
import { useCanvasActions } from '../hooks/useCanvasActions';
import { TemplateSelector } from './TemplateSelector';
import { ImageUpload } from './ImageUpload';

export const EditorSidebar: React.FC = () => {
    const { addText } = useCanvasActions();

    return (
        <div className="w-80 bg-neutral-900 border-r border-neutral-800 flex flex-col h-full bg-opacity-95 backdrop-blur-sm z-10">
            <div className="p-5 border-b border-neutral-800">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Memtro</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-thin scrollbar-thumb-neutral-700">
                <section>
                    <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Add Content</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={addText}
                            className="flex flex-col items-center justify-center p-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-all border border-neutral-700 hover:border-blue-500/50 group hover:-translate-y-0.5"
                        >
                            <Type className="w-6 h-6 mb-2 text-neutral-400 group-hover:text-blue-400 object-contain" />
                            <span className="text-sm font-medium text-neutral-300 group-hover:text-white">Add Text</span>
                        </button>
                    </div>
                </section>

                <section>
                    <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Uploads</h3>
                    <ImageUpload />
                </section>

                <section>
                    <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Templates</h3>
                    <TemplateSelector />
                </section>
            </div>

            <div className="p-4 border-t border-neutral-800 bg-neutral-900/50">
                <div className="flex flex-col gap-2 text-xs text-neutral-500">
                    <a
                        href="https://github.com/riteshshukla"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                        <Github size={14} />
                        <span>@riteshshukla</span>
                    </a>
                    <a
                        href="https://github.com/riteshshukla/memtro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                    >
                        <div className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px]">P</div>
                        <span>Memtro Project</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
