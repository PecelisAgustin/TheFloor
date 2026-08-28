// src/realtime/playersChannel.ts
import { createClient, type RealtimeChannel } from "@supabase/supabase-js";

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

type JoinPayload = { name: string };
type Handler = (payload: JoinPayload) => void;

class PlayersChannel {
    private channel: RealtimeChannel | null = null;
    private roomCode: string | null = null;
    private handlers = new Set<Handler>();

    connect(roomCode: string) {
        if (this.roomCode === roomCode && this.channel) return;

        this.disconnect();
        this.roomCode = roomCode;

        this.channel = supabase.channel(`players-${roomCode}`, {
            config: { broadcast: { self: false } },
        });

        this.channel.on("broadcast", { event: "join" }, ({ payload }) => {
            this.handlers.forEach((h) => h(payload as JoinPayload));
        });

        this.channel.subscribe();
    }

    disconnect() {
        if (this.channel) supabase.removeChannel(this.channel);
        this.channel = null;
        this.roomCode = null;
    }

    sendJoin(name: string) {
        if (!this.channel) return;
        this.channel.send({ type: "broadcast", event: "join", payload: { name } });
    }

    onJoin(handler: Handler): () => void {
        this.handlers.add(handler);
        return () => this.handlers.delete(handler);
    }
}

export const playersChannel = new PlayersChannel();