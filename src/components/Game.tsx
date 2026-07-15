import { useMemo, useState } from "react";
import { useGameStore } from "../store/gameStore";
import { useNavigate } from "react-router-dom";
import type { Player } from "../types/player";
import { duelChannel } from "../utils/duelchannel";
import { QRCodeSVG } from "qrcode.react";

export function Game() {
    const navigate = useNavigate();
    const tiles = useGameStore((s) => s.tiles);
    const roomCode = useGameStore((s) => s.roomCode);
    const [showRefereeModal, setShowRefereeModal] = useState(false);
    const setAttackingPlayer = useGameStore((s) => s.setAttackingPlayer);
    const setDefendingPlayer = useGameStore((s) => s.setDefendingPlayer);
    const players = useGameStore((s) => s.players);
    const gameWinner = useGameStore((s) => s.gameWinner);
    const resetGame = useGameStore((s) => s.resetGame);
    const popPendingPlayer = useGameStore((s) => s.popPendingPlayer);

    type GamePhase = "waiting" | "rolling" | "target-selection";
    const [showResetModal, setShowResetModal] = useState(false);
    const [gamePhase, setGamePhase] = useState<GamePhase>("waiting");
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [momentaniumPlayer, setMomentaniumPlayer] = useState<string | null>(null);
    const [targetPlayer, setTargetPlayer] = useState<Player | null>(null);
    const [availablePlayersToAttack, setAvailablePlayersToAttack] = useState<Player[]>([]);

    const startDuel = () => {
        if (targetPlayer === null) return;

        if (selectedPlayer) setAttackingPlayer(selectedPlayer);
        if (targetPlayer) setDefendingPlayer(targetPlayer);

        const category = targetPlayer.category;

        navigate("/duel");
        duelChannel.postMessage({ type: "NEW_DUEL", category });
    };

    const cols = useMemo(() => Math.ceil(Math.sqrt(tiles.length)), [tiles.length]);
    const rows = useMemo(() => Math.ceil(tiles.length / cols), [tiles.length, cols]);

    const getAdjacentIndexes = (index: number) => {
        const adjacent: number[] = [];
        const row = Math.floor(index / cols);
        const col = index % cols;

        if (row > 0) adjacent.push(index - cols);
        if (row < rows - 1) adjacent.push(index + cols);
        if (col > 0) adjacent.push(index - 1);
        if (col < cols - 1) adjacent.push(index + 1);

        return adjacent.filter((i) => i < tiles.length);
    };

    const startRound = () => {
        if (gamePhase === "rolling" || players.length === 0) return;

        setGamePhase("rolling");
        setSelectedPlayer(null);

        const chosenPlayer = popPendingPlayer();
        if (!chosenPlayer) return;

        let step = 0;

        const animate = () => {
            const visualIndex = Math.floor(Math.random() * players.length);
            setMomentaniumPlayer(players[visualIndex].name);
            step++;

            if (step >= 16) {
                setMomentaniumPlayer(null);
                setSelectedPlayer(chosenPlayer);

                const playerTileIndexes = tiles
                    .map((tile, index) => ({ tile, index }))
                    .filter(({ tile }) => tile.ownerName === chosenPlayer.name)
                    .map(({ index }) => index);

                const attackablePlayers = new Map<string, Player>();

                playerTileIndexes.forEach((tileIndex) => {
                    getAdjacentIndexes(tileIndex).forEach((adjacentIndex) => {
                        const ownerName = tiles[adjacentIndex].ownerName;
                        if (ownerName === chosenPlayer.name) return;

                        const player = players.find((p) => p.name === ownerName);
                        if (player) attackablePlayers.set(player.id, player);
                    });
                });

                setAvailablePlayersToAttack([...attackablePlayers.values()]);
                setTargetPlayer(null);
                setGamePhase("target-selection");
                return;
            }

            const delay = 70 + Math.pow(step, 1.8) * 8;
            setTimeout(animate, delay);
        };

        animate();
    };

    return (
        <main className="game-page">
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
            <div
                className="board"
                style={{
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                }}
            >
                {tiles.map((tile) => (
                    <div
                        style={{
                            borderColor: players.find((p) => p.name === tile.ownerName)?.color,
                        }}
                        onClick={() => {
                            if (availablePlayersToAttack.map((p) => p.name).includes(tile.ownerName)) {
                                setTargetPlayer(
                                    players.find((p) => p.name === tile.ownerName) ?? null
                                );
                            }
                        }}
                        key={tile.id}
                        className={`
                            cell
                            ${tile.ownerName === momentaniumPlayer ? "active" : ""}
                            ${tile.ownerName === selectedPlayer?.name ? "winner" : ""}
                            ${availablePlayersToAttack.map((p) => p.name).includes(tile.ownerName) ? "attackable" : ""}
                            ${targetPlayer?.name === tile.ownerName ? "selected-target" : ""}
                        `}
                    >
                        <div className="cell-content">
                            <div className="cell-name">{tile.ownerName}</div>
                            <div className="cell-category">
                                {tile.ownerName === tile.originalOwnerName
                                    ? players.find((p) => p.name === tile.ownerName)?.category
                                    : ""}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="start-round-btn"
                onClick={() => {
                    if (gamePhase === "waiting") {
                        startRound();
                    } else {
                        startDuel();
                    }
                }}
                disabled={
                    gamePhase === "rolling" ||
                    (gamePhase === "target-selection" && targetPlayer === null)
                }
            >
                {gamePhase === "rolling"
                    ? "Sorteando..."
                    : gamePhase === "target-selection"
                        ? "Comenzar duelo"
                        : "Comenzar ronda"}
            </button>

            {gameWinner && (
                <div className="game-winner-overlay">
                    <div className="game-winner-box">
                        <div className="game-winner-trophy">🏆</div>
                        <p className="game-winner-title">¡Ganador del juego!</p>
                        <h2 className="game-winner-name">{gameWinner?.name}</h2>
                        <p className="game-winner-sub">¡Conquistó todo el tablero!</p>
                        <button
                            className="game-winner-btn"
                            onClick={() => {

                                duelChannel.postMessage({ type: "END_OF_GAME" });
                                resetGame();
                                navigate("/");
                            }}
                        >
                            Volver al menú
                        </button>
                    </div>
                </div>
            )}

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
        </main>
    );
}
