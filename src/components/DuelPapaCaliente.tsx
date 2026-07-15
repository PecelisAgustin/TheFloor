import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { duelChannel, type DuelChannelEvent } from "../utils/duelchannel";
import { fetchDeezerPreview } from "../utils/deezerPreview";
import { useGameStore } from "../store/gameStore";

import type { Player } from "../types/player";
import type { CategoryQuestion } from "../DATA/categoriesAgrupment";

export function DuelPapaCaliente() {
    const navigate = useNavigate();

    const players = useGameStore((s) => s.players);
    const actualPlayer = useGameStore((s) => s.actualPlayer);
    const initialTimePerPlayer = useGameStore((s) => s.timePerPlayer);
    const [deads, setDeads] = useState(0)
    const addPoints = useGameStore((s) => s.addPoints)
    const [showResultsModal, setShowResultsModal] = useState(false);
    const [timePerPlayer, setTimePerPlayer] = useState(initialTimePerPlayer)

    const [roundResults, setRoundResults] = useState<
        { playerName: string; points: number }[]
    >([]);
    const prePoints = useRef<
        { playerId: string; points: number }[]
    >([]);

    const audioRef = useRef<HTMLAudioElement | null>(null);


    const nextRound = useGameStore((s) => s.nextRound);

    const [currentQuestion, setCurrentQuestion] =
        useState<CategoryQuestion | null>(null);

    const [orderedPlayers, setOrderedPlayers] =
        useState<Player[]>([]);

    const [currentPlayerIndex, setCurrentPlayerIndex] =
        useState(0);

    const [timeLeft, setTimeLeft] =
        useState(timePerPlayer);

    const [phase, setPhase] =
        useState<
            "waiting" |
            "countdown" |
            "playing" |
            "finished"
        >("waiting");

    const [countdown, setCountdown] =
        useState(3);

    const [revealAnswer, setRevealAnswer] =
        useState(false);

    const [flashEffect, setFlashEffect] =
        useState<"correct" | "pass" | null>(null);

    const currentPlayer =
        orderedPlayers[currentPlayerIndex];
    const nextPlayerInfo =
        orderedPlayers[
        (currentPlayerIndex + 1) % orderedPlayers.length
        ];

    useEffect(() => {

        const start =
            (actualPlayer + 1) % players.length;

        const ordered: Player[] = [];

        for (let i = 0; i < players.length - 1; i++) {
            ordered.push(
                players[
                (start + i) % players.length
                ]
            );
        }


        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOrderedPlayers(ordered);

    }, [players, actualPlayer]);

    useEffect(() => {

        const handler = (event: DuelChannelEvent) => {

            switch (event.data.type) {

                case "START_DUEL":

                    setPhase("countdown");
                    setCountdown(3);

                    break;

                case "NEW_QUESTION":

                    setCurrentQuestion(event.data.question);

                    break;

                case "CORRECT_QUESTION":

                    if (!currentPlayer)
                        return;

                    setRevealAnswer(true);
                    setFlashEffect("correct");

                    setTimeout(() => {

                        setRevealAnswer(false);
                        setFlashEffect(null);


                        // eslint-disable-next-line react-hooks/immutability
                        nextPlayer();
                        setCurrentQuestion(event.data.question);

                    }, 300);

                    break;

                case "PASS_QUESTION":

                    setRevealAnswer(true);
                    setFlashEffect("pass");

                    setTimeout(() => {

                        setRevealAnswer(false);
                        setFlashEffect(null);
                        setCurrentQuestion(event.data.question);


                    }, 3000);

                    break;

            }

        };

        duelChannel.addEventListener(
            "message",
            handler
        );

        return () =>
            duelChannel.removeEventListener(
                "message",
                handler
            );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPlayer]);

    useEffect(() => {

        if (phase !== "playing")
            return;

        const interval = setInterval(() => {

            setTimeLeft((t) =>
                Math.max(t - 1, 0)
            );

        }, 1000);

        return () => clearInterval(interval);

    }, [phase]);

    useEffect(() => {
        if (phase !== "playing") return;
        if (timeLeft > 0) return;
        if (!currentPlayer) return;

        prePoints.current.push({
            playerId: currentPlayer.id,
            points: deads,
        });

        const nextOrderedPlayers = orderedPlayers.filter(
            player => player.id !== currentPlayer.id
        );

        if (nextOrderedPlayers.length === 1) {
            duelChannel.postMessage({ type: "END_DUEL" });

            const survivor = nextOrderedPlayers[0];

            const results = prePoints.current.map(({ playerId, points }) => {
                const player = players.find(p => p.id === playerId);

                return {
                    playerName: player?.name ?? "Jugador",
                    points,
                };
            });

            results.push({
                playerName: survivor.name,
                points: deads + 1,
            });

            addPoints(survivor.id, deads + 1);

            prePoints.current.forEach(({ playerId, points }) => {
                addPoints(playerId, points);
            });

            setRoundResults(results);
            setShowResultsModal(true);
            setPhase("finished");

            return;
        }

        setOrderedPlayers(nextOrderedPlayers);
        setDeads(prev => prev + 1);

        let nextTime = timePerPlayer;

        if (currentPlayerIndex >= nextOrderedPlayers.length) {
            setCurrentPlayerIndex(0);

            nextTime =
                timePerPlayer > 10
                    ? timePerPlayer - 5
                    : timePerPlayer - 1;

            setTimePerPlayer(nextTime);
        }

        duelChannel.postMessage({ type: "NEW_QUESTION" });

        setTimeout(() => {
            setTimeLeft(nextTime);
        }, 3000);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft, phase]);

    useEffect(() => {

        if (!currentQuestion?.trackId)
            return;

        if (phase !== "playing")
            return;

        if (!audioRef.current)
            return;

        let cancelled = false;

        audioRef.current.pause();
        audioRef.current.removeAttribute("src");
        audioRef.current.load();

        fetchDeezerPreview(currentQuestion.trackId)
            .then((freshUrl) => {

                if (cancelled || !audioRef.current)
                    return;

                audioRef.current.src = freshUrl;
                audioRef.current.load();

                return audioRef.current.play();

            })
            .catch((err) => {
                console.error(
                    "No se pudo reproducir el preview:",
                    currentQuestion.trackId,
                    err
                );
            });

        return () => {
            cancelled = true;
        };

    }, [currentQuestion, phase]);

    useEffect(() => {

        if (!audioRef.current)
            return;

        if (revealAnswer || phase !== "playing") {
            audioRef.current.pause();
        }

    }, [revealAnswer, phase]);

    function handleContinue() {
        setShowResultsModal(false);

        nextRound();
        navigate("/papa-caliente");
    }

    useEffect(() => {

        if (phase !== "countdown")
            return;

        if (countdown === 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPhase("playing");

            return;

        }

        const timeout =
            setTimeout(() => {

                setCountdown((c) => c - 1);

            }, 1000);

        return () => clearTimeout(timeout);

    }, [countdown, phase]);

    function nextPlayer() {
        const nextIndex =
            (currentPlayerIndex + 1) % orderedPlayers.length;

        let nextTime = timePerPlayer;

        if (nextIndex === 0) {
            nextTime =
                timePerPlayer > 10
                    ? timePerPlayer - 5
                    : timePerPlayer - 1;

            setTimePerPlayer(nextTime);
        }

        setCurrentPlayerIndex(nextIndex);
        setTimeLeft(nextTime);

    }

    return (
        <main
            className={`
                duel-page
                ${flashEffect === "correct"
                    ? "flash-correct"
                    : ""}
                ${flashEffect === "pass"
                    ? "flash-pass"
                    : ""}
            `}
        >

            <header className="duel-header">

                <div className="single-player">

                    <div className="single-player-first">
                        <span>Jugador</span>

                        <h1>
                            {currentPlayer?.name}
                        </h1>

                    </div>
                    <div className="player-timer">
                        {timeLeft}
                    </div>

                    <div className="next-player-card">
                        <span>Próximo</span>
                        <span>jugador</span>
                        <h3>{nextPlayerInfo?.name}</h3>
                    </div>

                </div>

            </header>

            <section className="question-section">

                {phase === "waiting" && (
                    <span
                        style={{
                            fontSize: "3rem"
                        }}
                    >
                        ESPERANDO AL ÁRBITRO...
                    </span>
                )}

                {phase === "countdown" && (
                    <div className="countdown">
                        {countdown}
                    </div>
                )}

                {currentQuestion?.image && (
                    <img
                        src={currentQuestion.image}
                        className="question-image"
                    />
                )}

                {currentQuestion?.trackId && (
                    <div className="question-audio">

                        <div
                            className={`
                                vinyl
                                ${phase === "playing" && !revealAnswer
                                    ? "spinning"
                                    : ""}
                            `}
                        >
                            🎵
                        </div>

                        <audio
                            ref={audioRef}
                            preload="auto"
                            onError={() =>
                                console.error(
                                    "Error cargando el preview para trackId:",
                                    currentQuestion.trackId
                                )
                            }
                        />

                    </div>
                )}

                {currentQuestion?.text && (
                    <div className="question-text">
                        {currentQuestion.text}
                    </div>
                )}

            </section>

            <footer className="answer-section">

                <div className="answer-box">

                    {revealAnswer
                        ? [
                            currentQuestion?.answer,
                            ...(currentQuestion?.possibleAnswers ?? []),
                        ]
                            .filter(Boolean)
                            .join(" / ")
                        : ""}

                </div>

            </footer>

            {showResultsModal && (
                <div className="modal-overlay">
                    <div className="results-modal">
                        <h2>Fin de la ronda</h2>

                        <div className="results-list">
                            {roundResults
                                .sort((a, b) => b.points - a.points)
                                .map(result => (
                                    <div
                                        key={result.playerName}
                                        className="result-row"
                                    >
                                        <span>{result.playerName}</span>
                                        <strong>+{result.points}</strong>
                                    </div>
                                ))}
                        </div>

                        <button onClick={handleContinue}>
                            Continuar
                        </button>
                    </div>
                </div>
            )}

        </main>
    );
}