import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";
import type { Player } from "../types/player";
import { categoryQuestions } from "../DATA/categoriesAgrupment";

export function Players() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get("mode") === "papa-caliente" ? "papa-caliente" : "game";
    const hasCategories = mode === "game";

    const [name, setName] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [duplicateError, setDuplicateError] = useState(false);

    const players = useGameStore((s) => s.players);
    const totalPlayers = useGameStore((s) => s.totalPlayers);
    const selectedCategories = useGameStore((s) => s.selectedCategories);
    const setPlayerCategory = useGameStore((s) => s.setPlayerCategory);

    const addPlayer = useGameStore((s) => s.addPlayer);
    const removePlayer = useGameStore((s) => s.removePlayer);

    const handleAdd = () => {
        const trimmedName = name.trim();

        if (!trimmedName) return;

        if (players.length >= totalPlayers) return;

        const added = addPlayer(trimmedName);

        if (!added) {
            setDuplicateError(true);
            return;
        }

        setDuplicateError(false);
        setName("");
    };

    const usedCategories = players
        .map((p) => p.category)
        .filter(Boolean);

    const availableCategories = hasCategories
        ? categoryQuestions
            .filter(([categoryName]) =>
                selectedCategories.includes(categoryName)
            )
            .filter(
                ([categoryName]) =>
                    !usedCategories.includes(categoryName)
            )
        : [];

    const allPlayersHaveCategory =
        !hasCategories ||
        (players.length === totalPlayers &&
            players.every((player) => player.category));

    const backRoute = `/menu?mode=${mode}`;
    const continueRoute = `/lobby?mode=${mode}`;

    return (
        <main className="players-page">
            <div className="top-bar">
                <button
                    className="back-btn"
                    onClick={() => navigate(backRoute)}
                >
                    ← Volver
                </button>

                <div className="counter">
                    Jugadores {players.length} / {totalPlayers}
                </div>
            </div>


            {hasCategories && selectedCategories.length < totalPlayers && (
                <p className="categories-warning">
                    Tenés {selectedCategories.length} categoría(s) elegida(s) y {totalPlayers} jugadores.
                    Elegí más categorías desde el menú principal o vas a repetir.
                </p>
            )}

            <div className="player-input">
                <input
                    type="text"
                    value={name}
                    placeholder="Nombre del jugador"
                    onChange={(e) => {
                        setName(e.target.value);
                        setDuplicateError(false);
                    }}
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

            {duplicateError && (
                <p className="menu-warning">
                    Ya hay un jugador con ese nombre.
                </p>
            )}

            <div className="player-list">
                {players.map((player, index) => (
                    <div
                        key={player.id}
                        className="player-card"
                        onClick={() =>
                            hasCategories &&
                            setSelectedPlayer(
                                selectedPlayer?.id === player.id
                                    ? null
                                    : player
                            )
                        }
                    >
                        <div className="player-info">
                            <div className="player-name-start">
                                {index + 1}. {player.name}
                            </div>

                            {hasCategories && player.category && (
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
                        onClick={() => navigate(continueRoute)}
                        className="continue-btn"
                        disabled={!allPlayersHaveCategory}
                    >
                        Continuar
                    </button>
                )}

                {hasCategories && players.length > 1 && (
                    <button
                        onClick={() => {
                            const playersWithoutCategory = players.filter(p => !p.category);

                            if (playersWithoutCategory.length === 0) return;

                            const randomIndex = Math.floor(Math.random() * playersWithoutCategory.length);

                            setSelectedPlayer(playersWithoutCategory[randomIndex]);
                        }}
                        disabled={allPlayersHaveCategory}
                        className="choose-btn"
                    >
                        Elegir jugador random
                    </button>
                )}
            </div>

            {hasCategories && selectedPlayer && (
                <div
                    className="modal-overlay"
                    onClick={() => setSelectedPlayer(null)}
                >
                    <div
                        className="modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>
                            Categoría para{" "}
                            {selectedPlayer.name}
                        </h2>

                        <button
                            className="close-modal"
                            onClick={() => setSelectedPlayer(null)}
                        >
                            ✕
                        </button>

                        <button
                            disabled={!selectedPlayer.category}
                            className="delete-category"
                            onClick={() => {
                                setPlayerCategory(selectedPlayer.id, undefined)
                                setSelectedPlayer(null)
                            }}
                        >
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

                                            setSelectedPlayer(null);
                                        }}
                                    >
                                        {category[0]}
                                    </button>
                                )
                            )}
                            <button
                                className="category-option-random"
                                onClick={() => {
                                    const randomCategory = Math.floor(Math.random() * availableCategories.length)

                                    setPlayerCategory(
                                        selectedPlayer.id,
                                        availableCategories[randomCategory][0]
                                    );

                                    setSelectedPlayer(null);
                                }}
                            >
                                RANDOM
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
