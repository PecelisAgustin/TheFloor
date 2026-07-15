import { useState } from "react";
import { useGameStore } from "../store/gameStore";
import { useNavigate } from "react-router-dom";
import { duelChannel } from "../utils/duelchannel";
import { QRCodeSVG } from "qrcode.react";

export function GamePapaCaliente() {
    const navigate = useNavigate();
    const [showResetModal, setShowResetModal] = useState(false);
    const [showRefereeModal, setShowRefereeModal] = useState(false);
    const {
        players,
        actualPlayer,
        ronda,
        vueltasActuales,
        vueltas,
        resetGame,
        currentCategory,
        roomCode
    } = useGameStore();

    const maxPoints = Math.max(0, ...players.map(player => player.points ?? 0));

    const winners = players.filter(
        player => player.points === maxPoints
    );

    return (
        <main className="hot-potato-game">
            <button onClick={() => {
                setShowRefereeModal(true);
            }} className="open-referee">
                ⚖️ Árbitro
            </button>

            {showRefereeModal && (
                <div className="modal-overlay" onClick={() => setShowRefereeModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>Reconectar árbitro</h2>

                        {roomCode ? (
                            <>
                                <QRCodeSVG value={`${window.location.origin}/referee?room=${roomCode}`} size={220} />
                                <p className="room-code">Código: <strong>{roomCode}</strong></p>
                            </>
                        ) : (
                            <p>No hay una sala activa.</p>
                        )}

                        <button className="secondary-btn" onClick={() => setShowRefereeModal(false)}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {
                vueltasActuales <= vueltas ? (
                    <section className="hot-potato-info">

                        <div className="hot-potato-info-card">
                            <span>Árbitro</span>

                            <h1>
                                {players[actualPlayer]?.name ?? "-"}
                            </h1>
                        </div>

                        <div className="hot-potato-info-row">

                            <div className="hot-potato-info-card">
                                <span>Ronda</span>
                                <h2>{ronda} / {vueltas * players.length}</h2>
                            </div>

                            <div className="hot-potato-info-card">
                                <span>Vuelta</span>
                                <h2>{vueltasActuales} / {vueltas}</h2>
                            </div>

                        </div>

                        <div className="hot-potato-info-card">
                            <span>Temática</span>

                            <h2>{currentCategory}</h2>
                        </div>

                        <button
                            className="hot-potato-start-round"
                            onClick={() => {
                                navigate("/duel-papa-caliente")
                                duelChannel.postMessage({ type: "NEW_DUEL", category: currentCategory });
                            }}

                        >
                            Comenzar ronda
                        </button>

                    </section>
                ) : (
                    <>
                        <div className="modal-overlay">
                            <div
                                className="modal"
                                style={{ maxWidth: "500px" }}
                            >
                                <h1 style={{ marginBottom: "1rem" }}>
                                    🏆 Fin de la partida
                                </h1>

                                <h2 style={{ marginBottom: "1.5rem" }}>
                                    {winners.length === 1
                                        ? `🏆 Ganó ${winners[0].name}`
                                        : `🤝 Empate entre ${winners.map(w => w.name).join(", ")}`}
                                </h2>

                                <div className="results-list">
                                    {[...players]
                                        .sort((a, b) => (b.points ?? 0) - (a.points ?? 0)).map((player, index) => (
                                            <div
                                                key={player.id}
                                                className="result-row"
                                            >
                                                <span className="result-list-span">
                                                    {index === 0 && "🥇 "}
                                                    {index === 1 && "🥈 "}
                                                    {index === 2 && "🥉 "}
                                                    {player.name}
                                                </span>

                                                <strong>
                                                    {player.points} pts
                                                </strong>
                                            </div>
                                        ))}
                                </div>

                                <button
                                    className="start-btn"
                                    style={{
                                        width: "100%",
                                        marginTop: "1.5rem"
                                    }}
                                    onClick={() => {
                                        resetGame();
                                        duelChannel.postMessage({
                                            type: "END_OF_GAME"
                                        });
                                        navigate("/");
                                    }}
                                >
                                    Volver al menú
                                </button>
                            </div>
                        </div>
                    </>
                )
            }

            <section className="hot-potato-scoreboard">

                <h2>Puntajes</h2>

                <table>

                    <thead>

                        <tr>
                            <th>Jugador</th>
                            <th>Puntos</th>
                        </tr>

                    </thead>

                    <tbody>

                        {[...players]
                            .sort((a, b) => (b.points ?? 0) - (a.points ?? 0))
                            .map(player => (
                                <tr key={player.id}>
                                    <td>{player.name}</td>
                                    <td>{player.points}</td>
                                </tr>
                            ))
                        }

                    </tbody>

                </table>

            </section>

            <button
                className="reset-game-btn"
                onClick={() => setShowResetModal(true)}
            >
                ✕
            </button>

            {showResetModal && (
                <div className="modal-overlay" onClick={() => setShowResetModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>¿Abandonar partida?</h2>
                        <p style={{ color: "rgba(255,255,255,0.6)" }}>Se perderá todo el progreso.</p>
                        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                            <button className="secondary-btn" style={{ flex: 1 }} onClick={() => setShowResetModal(false)}>
                                Cancelar
                            </button>
                            <button className="start-btn" style={{ flex: 1 }} onClick={() => { resetGame(); navigate("/"); duelChannel.postMessage({ type: "END_OF_GAME" }); }}>
                                Sí, salir
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </main >
    );
}