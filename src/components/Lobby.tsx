// src/pages/Lobby.tsx

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

import { duelChannel } from "../utils/duelchannel";
import { generateRoomCode } from "../utils/roomCode";
import { useGameStore } from "../store/gameStore";

function getBaseUrl() {
    return window.location.origin;
}

export function Lobby() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // "game" = tablero (the-floor) | "papa-caliente" = hot potato
    const mode = searchParams.get("mode") ?? "game";

    const [roomCode] = useState(() => generateRoomCode());
    const [refereeConnected, setRefereeConnected] = useState(false);

    const setRoomCode = useGameStore((s) => s.setRoomCode);
    const initializeTiles = useGameStore((s) => s.initializeTiles);
    const setCurrentCategory = useGameStore((s) => s.setCurrentCategory);

    const joinUrl = `${getBaseUrl()}/referee?room=${roomCode}`;

    useEffect(() => {
        duelChannel.connect(roomCode);
        setRoomCode(roomCode);

        const unsubscribe = duelChannel.onPresenceChange((count) => {
            setRefereeConnected(count > 0);
        });

        return () => {
            unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomCode]);

    function handleStart() {
        if (mode === "papa-caliente") {
            initializeTiles();
            setCurrentCategory();
            navigate("/papa-caliente");
        } else {
            initializeTiles();
            navigate("/game");
        }
    }

    function handleBack() {
        duelChannel.disconnect();

        if (mode === "papa-caliente") {
            navigate("/players-papa-caliente");
        } else {
            navigate("/players");
        }
    }

    return (
        <main className="lobby-page">
            <div className="lobby-floor" aria-hidden="true" />

            <button
                className="back-btn lobby-back-btn"
                onClick={handleBack}
            >
                ← Volver
            </button>

            <div className="lobby-card">
                <h1 className="lobby-title">Escaneá para conectar el árbitro</h1>

                <div className={`qr-box ${refereeConnected ? "is-connected" : "is-waiting"}`}>
                    <QRCodeSVG value={joinUrl} size={220} />
                </div>

                <p className="room-code">
                    Código: <strong>{roomCode}</strong>
                </p>

                <p className={`referee-status ${refereeConnected ? "is-connected" : "is-waiting"}`}>
                    <span className="status-dot" />
                    {refereeConnected
                        ? "Árbitro conectado"
                        : "Esperando al árbitro..."}
                </p>

                <button
                    className="start-btn"
                    onClick={handleStart}
                    disabled={!refereeConnected}
                >
                    Empezar
                </button>
            </div>
        </main>
    );
}
