import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";

export function MenuPapaCaliente() {
    const navigate = useNavigate();

    const totalPlayers = useGameStore(
        (s) => s.totalPlayers
    );

    const vueltas = useGameStore(s => s.vueltas)
    const setCantidadVueltas = useGameStore(
        (s) => s.setCantidadVueltas
    )


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

    const selectedCategories = useGameStore((s) => s.selectedCategories)

    const maxVueltas =
        totalPlayers > 0
            ? Math.floor(selectedCategories.length / totalPlayers)
            : 0;

    const notEnoughPlayers = totalPlayers <= 2;
    const notEnoughCategories = selectedCategories.length < totalPlayers;
    const timeTooLow = timePerPlayer < 10;
    const notEnoughCategoriesForVueltas =
        selectedCategories.length < vueltas * totalPlayers;
    const invalidVueltas = vueltas < 1;

    const canStart =
        !notEnoughPlayers &&
        !notEnoughCategories &&
        !timeTooLow &&
        !notEnoughCategoriesForVueltas &&
        !invalidVueltas;

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
                <h1 className="title">PAPA CALIENTE</h1>

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
                        Tiempo Inicial (deciende de a 5s)
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
                        El tiempo inicial tiene que ser de al menos 10 segundos.
                    </p>
                )}

                {notEnoughCategories && (
                    <p className="menu-warning">
                        Tenés {selectedCategories.length} categoría(s) seleccionada(s) y {totalPlayers} jugadores.
                        Elegí más desde "🗂️ Categorías".
                    </p>
                )}

                <div className="config-item">
                    <label htmlFor="vueltas">
                        Cantidad de vueltas (maximo {totalPlayers > 0 ? maxVueltas : '?'})
                    </label>

                    <input
                        id="vueltas"
                        type="number"
                        min="1"
                        max={maxVueltas || undefined}
                        step="1"
                        value={vueltas}
                        onChange={(e) =>
                            setCantidadVueltas(
                                Number(e.target.value)
                            )
                        }
                    />
                </div>

                {invalidVueltas && (
                    <p className="menu-warning">
                        Tiene que haber al menos 1 vuelta.
                    </p>
                )}

                {!invalidVueltas && !notEnoughCategories && notEnoughCategoriesForVueltas && (
                    <p className="menu-warning">
                        Con {totalPlayers} jugadores y {vueltas} vuelta(s) necesitás {vueltas * totalPlayers} categorías,
                        y tenés {selectedCategories.length}. Bajá las vueltas o elegí más categorías.
                    </p>
                )}

                <button
                    onClick={() => navigate("/players-papa-caliente")}
                    className="start-btn"
                    disabled={!canStart}
                >
                    Comenzar partida
                </button>
            </div>
        </main>
    );
}
