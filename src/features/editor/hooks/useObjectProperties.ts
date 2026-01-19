import { IText } from 'fabric';
import { useEditor } from '../context/EditorContext';
import { useState } from 'react';

export const useObjectProperties = () => {
    const { canvas, activeObject } = useEditor();
    const [, setTick] = useState(0); // Force re-render for object mutations

    const isText = activeObject instanceof IText;

    const toggleStyle = (style: 'fontWeight' | 'fontStyle' | 'underline' | 'linethrough') => {
        if (!canvas || !activeObject || !isText) return;

        const textObj = activeObject as IText;

        if (style === 'fontWeight') {
            const current = textObj.fontWeight;
            textObj.set('fontWeight', current === 'bold' ? 'normal' : 'bold');
        } else if (style === 'fontStyle') {
            const current = textObj.fontStyle;
            textObj.set('fontStyle', current === 'italic' ? 'normal' : 'italic');
        } else if (style === 'underline') {
            textObj.set('underline', !textObj.underline);
        } else if (style === 'linethrough') {
            textObj.set('linethrough', !textObj.linethrough);
        }

        canvas.renderAll();
        setTick(t => t + 1);
    };

    const setFontFamily = (font: string) => {
        if (!canvas || !activeObject) return;
        activeObject.set('fontFamily', font);
        canvas.renderAll();
        setTick(t => t + 1);
    };

    const rotate = (angle: number) => {
        if (!canvas || !activeObject) return;
        const current = activeObject.angle || 0;
        activeObject.rotate(current + angle);
        canvas.renderAll();
        setTick(t => t + 1);
    }

    const setColor = (color: string) => {
        if (!canvas || !activeObject) return;
        activeObject.set('fill', color);
        canvas.renderAll();
        setTick(t => t + 1);
    };

    // Helper to check if text style is active
    const isStyleActive = (style: 'bold' | 'italic' | 'underline' | 'linethrough') => {
        if (!activeObject || !isText) return false;
        const text = activeObject as IText;
        if (style === 'bold') return text.fontWeight === 'bold';
        if (style === 'italic') return text.fontStyle === 'italic';
        if (style === 'underline') return text.underline;
        if (style === 'linethrough') return text.linethrough;
        return false;
    };

    // Get text content
    const getTextContent = (): string => {
        if (!activeObject || !(activeObject instanceof IText)) return '';
        return activeObject.text || '';
    };

    // Set text content
    const setTextContent = (text: string) => {
        if (!canvas || !activeObject || !(activeObject instanceof IText)) return;
        activeObject.set('text', text);
        canvas.renderAll();
        setTick(t => t + 1);
    };

    return {
        isText,
        activeObject,
        toggleStyle,
        setFontFamily,
        rotate,
        setColor,
        isStyleActive,
        getTextContent,
        setTextContent
    };
};
