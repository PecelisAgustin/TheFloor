import { useState } from "react";
import { useGameStore } from "../store/gameStore";
import { useNavigate } from "react-router-dom";
import type { Player } from "../types/player";
import { categoryQuestions } from "../DATA/categoriesAgrupment";

export function Players() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

    const players = useGameStore((s) => s.players);
    const totalPlayers = useGameStore((s) => s.totalPlayers);
    const setPlayerCategory = useGameStore(
        (s) => s.setPlayerCategory
    );

    const addPlayer = useGameStore((s) => s.addPlayer);
    const removePlayer = useGameStore((s) => s.removePlayer);

    const handleAdd = () => {
        const trimmedName = name.trim();

        if (!trimmedName) return;

        if (players.length >= totalPlayers) return;

        addPlayer(trimmedName);
        setName("");
    };

    const usedCategories = players
        .map((p) => p.category)
        .filter(Boolean);

    const availableCategories =
        categoryQuestions.filter(
            ([categoryName]) =>
                !usedCategories.includes(
                    categoryName
                )
        );

    const allPlayersHaveCategory =
        players.length === totalPlayers &&
        players.every(
            (player) => player.category
        );

    return (
        <main className="players-page">
            <div className="top-bar">
                <button
                    className="back-btn"
                    onClick={() => navigate("/menu-the-floor")}
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

                            {player.category && (
                                <div className="player-category">
                                    {player.category}
                                </div>
                            )}
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
                            navigate("/lobby?mode=game")
                        }}
                        className="continue-btn"
                        disabled={!allPlayersHaveCategory}

                    >
                        Continuar
                    </button>
                )}
                {players.length > 1 && (
                    <button onClick={() => {
                        const playersWithoutCategory = players.filter(p => !p.category);

                        if (playersWithoutCategory.length === 0) return;

                        const randomIndex = Math.floor(Math.random() * playersWithoutCategory.length);

                        setSelectedPlayer(playersWithoutCategory[randomIndex]);
                    }} disabled={allPlayersHaveCategory} className="choose-btn">
                        Elegir jugador random
                    </button>
                )}
            </div>

            {selectedPlayer && (
                <div
                    className="modal-overlay"
                    onClick={() =>
                        setSelectedPlayer(null)
                    }
                >
                    <div
                        className="modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >
                        <h2>
                            Categoría para{" "}
                            {selectedPlayer.name}
                        </h2>

                        <button
                            className="close-modal"
                            onClick={() =>
                                setSelectedPlayer(null)
                            }
                        >
                            ✕
                        </button>

                        <button disabled={!selectedPlayer.category} className="delete-category" onClick={() => {
                            setPlayerCategory(selectedPlayer.id, undefined)
                            setSelectedPlayer(null)
                        }}>
                            Eliminar categoria
                        </button>

                        <div className="category-grid">
                            {availableCategories.map(
                                (category) => (
                                    <button
                                        key={category[0]}
                                        className="category-option"
                                        onClick={() => {
                                            setPlayerCategory(
                                                selectedPlayer.id,
                                                category[0]
                                            );

                                            setSelectedPlayer(
                                                null
                                            );
                                        }}
                                    >
                                        {category[0]}
                                    </button>
                                )
                            )}
                            <button className="category-option-random"
                                onClick={() => {
                                    const randomCategory = Math.floor(Math.random() * availableCategories.length)

                                    setPlayerCategory(
                                        selectedPlayer.id,
                                        availableCategories[randomCategory][0]
                                    );

                                    setSelectedPlayer(
                                        null
                                    );
                                }}>
                                RANDOM
                            </button>
                        </div>
                    </div>
                </div>
            )
            }
        </main >
    );
}