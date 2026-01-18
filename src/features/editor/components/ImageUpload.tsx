import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useCanvasActions } from '../hooks/useCanvasActions';
import { useEditor } from '../context/EditorContext';

export const ImageUpload: React.FC = () => {
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

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, multiple: false });

    return (
        <div
            {...getRootProps()}
            className={`
                border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-neutral-600 hover:border-neutral-500'}
            `}
        >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-8 w-8 text-neutral-400 mb-2" />
            <p className="text-sm text-neutral-400">
                {isDragActive ? 'Drop image here' : 'Upload or Drag Image'}
            </p>
        </div>
    );
};
