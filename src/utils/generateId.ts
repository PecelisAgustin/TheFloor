// src/utils/generateId.ts
//
// crypto.randomUUID() solo funciona en "contextos seguros" (HTTPS o localhost).
// Al probar desde el celu por IP local (http://192.168.x.x), el navegador
// no expone esa función. Esta utilidad usa randomUUID cuando está disponible,
// y cae a un generador manual cuando no (http en red local, navegadores viejos, etc).

export function generateId(): string {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }

    return (
        Date.now().toString(36) +
        "-" +
        Math.random().toString(36).slice(2, 10) +
        Math.random().toString(36).slice(2, 10)
    );
}
