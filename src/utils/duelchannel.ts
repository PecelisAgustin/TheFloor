// src/utils/duelchannel.ts
//
// Reemplaza BroadcastChannel (solo mismo navegador/dispositivo) por
// Supabase Realtime Broadcast (cruza dispositivos por internet).
// Mantiene la MISMA interfaz que usaban Duel.tsx y DuelPapaCaliente.tsx,
// así esos componentes no necesitan cambios. Suma presencia para saber
// cuántos dispositivos están conectados a la sala.

import { createClient, type RealtimeChannel } from "@supabase/supabase-js";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

type DuelMessage = { type: string; [key: string]: unknown };
type Handler = (event: { data: DuelMessage }) => void;
type PresenceHandler = (count: number) => void;

class DuelChannel {
    private channel: RealtimeChannel | null = null;
    private roomCode: string | null = null;
    private handlers = new Set<Handler>();
    private presenceHandlers = new Set<PresenceHandler>();
    private connected = false;
    private myId = Math.random().toString(36).slice(2);

    connect(roomCode: string) {
        if (this.roomCode === roomCode && this.connected) return;

        this.disconnect();
        this.roomCode = roomCode;

        this.channel = supabase.channel(`duel-${roomCode}`, {
            config: {
                broadcast: { self: false },
                presence: { key: this.myId },
            },
        });

        this.channel.on("broadcast", { event: "duel" }, ({ payload }) => {
            this.handlers.forEach((h) => h({ data: payload as DuelMessage }));
        });

        this.channel.on("presence", { event: "sync" }, () => {
            const state = this.channel?.presenceState() ?? {};
            // Restamos 1 (nuestra propia presencia) para saber cuántos OTROS hay
            const otherCount = Math.max(Object.keys(state).length - 1, 0);
            this.presenceHandlers.forEach((h) => h(otherCount));
        });

        this.channel.subscribe(async (status) => {
            this.connected = status === "SUBSCRIBED";

            if (this.connected) {
                await this.channel?.track({ joinedAt: Date.now() });
            }
        });
    }

    disconnect() {
        if (this.channel) {
            supabase.removeChannel(this.channel);
        }
        this.channel = null;
        this.connected = false;
    }

    postMessage(data: DuelMessage) {
        if (!this.channel) {
            console.warn("duelChannel: todavía no conectado a ninguna sala");
            return;
        }

        this.channel.send({
            type: "broadcast",
            event: "duel",
            payload: data,
        });
    }

    addEventListener(_type: "message", handler: Handler) {
        this.handlers.add(handler);
    }

    removeEventListener(_type: "message", handler: Handler) {
        this.handlers.delete(handler);
    }

    // Devuelve una función para desuscribirse
    onPresenceChange(handler: PresenceHandler): () => void {
        this.presenceHandlers.add(handler);

        return () => {
            this.presenceHandlers.delete(handler);
        };
    }
}

export const duelChannel = new DuelChannel();
