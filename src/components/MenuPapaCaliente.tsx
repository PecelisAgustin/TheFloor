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
                        min="2"
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

                <div className="config-item">
                    <label htmlFor="time">
                        Tiempo Inicial (deciende de a 5s)
                    </label>

                    <input
                        id="time"
                        type="number"
                        min="5"
                        step="5"
                        value={timePerPlayer}
                        onChange={(e) =>
                            setTimePerPlayer(
                                Number(e.target.value)
                            )
                        }
                    />
                </div>

                <div className="config-item">
                    <label htmlFor="vueltas">
                        Cantidad de vueltas (maximo )
                    </label>

                    <input
                        id="vueltas"
                        type="number"
                        min="1"
                        step="1"
                        value={vueltas}
                        onChange={(e) =>
                            setCantidadVueltas(
                                Number(e.target.value)
                            )
                        }
                    />
                </div>

                <button
                    onClick={() => navigate("/players-papa-caliente")}
                    className="start-btn"
                >
                    Comenzar partida
                </button>
            </div>
        </main>
    );
}