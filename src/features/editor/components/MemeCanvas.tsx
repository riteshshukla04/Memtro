import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from 'fabric';
import { useEditor } from '../context/EditorContext';

const DEFAULT_CANVAS_SIZE = 600;

export const MemeCanvas: React.FC = () => {
    const canvasEl = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { canvas, setCanvas, setActiveObject } = useEditor();
    const [scale, setScale] = useState(1);
    const [canvasSize, setCanvasSize] = useState({ width: DEFAULT_CANVAS_SIZE, height: DEFAULT_CANVAS_SIZE });

    // Calculate scale based on container size and actual canvas dimensions
    useEffect(() => {
        const updateScale = () => {
            if (!containerRef.current) return;
            const containerWidth = containerRef.current.clientWidth;
            const containerHeight = containerRef.current.clientHeight;
            const padding = 32;
            const availableWidth = containerWidth - padding;
            const availableHeight = containerHeight - padding;
            
            // Scale based on both width and height to fit
            const scaleX = availableWidth / canvasSize.width;
            const scaleY = availableHeight / canvasSize.height;
            const newScale = Math.min(1, scaleX, scaleY);
            setScale(newScale);
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, [canvasSize]);

    // Watch for canvas dimension changes
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

        // Check on render events (after background is set)
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

    return (
        <div ref={containerRef} className="flex justify-center items-center bg-gray-100 p-4 h-full w-full overflow-hidden">
            <div 
                ref={wrapperRef}
                className="shadow-xl bg-white origin-center"
                style={{ 
                    transform: `scale(${scale})`,
                    width: canvasSize.width,
                    height: canvasSize.height,
                }}
            >
                <canvas ref={canvasEl} />
            </div>
        </div>
    );
};
