import React from 'react';
import { Download, Settings2 } from 'lucide-react';
import { useCanvasActions } from '../hooks/useCanvasActions';
import { useObjectProperties } from '../hooks/useObjectProperties';

export const MobileToolbar: React.FC = () => {
    const { download } = useCanvasActions();
    const { activeObject } = useObjectProperties();

    return (
        <div className="w-full bg-neutral-900 border-t border-neutral-800 p-4 pb-8">
            <div className="flex flex-col gap-3 max-w-[600px] mx-auto">
                {/* Header */}
                <div className="flex items-center gap-2">
                    <Settings2 size={16} className="text-neutral-400" />
                    <h3 className="font-semibold text-sm">Properties</h3>
                </div>

                {/* Nothing selected state */}
                {!activeObject && (
                    <div className="flex flex-col items-center justify-center py-6 text-center text-neutral-500 space-y-2 border-2 border-dashed border-neutral-800 rounded-xl bg-neutral-800/20">
                        <span className="text-3xl">👆</span>
                        <p className="text-xs px-4">Select an item on the canvas to edit its properties</p>
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
