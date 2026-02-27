import { useState, useCallback, createContext, useContext } from 'react';

export const FloatingXPContext = createContext<(amount: number, x?: number, y?: number, color?: string) => void>(() => { });

export const useTriggerXP = () => useContext(FloatingXPContext);

interface FloatingItem { id: number; amount: number; x: number; y: number; color?: string; }

let nextId = 0;
export function useFloatingXP() {
    const [items, setItems] = useState<FloatingItem[]>([]);

    const triggerXP = useCallback((amount: number, x?: number, y?: number, color?: string) => {
        const id = nextId++;
        const px = x ?? window.innerWidth / 2 - 30;
        const py = y ?? window.innerHeight / 2;
        setItems(prev => [...prev, { id, amount, x: px, y: py, color }]);
    }, []);

    const remove = useCallback((id: number) => {
        setItems(prev => prev.filter(i => i.id !== id));
    }, []);

    return { items, triggerXP, remove };
}
