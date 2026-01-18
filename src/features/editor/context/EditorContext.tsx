import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { Canvas, FabricObject } from 'fabric';

interface EditorContextType {
    canvas: Canvas | null;
    setCanvas: (canvas: Canvas | null) => void;
    activeObject: FabricObject | null;
    setActiveObject: (object: FabricObject | null) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [canvas, setCanvas] = useState<Canvas | null>(null);
    const [activeObject, setActiveObject] = useState<FabricObject | null>(null);

    return (
        <EditorContext.Provider value={{ canvas, setCanvas, activeObject, setActiveObject }}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditor = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useEditor must be used within an EditorProvider');
    }
    return context;
};
