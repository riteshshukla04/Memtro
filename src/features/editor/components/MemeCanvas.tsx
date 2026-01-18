import React, { useEffect, useRef } from 'react';
import { Canvas } from 'fabric';
import { useEditor } from '../context/EditorContext';

export const MemeCanvas: React.FC = () => {
    const canvasEl = useRef<HTMLCanvasElement>(null);
    const { setCanvas, setActiveObject } = useEditor();

    useEffect(() => {
        if (!canvasEl.current) return;

        const canvasInstance = new Canvas(canvasEl.current, {
            width: 600,
            height: 600,
            backgroundColor: '#ffffff',
        });

        setCanvas(canvasInstance);

        const updateSelection = () => {
            const active = canvasInstance.getActiveObject();
            setActiveObject(active || null);
        }

        canvasInstance.on('selection:created', updateSelection);
        canvasInstance.on('selection:updated', updateSelection);
        canvasInstance.on('selection:cleared', () => setActiveObject(null));

        return () => {
            canvasInstance.dispose();
        };
    }, [setCanvas, setActiveObject]);

    return (
        <div className="flex justify-center items-center bg-gray-100 p-8 h-full w-full overflow-auto">
            <div className="shadow-xl bg-white">
                <canvas ref={canvasEl} />
            </div>
        </div>
    );
};
