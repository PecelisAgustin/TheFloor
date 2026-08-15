import { useEffect, useRef, useState } from "react";

/**
 * Ajusta automáticamente el font-size de un elemento para que su
 * contenido siempre entre dentro del contenedor, sin necesidad de
 * scroll. Reduce el tamaño de a poco hasta que scrollWidth/scrollHeight
 * dejan de superar el tamaño visible del elemento.
 *
 * Uso:
 *   const { ref, fontSize } = useFitText(answerText, { max: 112, min: 16 });
 *   <div ref={ref} style={{ fontSize }}>{answerText}</div>
 *
 * IMPORTANTE: el elemento (o su padre) debe tener una altura fija
 * (no min-height) para que la medición tenga sentido.
 */
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
