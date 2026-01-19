import React from 'react';
import { Download, Settings2, Trash2, Bold, Italic, Underline, Strikethrough, RotateCw } from 'lucide-react';
import { useCanvasActions } from '../hooks/useCanvasActions';
import { useObjectProperties } from '../hooks/useObjectProperties';
import { FONTS } from '../constants';
import { IText } from 'fabric';

export const MobileToolbar: React.FC = () => {
    const { download, deleteSelected, moveUp, moveDown } = useCanvasActions();
    const { isText, activeObject, toggleStyle, setFontFamily, rotate, setColor, isStyleActive, getTextContent, setTextContent } = useObjectProperties();

    return (
        <div className="w-full bg-neutral-900 border-t border-neutral-800 p-4 pb-8">
            <div className="flex flex-col gap-3 max-w-[600px] mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Settings2 size={16} className="text-neutral-400" />
                        <h3 className="font-semibold text-sm">Properties</h3>
                    </div>
                    {!!activeObject && (
                        <button
                            onClick={deleteSelected}
                            className="text-neutral-500 hover:text-red-400 p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                            title="Delete Selected"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>

                {/* Nothing selected state */}
                {!activeObject && (
                    <div className="flex flex-col items-center justify-center py-6 text-center text-neutral-500 space-y-2 border-2 border-dashed border-neutral-800 rounded-xl bg-neutral-800/20">
                        <span className="text-3xl">👆</span>
                        <p className="text-xs px-4">Select an item on the canvas to edit its properties</p>
                    </div>
                )}

                {/* Editing controls */}
                {activeObject && (
                    <div className="space-y-3">
                        {/* Text-only controls */}
                        {isText && (
                            <>
                                {/* Text content input */}
                                <input
                                    type="text"
                                    className="w-full bg-neutral-800 border border-neutral-700 text-white text-sm rounded-lg block p-2.5 focus:ring-blue-500 focus:border-blue-500"
                                    value={getTextContent()}
                                    onChange={(e) => setTextContent(e.target.value)}
                                    placeholder="Enter text..."
                                />

                                {/* Font Family + Color + Typography row */}
                                <div className="flex gap-2 items-center">
                                    {/* Font Family */}
                                    <div className="flex-1 relative">
                                        <select
                                            className="w-full bg-neutral-800 border border-neutral-700 text-white text-sm rounded-lg block p-2.5 appearance-none focus:ring-blue-500 focus:border-blue-500"
                                            onChange={(e) => setFontFamily(e.target.value)}
                                            value={(activeObject as IText).fontFamily}
                                        >
                                            {FONTS.map(font => (
                                                <option key={font} value={font}>{font}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Color */}
                                    <div className="flex items-center justify-center bg-neutral-800 p-1 rounded-lg border border-neutral-700 w-[42px] h-[42px]">
                                        <input
                                            type="color"
                                            className="w-full h-full bg-transparent cursor-pointer rounded"
                                            value={(activeObject as IText).fill as string}
                                            onChange={(e) => setColor(e.target.value)}
                                        />
                                    </div>

                                    {/* Typography */}
                                    <div className="flex gap-1 bg-neutral-800 p-1 rounded-lg border border-neutral-700">
                                        <button
                                            onClick={() => toggleStyle('fontWeight')}
                                            className={`p-2 rounded hover:bg-neutral-700 flex justify-center ${isStyleActive('bold') ? 'bg-neutral-600 text-white' : 'text-neutral-400'}`}
                                            title="Bold"
                                        >
                                            <Bold size={18} />
                                        </button>
                                        <button
                                            onClick={() => toggleStyle('fontStyle')}
                                            className={`p-2 rounded hover:bg-neutral-700 flex justify-center ${isStyleActive('italic') ? 'bg-neutral-600 text-white' : 'text-neutral-400'}`}
                                            title="Italic"
                                        >
                                            <Italic size={18} />
                                        </button>
                                        <button
                                            onClick={() => toggleStyle('underline')}
                                            className={`p-2 rounded hover:bg-neutral-700 flex justify-center ${isStyleActive('underline') ? 'bg-neutral-600 text-white' : 'text-neutral-400'}`}
                                            title="Underline"
                                        >
                                            <Underline size={18} />
                                        </button>
                                        <button
                                            onClick={() => toggleStyle('linethrough')}
                                            className={`p-2 rounded hover:bg-neutral-700 flex justify-center ${isStyleActive('linethrough') ? 'bg-neutral-600 text-white' : 'text-neutral-400'}`}
                                            title="Strikethrough"
                                        >
                                            <Strikethrough size={18} />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Arrangement */}
                        <div>
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Arrangement</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button onClick={moveUp} className="bg-neutral-800 hover:bg-neutral-700 text-white p-2.5 rounded-lg text-xs font-medium transition-colors border border-neutral-700 flex justify-center items-center gap-2">
                                    Bring Forward
                                </button>
                                <button onClick={moveDown} className="bg-neutral-800 hover:bg-neutral-700 text-white p-2.5 rounded-lg text-xs font-medium transition-colors border border-neutral-700 flex justify-center items-center gap-2">
                                    Send Backward
                                </button>
                            </div>
                        </div>

                        {/* Transform */}
                        <div>
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
                    </div>
                )}

                {/* Export button */}
                <button
                    onClick={download}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3 px-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95"
                >
                    <Download size={18} />
                    Export Meme
                </button>
            </div>
        </div>
    );
}
