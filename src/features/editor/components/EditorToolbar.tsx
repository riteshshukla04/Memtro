import React from 'react';
import { Download, Trash2, Settings2, Bold, Italic, Underline, Strikethrough, RotateCw, Type, Palette } from 'lucide-react';
import { useCanvasActions } from '../hooks/useCanvasActions';
import { useObjectProperties } from '../hooks/useObjectProperties';
import { IText } from 'fabric';

export const EditorToolbar: React.FC = () => {
    const { download, deleteSelected, moveUp, moveDown } = useCanvasActions();
    const { isText, activeObject, toggleStyle, setFontFamily, rotate, setColor } = useObjectProperties();

    // Helper to check if style is active
    const isActive = (style: string) => {
        if (!activeObject || !isText) return false;
        const text = activeObject as IText;
        if (style === 'bold') return text.fontWeight === 'bold';
        if (style === 'italic') return text.fontStyle === 'italic';
        if (style === 'underline') return text.underline;
        if (style === 'linethrough') return text.linethrough;
        return false;
    }

    const FONTS = ['Impact', 'Arial', 'Times New Roman', 'Verdana', 'Courier New', 'Comic Sans MS'];

    return (
        <div className="basis-72 shrink bg-neutral-900 border-l border-neutral-800 flex flex-col h-full z-10 shadow-xl overflow-hidden">
            <div className="p-5 border-b border-neutral-800 flex justify-between items-center bg-neutral-900">
                <div className="flex items-center gap-2">
                    <Settings2 size={18} className="text-neutral-400" />
                    <h3 className="font-semibold text-lg">Properties</h3>
                </div>
                {!!activeObject && (
                    <button
                        onClick={deleteSelected}
                        className="text-neutral-500 hover:text-red-400 p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                        title="Delete Selected"
                    >
                        <Trash2 size={18} />
                    </button>
                )}
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {!activeObject ? (
                    <div className="flex flex-col items-center justify-center h-48 text-center text-neutral-500 space-y-2 border-2 border-dashed border-neutral-800 rounded-xl bg-neutral-800/20">
                        <span className="text-4xl">👆</span>
                        <p className="text-sm px-4">Select an item on the canvas to edit its properties</p>
                    </div>
                ) : (
                    <>
                        {isText && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div>
                                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Typography</label>
                                    <div className="grid grid-cols-4 gap-1 bg-neutral-800 p-1 rounded-lg border border-neutral-700">
                                        <button
                                            onClick={() => toggleStyle('fontWeight')}
                                            className={`p-2 rounded hover:bg-neutral-700 flex justify-center ${isActive('bold') ? 'bg-neutral-600 text-white' : 'text-neutral-400'}`}
                                            title="Bold"
                                        >
                                            <Bold size={18} />
                                        </button>
                                        <button
                                            onClick={() => toggleStyle('fontStyle')}
                                            className={`p-2 rounded hover:bg-neutral-700 flex justify-center ${isActive('italic') ? 'bg-neutral-600 text-white' : 'text-neutral-400'}`}
                                            title="Italic"
                                        >
                                            <Italic size={18} />
                                        </button>
                                        <button
                                            onClick={() => toggleStyle('underline')}
                                            className={`p-2 rounded hover:bg-neutral-700 flex justify-center ${isActive('underline') ? 'bg-neutral-600 text-white' : 'text-neutral-400'}`}
                                            title="Underline"
                                        >
                                            <Underline size={18} />
                                        </button>
                                        <button
                                            onClick={() => toggleStyle('linethrough')}
                                            className={`p-2 rounded hover:bg-neutral-700 flex justify-center ${isActive('linethrough') ? 'bg-neutral-600 text-white' : 'text-neutral-400'}`}
                                            title="Strikethrough"
                                        >
                                            <Strikethrough size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Font Family</label>
                                    <div className="relative">
                                        <select
                                            className="w-full bg-neutral-800 border border-neutral-700 text-white text-sm rounded-lg block p-2.5 appearance-none focus:ring-blue-500 focus:border-blue-500"
                                            onChange={(e) => setFontFamily(e.target.value)}
                                            value={(activeObject as IText).fontFamily}
                                        >
                                            {FONTS.map(font => (
                                                <option key={font} value={font}>{font}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-neutral-400">
                                            <Type size={14} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Color</label>
                                    <div className="flex items-center gap-2 bg-neutral-800 p-2 rounded-lg border border-neutral-700">
                                        <Palette size={18} className="text-neutral-400" />
                                        <input
                                            type="color"
                                            className="w-full h-6 bg-transparent cursor-pointer"
                                            value={(activeObject as IText).fill as string}
                                            onChange={(e) => setColor(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 delay-75">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Arrangement</label>

                            <div className="grid grid-cols-2 gap-2 mb-4">
                                <button onClick={moveUp} className="bg-neutral-800 hover:bg-neutral-700 text-white p-2.5 rounded-lg text-xs font-medium transition-colors border border-neutral-700 flex justify-center items-center gap-2">
                                    Bring Forward
                                </button>
                                <button onClick={moveDown} className="bg-neutral-800 hover:bg-neutral-700 text-white p-2.5 rounded-lg text-xs font-medium transition-colors border border-neutral-700 flex justify-center items-center gap-2">
                                    Send Backward
                                </button>
                            </div>

                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Transform</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button onClick={() => rotate(-90)} className="bg-neutral-800 hover:bg-neutral-700 text-white p-2.5 rounded-lg text-sm transition-colors border border-neutral-700 flex justify-center">
                                    <RotateCw size={18} className="-scale-x-100" />
                                </button>
                                <button onClick={() => rotate(90)} className="bg-neutral-800 hover:bg-neutral-700 text-white p-2.5 rounded-lg text-sm transition-colors border border-neutral-700 flex justify-center">
                                    <RotateCw size={18} />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="p-5 border-t border-neutral-800 bg-neutral-900">
                <button
                    onClick={download}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3.5 px-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95"
                >
                    <Download size={20} />
                    Export Meme
                </button>
            </div>
        </div>
    )
}
