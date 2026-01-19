import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useCanvasActions } from './useCanvasActions';
import { useEditor } from '../context/EditorContext';

export const useImageDrop = () => {
    const { addImageFromUrl, addBackgroundFromUrl } = useCanvasActions();
    const { canvas } = useEditor();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                // If canvas has no background image, assume this is the main template background
                if (canvas && !canvas.backgroundImage) {
                    addBackgroundFromUrl(result);
                } else {
                    addImageFromUrl(result);
                }
            };
            reader.readAsDataURL(file);
        });
    }, [addImageFromUrl, addBackgroundFromUrl, canvas]);

    const dropzone = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: false });

    return dropzone;
};

