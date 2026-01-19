import React, { useCallback } from 'react';
import { Type, Github, Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useCanvasActions } from '../hooks/useCanvasActions';
import { useEditor } from '../context/EditorContext';

const TEMPLATES = [
    'https://i.imgflip.com/1g8my4.jpg',
    'https://i.imgflip.com/261o3j.jpg',
    'https://i.imgflip.com/30b1gx.jpg',
    'https://i.imgflip.com/9ehk.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzB4z2H5zFreMb11uwjLKyyWH4Vs5UKQYpOw&s',
];

export const MobileSidebar: React.FC = () => {
    const { addText, addBackgroundFromUrl, addImageFromUrl } = useCanvasActions();
    const { canvas } = useEditor();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                if (canvas && !canvas.backgroundImage) {
                    addBackgroundFromUrl(result);
                } else {
                    addImageFromUrl(result);
                }
            };
            reader.readAsDataURL(file);
        });
    }, [addImageFromUrl, addBackgroundFromUrl, canvas]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: false });

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
                    <div {...getRootProps()} className="flex-1 flex flex-col items-center justify-center gap-1 py-4 border-2 border-dashed border-neutral-600 hover:border-neutral-500 rounded-xl transition-colors cursor-pointer group">
                        <input {...getInputProps()} />
                        <Upload className="w-5 h-5 text-neutral-400 group-hover:text-blue-400" />
                        <span className="text-xs font-medium text-neutral-400 group-hover:text-white">Upload</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
