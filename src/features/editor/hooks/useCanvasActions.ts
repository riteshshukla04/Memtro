import { useEditor } from '../context/EditorContext';
import { IText, FabricImage } from 'fabric';

export const useCanvasActions = () => {
    const { canvas } = useEditor();
    const MAX_CANVAS_SIZE = 1000;


    const addText = () => {
        if (!canvas) return;
        const text = new IText('Tap to edit', {
            left: 100,
            top: 100,
            fill: '#ffffff',
            fontSize: 40,
            fontFamily: 'Impact', // Classic meme font
            stroke: '#000000',
            strokeWidth: 2,
            editable: true,
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        canvas.renderAll();
    };

    const addImageFromUrl = async (url: string) => {
        if (!canvas) return;
        try {
            const img = await FabricImage.fromURL(url, { crossOrigin: 'anonymous' });

            // Scale down if too big
            if (img.width && img.width > canvas.getWidth()) {
                img.scaleToWidth(canvas.getWidth() * 0.8);
            }

            canvas.add(img);
            canvas.centerObject(img);
            canvas.setActiveObject(img);
            canvas.renderAll();
        } catch (error) {
            console.error('Failed to load image:', error);
        }
    };

    const addBackgroundFromUrl = async (url: string) => {
        if (!canvas) return;
        try {
            const img = await FabricImage.fromURL(url, { crossOrigin: 'anonymous' });

            const { width = 600, height = 600 } = img;

            // Calculate max dimensions based on viewport
            const maxAllowedHeight = window.innerHeight * 0.8;
            const maxAllowedWidth = MAX_CANVAS_SIZE;

            let newWidth = width;
            let newHeight = height;

            // Calculate scale factor to fit within max dimensions while maintaining aspect ratio
            const scaleX = maxAllowedWidth / width;
            const scaleY = maxAllowedHeight / height;
            const scale = Math.min(scaleX, scaleY, 1); // Use 1 to prevent upscaling small images, or remove if upscaling is desired. 
            // Usually for "too big" issues, we only care about downscaling.

            newWidth = width * scale;
            newHeight = height * scale;

            canvas.setDimensions({
                width: newWidth,
                height: newHeight
            });

            // Scale image to match new canvas dimensions
            img.scaleToWidth(newWidth);
            img.scaleToHeight(newHeight);

            canvas.backgroundImage = img;
            canvas.centerObject(img);

            canvas.renderAll();
        } catch (e) {
            console.error(e);
        }
    };

    const download = () => {
        if (!canvas) return;
        const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1,
            multiplier: 2,
        });

        const link = document.createElement('a');
        link.download = 'meme-memtro.png';
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const deleteSelected = () => {
        if (!canvas) return;
        const activeInfo = canvas.getActiveObjects();
        if (activeInfo.length) {
            canvas.remove(...activeInfo);
            canvas.discardActiveObject();
            canvas.renderAll();
        }
    };

    const moveUp = () => {
        if (!canvas) return;
        const active = canvas.getActiveObject();
        if (active) {
            canvas.bringObjectForward(active);
            canvas.renderAll();
        }
    };

    const moveDown = () => {
        if (!canvas) return;
        const active = canvas.getActiveObject();
        if (active) {
            canvas.sendObjectBackwards(active);
            canvas.renderAll();
        }
    };

    return {
        addText,
        addImageFromUrl,
        addBackgroundFromUrl,
        download,
        deleteSelected,
        moveUp,
        moveDown
    };
};
