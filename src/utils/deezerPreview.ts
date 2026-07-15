// src/utils/deezerPreview.ts
//
// Pide un preview FRESCO a Deezer usando JSONP (carga un <script>, no un fetch),
// así evitamos el bloqueo de CORS sin necesitar backend propio.
//
// Uso:
//   const url = await fetchDeezerPreview(3135556);
//   audioRef.current.src = url;
//   audioRef.current.play();

let jsonpCounter = 0;

export function fetchDeezerPreview(trackId: number): Promise<string> {
    return new Promise((resolve, reject) => {

        const callbackName = `__deezerCb_${jsonpCounter++}_${Date.now()}`;

        const script = document.createElement("script");

        const cleanup = () => {
            delete (window as unknown as Record<string, unknown>)[callbackName];
            script.remove();
        };

        const timeout = setTimeout(() => {
            cleanup();
            reject(new Error("Timeout pidiendo el preview a Deezer"));
        }, 8000);

        (window as unknown as Record<string, (data: { preview?: string; error?: unknown }) => void>)[callbackName] =
            (data) => {
                clearTimeout(timeout);
                cleanup();

                if (data?.preview) {
                    resolve(data.preview);
                } else {
                    reject(new Error(`Deezer no devolvió preview para el track ${trackId}`));
                }
            };

        script.onerror = () => {
            clearTimeout(timeout);
            cleanup();
            reject(new Error("Error de red al pedir el preview a Deezer"));
        };

        script.src = `https://api.deezer.com/track/${trackId}?output=jsonp&callback=${callbackName}`;

        document.body.appendChild(script);
    });
}
