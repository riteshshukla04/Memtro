import React from 'react';
import { Type, Github, Upload } from 'lucide-react';
import { useCanvasActions } from '../hooks/useCanvasActions';
import { useImageDrop } from '../hooks/useImageDrop';
import { TEMPLATES } from '../constants';

export const MobileSidebar: React.FC = () => {
    const { addText, addBackgroundFromUrl } = useCanvasActions();
    const { getRootProps, getInputProps, isDragActive } = useImageDrop();

    return (
        <div className="w-full py-3 px-4 bg-neutral-900 border-b border-neutral-800">
            <div className="flex flex-col gap-3 max-w-[600px] mx-auto">
                {/* Logo + GitHub row */}
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Memtro
                    </h1>
                    <div className="flex flex-col gap-1 text-xs text-neutral-500">
                        <a
                            href="https://github.com/riteshshukla04"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-white transition-colors"
                        >
                            <Github size={14} />
                            <span>@riteshshukla04</span>
                        </a>
                        <a
                            href="https://github.com/riteshshukla04/memtro"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                        >
                            <div className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px]">P</div>
                            <span>Memtro Project</span>
                        </a>
                    </div>
                </div>

                {/* Templates horizontal scroll */}
                <div>
                    <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Templates</h3>
                    <div className="overflow-x-auto scrollbar-none">
                        <div className="flex gap-2 w-fit mx-auto">
                            {TEMPLATES.map((url, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => addBackgroundFromUrl(url)}
                                    className="flex-shrink-0 w-[25vw] md:w-[14vw] aspect-square border border-neutral-700 rounded-lg overflow-hidden hover:ring-2 ring-blue-500 transition-all"
                                >
                                    <img src={url} alt={`Template ${idx}`} loading="lazy" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Add Text + Upload row */}
                <div className="flex gap-3">
                    <button
                        onClick={addText}
                        className="flex-1 flex flex-col items-center justify-center gap-1 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-all border border-neutral-700 hover:border-blue-500/50 group hover:-translate-y-0.5"
                    >
                        <Type className="w-5 h-5 text-neutral-400 group-hover:text-blue-400" />
                        <span className="text-xs font-medium text-neutral-300 group-hover:text-white">Add Text</span>
                    </button>
                    <div {...getRootProps()} className={`flex-1 flex flex-col items-center justify-center gap-1 py-4 border-2 border-dashed rounded-xl transition-colors cursor-pointer group ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-neutral-600 hover:border-neutral-500'}`}>
                        <input {...getInputProps()} />
                        <Upload className="w-5 h-5 text-neutral-400 group-hover:text-blue-400" />
                        <span className="text-xs font-medium text-neutral-400 group-hover:text-white">Upload</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
