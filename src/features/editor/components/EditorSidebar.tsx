import React from 'react';
import { Type, Github, Upload } from 'lucide-react';
import { useCanvasActions } from '../hooks/useCanvasActions';
import { useImageDrop } from '../hooks/useImageDrop';
import { TEMPLATES } from '../constants';

export const EditorSidebar: React.FC = () => {
    const { addText, addBackgroundFromUrl } = useCanvasActions();
    const { dropzoneBackground, dropzoneImage } = useImageDrop();

    return (
        <div className="basis-80 shrink bg-neutral-900 border-r border-neutral-800 flex flex-col h-full bg-opacity-95 backdrop-blur-sm z-10 overflow-hidden">
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
                        <div
                            {...dropzoneImage.getRootProps()}
                            className={`
                                border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                                ${dropzoneImage.isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-neutral-600 hover:border-neutral-500'}
                            `}
                        >
                            <input key="dropzoneImage" {...dropzoneImage.getInputProps()} />
                            <Upload className="mx-auto h-8 w-8 text-neutral-400 mb-2" />
                            <p className="text-sm text-neutral-400">
                                {dropzoneBackground.isDragActive ? 'Drop image here' : 'Upload or Drag Image'}
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Background</h3>
                    <div
                        {...dropzoneBackground.getRootProps()}
                        className={`
                            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                            ${dropzoneBackground.isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-neutral-600 hover:border-neutral-500'}
                        `}
                    >
                        <input key="dropzoneBackground" {...dropzoneBackground.getInputProps()} />
                        <Upload className="mx-auto h-8 w-8 text-neutral-400 mb-2" />
                        <p className="text-sm text-neutral-400">
                            {dropzoneBackground.isDragActive ? 'Drop Background here' : 'Upload or Drag Background'}
                        </p>
                    </div>
                </section>

                <section>
                    <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Templates</h3>
                    <div className="grid grid-cols-2 gap-2">
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
                </section>
            </div>

            <div className="p-4 border-t border-neutral-800 bg-neutral-900/50">
                <div className="flex flex-col gap-2 text-xs text-neutral-500">
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
        </div>
    );
}
