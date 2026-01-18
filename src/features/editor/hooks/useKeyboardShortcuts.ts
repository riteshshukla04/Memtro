import { useEffect } from 'react';
import { useEditor } from '../context/EditorContext';

export const useKeyboardShortcuts = () => {
    const { canvas } = useEditor();

    useEffect(() => {
        if (!canvas) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Delete' || e.key === 'Backspace') {
                // Prevent backspace from navigating back if not in an input
                // But be careful if user is editing text on canvas... Fabric handles text editing mode.
                // We should check if canvas has active object and it is not in editing mode.
                const active = canvas.getActiveObject();

                // @ts-ignore - isEditing is a property on IText usually, checking safely
                if (active && !active.isEditing) {
                    canvas.remove(active);
                    canvas.discardActiveObject();
                    canvas.renderAll();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [canvas]);
};
