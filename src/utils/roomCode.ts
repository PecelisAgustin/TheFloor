// src/utils/roomCode.ts

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin O/0/I/1 para que no se confundan al leerlo

export function generateRoomCode(length = 4): string {
    let code = "";

    for (let i = 0; i < length; i++) {
        code += CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    return code;
}
