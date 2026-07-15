import { useNavigate } from "react-router-dom";

export function Menu() {
    const navigate = useNavigate();

    return (
        <main className="game-mode-menu">
            <h1 className="game-mode-menu__title">
                Seleccioná un modo de juego
            </h1>

            <div className="game-mode-menu__grid">
                <button
                    className="game-mode-menu__card"
                    onClick={() => navigate("/menu-the-floor")}
                >
                    <h2>The Floor</h2>
                    <p>Modo por categorías con tablero.</p>
                </button>

                <button
                    className="game-mode-menu__card"
                    onClick={() => navigate("/menu-papa-caliente")}
                >
                    <h2>Papa Caliente</h2>
                    <p>Modo de preguntas rápidas.</p>
                </button>
            </div>
        </main>
    );
}