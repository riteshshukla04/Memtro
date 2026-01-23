import { useEffect, useCallback } from 'react';
import type { RefObject } from 'react';
import { IText } from 'fabric';
import { useEditor } from '../context/EditorContext';
import { useCanvasActions } from './useCanvasActions';

export const useClipboardPaste = (containerRef: RefObject<HTMLDivElement | null>) => {
    const { canvas } = useEditor();
    const { addImageFromUrl } = useCanvasActions();

    // Clipboard paste handler - only for desktop (>1024px) and only inside canvas
    const handlePaste = useCallback(async (e: ClipboardEvent) => {
        // 1. Return early if not desktop
        if (window.innerWidth < 1024) return;
        if (!canvas) return;

        const container = containerRef.current;
        if (!container) return;

        // Check if the active element (focused element) is within the canvas container
        const activeElement = document.activeElement;
        if (!activeElement || !container.contains(activeElement)) return;

        // 2. Return early if editing text
        const activeObject = canvas.getActiveObject();
        if (activeObject instanceof IText) {
            return;
        }

        // 3. Only after these checks, handle the paste event
        const items = e.clipboardData?.items;
        if (!items) return;

        // Look for image in clipboard
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            
            if (item.type.indexOf('image') !== -1) {
                // Prevent default paste behavior
                e.preventDefault();

                const blob = item.getAsFile();
                if (!blob) continue;

                // Convert blob to data URL and add to canvas
                const reader = new FileReader();
                reader.onload = () => {
                    const dataURL = reader.result as string;
                    addImageFromUrl(dataURL);
                };
                reader.readAsDataURL(blob);
                break; // Only handle the first image found
            }
        }
    }, [canvas, addImageFromUrl, containerRef]);

    // Attach paste event listener
    useEffect(() => {
        if (!canvas) return;

        document.addEventListener('paste', handlePaste);
        return () => {
            document.removeEventListener('paste', handlePaste);
        };
    }, [canvas, handlePaste]);

    // Make canvas container focusable on desktop (only when not editing text)
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !canvas) return;

        const updateFocusability = () => {
            const isDesktop = window.innerWidth >= 1024;
            const activeObject = canvas.getActiveObject();
            const isEditingText = activeObject instanceof IText;

            if (isDesktop && !isEditingText) {
                container.setAttribute('tabindex', '0');
            } else {
                container.removeAttribute('tabindex');
            }
        };

        const handleClick = () => {
            if (window.innerWidth >= 1024) {
                const activeObject = canvas.getActiveObject();
                if (!(activeObject instanceof IText)) {
                    container.focus();
                }
            }
        };

        // Update when selection changes
        const handleSelectionChange = () => {
            updateFocusability();
        };

        // Initial setup
        updateFocusability();
        container.addEventListener('click', handleClick);
        window.addEventListener('resize', updateFocusability);
        canvas.on('selection:created', handleSelectionChange);
        canvas.on('selection:updated', handleSelectionChange);
        canvas.on('selection:cleared', handleSelectionChange);

        return () => {
            container.removeEventListener('click', handleClick);
            window.removeEventListener('resize', updateFocusability);
            canvas.off('selection:created', handleSelectionChange);
            canvas.off('selection:updated', handleSelectionChange);
            canvas.off('selection:cleared', handleSelectionChange);
        };
    }, [containerRef, canvas]);
};
