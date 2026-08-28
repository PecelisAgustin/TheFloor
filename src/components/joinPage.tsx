// src/pages/JoinPlayer.tsx
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { playersChannel } from "../utils/playersChannel";

export function JoinPlayer() {
    const [searchParams] = useSearchParams();
    const room = searchParams.get("room") ?? "";

    const [name, setName] = useState("");
    const [sentNames, setSentNames] = useState<string[]>([]);
    const [duplicateWarning, setDuplicateWarning] = useState(false);
    const [done, setDone] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!room) return;
        playersChannel.connect(room);
        return () => playersChannel.disconnect();
    }, [room]);

    const handleAdd = () => {
        const trimmed = name.trim();
        if (!trimmed || !room) return;

        const alreadySent = sentNames.some(
            (n) => n.toLowerCase() === trimmed.toLowerCase()
        );

        if (alreadySent) {
            setDuplicateWarning(true);
            return;
        }

        playersChannel.sendJoin(trimmed);
        setSentNames((prev) => [...prev, trimmed]);
        setDuplicateWarning(false);
        setName("");
        inputRef.current?.focus();
    };

    if (!room) {
        return (
            <main className="join-page">
                <div className="join-card">
                    <p>Falta el código de sala. Escaneá el QR de nuevo.</p>
                </div>
            </main>
        );
    }

    if (done) {
        return (
            <main className="join-page">
                <div className="join-card">
                    <h1 className="join-title">¡Listo!</h1>
                    <p className="join-subtitle">
                        Mandaste {sentNames.length}{" "}
                        {sentNames.length === 1 ? "jugador" : "jugadores"}.
                        Fijate en la tele.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="join-page">
            <div className="join-card">
                <h1 className="join-title">Sala {room}</h1>
                <p className="join-subtitle">
                    Agregá los nombres de los jugadores de a uno
                </p>

                <div className="join-input-row">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Nombre del jugador"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setDuplicateWarning(false);
                        }}
                        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                        autoFocus
                    />
                    <button className="start-btn" onClick={handleAdd}>
                        Agregar
                    </button>
                </div>

                {duplicateWarning && (
                    <p className="menu-warning">
                        Ya mandaste ese nombre.
                    </p>
                )}

                {sentNames.length > 0 && (
                    <ul className="join-sent-list">
                        {sentNames.map((n, i) => (
                            <li key={`${n}-${i}`} className="join-sent-item">
                                <span>{i + 1}. {n}</span>
                                <span className="join-sent-check">✓</span>
                            </li>
                        ))}
                    </ul>
                )}

                <button
                    className="secondary-btn join-done-btn"
                    disabled={sentNames.length === 0}
                    onClick={() => setDone(true)}
                >
                    Terminar
                </button>
            </div>
        </main>
    );
}