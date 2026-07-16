import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";

export function MenuTheFloor() {
    const navigate = useNavigate();

    const totalPlayers = useGameStore(
        (s) => s.totalPlayers
    );

    const resetPlayers = useGameStore(
        (s) => s.resetPlayers
    );

    const timePerPlayer = useGameStore(
        (s) => s.timePerPlayer
    );

    const setTotalPlayers = useGameStore(
        (s) => s.setTotalPlayers
    );

    const setTimePerPlayer = useGameStore(
        (s) => s.setTimePerPlayer
    );

    const selectedCategories = useGameStore(
        (s) => s.selectedCategories
    );

    const notEnoughPlayers = totalPlayers <= 2;
    const notEnoughCategories = selectedCategories.length < totalPlayers;
    const timeTooLow = timePerPlayer < 10;

    const canStart = !notEnoughPlayers && !notEnoughCategories && !timeTooLow;

    return (
        <main className="menu">
            <button
                type="button"
                className="back-button"
                onClick={() => navigate("/")}
                aria-label="Volver al menú"
            >
                ←
            </button>
            <div className="menu-card">
                <h1 className="title">THE FLOOR</h1>

                <div className="config-item">
                    <label htmlFor="players">
                        Cantidad de jugadores
                    </label>

                    <input
                        id="players"
                        type="number"
                        min="3"
                        max="50"
                        value={totalPlayers}
                        onChange={(e) => {
                            if (totalPlayers > Number(e.target.value)) {
                                resetPlayers()
                            }
                            setTotalPlayers(
                                Number(e.target.value)
                            )
                        }
                        }
                    />
                </div>

                {notEnoughPlayers && (
                    <p className="menu-warning">
                        Necesitás al menos 3 jugadores.
                    </p>
                )}

                <div className="config-item">
                    <label htmlFor="time">
                        Tiempo por jugador
                    </label>

                    <input
                        id="time"
                        type="number"
                        min="10"
                        step="5"
                        value={timePerPlayer}
                        onChange={(e) =>
                            setTimePerPlayer(
                                Number(e.target.value)
                            )
                        }
                    />
                </div>

                {timeTooLow && (
                    <p className="menu-warning">
                        El tiempo por jugador tiene que ser de al menos 10 segundos.
                    </p>
                )}

                {notEnoughCategories && (
                    <p className="menu-warning">
                        Tenés {selectedCategories.length} categoría(s) seleccionada(s) y {totalPlayers} jugadores.
                        Cada jugador necesita una categoría distinta — elegí más desde "🗂️ Categorías".
                    </p>
                )}

                <button
                    onClick={() => navigate("/players")}
                    className="start-btn"
                    disabled={!canStart}
                >
                    Comenzar partida
                </button>
            </div>
        </main>
    );
}
