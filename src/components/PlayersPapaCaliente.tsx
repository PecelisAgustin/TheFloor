import { useState } from "react";
import { useGameStore } from "../store/gameStore";
import { useNavigate } from "react-router-dom";
import type { Player } from "../types/player";

export function PlayersPapaCaliente() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

    const players = useGameStore((s) => s.players);
    const totalPlayers = useGameStore((s) => s.totalPlayers);

    const addPlayer = useGameStore((s) => s.addPlayer);
    const removePlayer = useGameStore((s) => s.removePlayer);

    const handleAdd = () => {
        const trimmedName = name.trim();

        if (!trimmedName) return;

        if (players.length >= totalPlayers) return;

        addPlayer(trimmedName);
        setName("");
    };


    return (
        <main className="players-page">
            <div className="top-bar">
                <button
                    className="back-btn"
                    onClick={() => navigate("/menu-papa-caliente")}
                >
                    ← Volver
                </button>

                <div className="counter">
                    Jugadores {players.length} / {totalPlayers}
                </div>
            </div>

            <h1>Jugadores</h1>

            <div className="player-input">
                <input
                    type="text"
                    value={name}
                    placeholder="Nombre del jugador"
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleAdd();
                        }
                    }}
                />

                <button
                    onClick={handleAdd}
                    disabled={
                        players.length >= totalPlayers
                    }
                >
                    Agregar
                </button>
            </div>

            <div className="player-list">
                {players.map((player, index) => (
                    <div
                        key={player.id}
                        className="player-card"
                        onClick={() =>
                            setSelectedPlayer(
                                selectedPlayer?.id === player.id
                                    ? null
                                    : player
                            )
                        }
                    >
                        <div
                            className="player-info"
                        >
                            <div className="player-name-start">
                                {index + 1}. {player.name}
                            </div>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removePlayer(player.id);
                            }}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <div className="players-section-buttons">
                {players.length === totalPlayers && (
                    <button
                        onClick={() => {
                            navigate("/lobby?mode=papa-caliente")
                        }}
                        className="continue-btn"

                    >
                        Continuar
                    </button>
                )}
            </div>
        </main >
    );
}