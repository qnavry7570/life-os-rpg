import { useState, useEffect } from 'react';

export function useImagePreload(src: string) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!src) {
            setIsLoaded(false);
            return;
        }

        const img = new Image();
        img.src = src;

        img.onload = () => {
            setIsLoaded(true);
        };

        img.onerror = (err) => {
            console.error('Failed to load image:', src, err);
            setError(new Error(`Failed to load image: ${src}`));
            setIsLoaded(true); // Default to loaded to stop skeleton on error
        };

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src]);

    return { isLoaded, error };
}
