import React from 'react';
import { Download, Trash2, Settings2, Bold, Italic, Underline, Strikethrough, RotateCw, Type, Palette } from 'lucide-react';
import { useCanvasActions } from '../hooks/useCanvasActions';
import { useObjectProperties } from '../hooks/useObjectProperties';
import { IText } from 'fabric';

const FONTS = ['Impact', 'Arial', 'Times New Roman', 'Verdana', 'Courier New', 'Comic Sans MS'];

export const MobileToolbar: React.FC = () => {
    const { download, deleteSelected, moveUp, moveDown } = useCanvasActions();
    const { isText, activeObject, toggleStyle, setFontFamily, rotate, setColor } = useObjectProperties();

    // Helper to check if style is active
    const isActive = (style: string) => {
        if (!activeObject || !isText) return false;
        const text = activeObject as IText;
        if (style === 'bold') return text.fontWeight === 'bold';
        if (style === 'italic') return text.fontStyle === 'italic';
        if (style === 'underline') return text.underline;
        if (style === 'linethrough') return text.linethrough;
        return false;
    }

    return (
        <></>
    )
}
