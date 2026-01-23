import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from 'fabric';
import { useEditor } from '../context/EditorContext';
import { useClipboardPaste } from '../hooks/useClipboardPaste';

const DEFAULT_CANVAS_SIZE = 600;

export const MemeCanvas: React.FC = () => {
    const canvasEl = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { canvas, setCanvas, setActiveObject } = useEditor();
    const [scale, setScale] = useState(1);
    const [canvasSize, setCanvasSize] = useState({ width: DEFAULT_CANVAS_SIZE, height: DEFAULT_CANVAS_SIZE });

    // Enable clipboard paste functionality (desktop only, inside canvas)
    useClipboardPaste(containerRef);

    // Mobile only: scale canvas to fit width
    useEffect(() => {
        const updateScale = () => {
            const isMobile = window.innerWidth < 1024;
            if (isMobile) {
                const availableWidth = window.innerWidth - 32;
                setScale(Math.min(1, availableWidth / canvasSize.width));
            } else {
                setScale(1); // No scaling on desktop
            }
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, [canvasSize]);

    // Watch for canvas dimension changes (for mobile scaling)
    useEffect(() => {
        if (!canvas) return;

        const checkDimensions = () => {
            const width = canvas.getWidth();
            const height = canvas.getHeight();
            setCanvasSize(prev => {
                if (prev.width !== width || prev.height !== height) {
                    return { width, height };
                }
                return prev;
            });
        };

        canvas.on('after:render', checkDimensions);
        
        return () => {
            canvas.off('after:render', checkDimensions);
        };
    }, [canvas]);

    useEffect(() => {
        if (!canvasEl.current) return;

        const canvasInstance = new Canvas(canvasEl.current, {
            width: DEFAULT_CANVAS_SIZE,
            height: DEFAULT_CANVAS_SIZE,
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

    const isMobile = window.innerWidth < 1024;

    return (
        <div 
            ref={containerRef} 
            className="flex justify-center items-center bg-gray-100 p-4 w-full lg:h-full lg:overflow-auto focus:outline-none"
            style={{ minHeight: isMobile ? canvasSize.height * scale + 32 : undefined }}
        >
            <div 
                className="shadow-xl bg-white"
                style={{ 
                    transform: isMobile ? `scale(${scale})` : undefined,
                    transformOrigin: 'top center',
                    width: canvasSize.width,
                    height: canvasSize.height,
                }}
            >
                <canvas ref={canvasEl} />
            </div>
        </div>
    );
};
