import { useEffect, useRef, useState } from "react";

export function useFitText(
    text: string,
    options?: { min?: number; max?: number; step?: number }
) {
    const { min = 16, max = 112, step = 2 } = options ?? {};

    const ref = useRef<HTMLDivElement>(null);
    const [fontSize, setFontSize] = useState(max);

    useEffect(() => {
        const el = ref.current;

        if (!el) return;

        let size = max;
        el.style.fontSize = `${size}px`;

        // Baja el tamaño hasta que el contenido entre en ambos ejes
        while (
            size > min &&
            (el.scrollWidth > el.clientWidth ||
                el.scrollHeight > el.clientHeight)
        ) {
            size -= step;
            el.style.fontSize = `${size}px`;
        }

        setFontSize(size);

    }, [text, min, max, step]);

    return { ref, fontSize };
}
