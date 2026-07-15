import { useEffect, useRef, useState } from "react";
import { duelChannel } from "../utils/duelchannel";
import { fetchDeezerPreview } from "../utils/deezerPreview";
import { useGameStore } from "../store/gameStore";
import { type CategoryQuestion } from "../DATA/categoriesAgrupment"
import type { Player } from "../types/player";
import { useNavigate } from "react-router-dom";

export function Duel() {
    const navigate = useNavigate()
    const [flashEffect, setFlashEffect] =
        useState<"correct" | "pass" | null>(
            null
        );

    const attackingPlayer =
        useGameStore((s) => s.attackingPlayer);

    const conquerTerritory =
        useGameStore((s) => s.conquerTerritory);

    const timerPerPlayer = useGameStore((s) => s.timePerPlayer)

    const defendingPlayer =
        useGameStore((s) => s.defendingPlayer);

    const [attackerTime, setAttackerTime] = useState<number>(timerPerPlayer)

    const [defenderTime, setDefenderTime] = useState<number>(timerPerPlayer)

    const [revealAnswer, setRevealAnswer] = useState<boolean>(false)

    const killPlayer = useGameStore((s) => s.killPlayer)

    const [currentQuestion, setCurrentQuestion] =
        useState<CategoryQuestion | null>(null);

    const [duelPhase, setDuelPhase] =
        useState<"waiting" | "countdown" | "playing" | "winner">(
            "waiting"
        );
    const [turn, setTurn] = useState<"attacker" | "defender">("attacker")

    const [winner, setWinner] = useState<Player | null>(null);


    const [countdown, setCountdown] =
        useState(3);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const handler = (event: MessageEvent) => {

            if (event.data.type === "START_DUEL") {
                setDuelPhase("countdown");
                setCountdown(3);
            } else if (event.data.type === "NEW_QUESTION") {
                setCurrentQuestion(event.data.question);
            } else if (event.data.type === "CORRECT_QUESTION") {

                setRevealAnswer(true);
                setFlashEffect("correct");

                setTimeout(() => {
                    setFlashEffect(null);
                    setRevealAnswer(false);
                    setTurn((s) =>
                        s === "attacker"
                            ? "defender"
                            : "attacker"
                    );

                    setCurrentQuestion(
                        event.data.question
                    );
                }, 300);
            } else if (event.data.type === "PASS_QUESTION") {

                setFlashEffect("pass");
                setRevealAnswer(true);


                setTimeout(() => {
                    setFlashEffect(null);
                    setRevealAnswer(false);
                    setCurrentQuestion(
                        event.data.question
                    );
                }, 3000);
            }
        };

        duelChannel.addEventListener("message", handler);

        return () => {
            duelChannel.removeEventListener("message", handler);
        };
    }, []);



    useEffect(() => {
        if (duelPhase !== "playing" || winner) {
            return;
        }

        if (attackerTime === 0 && defendingPlayer && attackingPlayer) {
            duelChannel.postMessage({ type: "END_DUEL" });



            if (flashEffect) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setFlashEffect("pass");
                setRevealAnswer(true);


                setTimeout(() => {
                    setFlashEffect(null);
                    setRevealAnswer(false);
                    setWinner(defendingPlayer);
                    conquerTerritory(defendingPlayer, attackingPlayer)
                    killPlayer(attackingPlayer.name)
                }, 3000);
            } else {
                setWinner(defendingPlayer);
                conquerTerritory(defendingPlayer, attackingPlayer)
                killPlayer(attackingPlayer.name)
            }


            setTimeout(() => {
                navigate('/game')
            }, 5000);
        }

        if (defenderTime === 0 && defendingPlayer && attackingPlayer) {
            duelChannel.postMessage({ type: "END_DUEL" });

            setFlashEffect("pass");
            setRevealAnswer(true);


            setTimeout(() => {
                setFlashEffect(null);
                setRevealAnswer(false);
                setWinner(defendingPlayer);
                conquerTerritory(defendingPlayer, attackingPlayer)
                killPlayer(attackingPlayer.name)
            }, 3000);

            setTimeout(() => {
                navigate('/game')
            }, 5000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        attackerTime,
        defenderTime,
        duelPhase,
        attackingPlayer,
        defendingPlayer
    ]);

    useEffect(() => {
        if (duelPhase !== "playing") {
            return;
        }

        const interval = setInterval(() => {
            if (turn === "attacker") {
                setAttackerTime((t) =>
                    Math.max(t - 1, 0)
                );
            } else {
                setDefenderTime((t) =>
                    Math.max(t - 1, 0)
                );
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [duelPhase, turn]);

    useEffect(() => {
        if (duelPhase !== "countdown") return;

        if (countdown === 0) {

            // eslint-disable-next-line react-hooks/set-state-in-effect
            setDuelPhase("playing");
            return;
        }

        const timeout = setTimeout(() => {
            setCountdown((c) => c - 1);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [countdown, duelPhase]);

    useEffect(() => {

        if (!currentQuestion?.trackId)
            return;

        if (duelPhase !== "playing")
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

    }, [currentQuestion, duelPhase]);

    useEffect(() => {

        if (!audioRef.current)
            return;

        if (revealAnswer || duelPhase !== "playing") {
            audioRef.current.pause();
        }

    }, [revealAnswer, duelPhase]);

    return (
        <main className={`
        duel-page
        ${flashEffect === "correct"
                ? "flash-correct"
                : ""}
        ${flashEffect === "pass"
                ? "flash-pass"
                : ""}
    `}>

            <header className="duel-header">

                <div className={`
        player-side left
        ${turn === "attacker"
                        ? "active-player"
                        : ""}
    `}>
                    <div className="player-name">
                        {attackingPlayer?.name}
                    </div>

                    <div className="player-timer">
                        {attackerTime}
                    </div>
                </div>

                <div className={`
        player-side right
        ${turn === "defender"
                        ? "active-player"
                        : ""}
    `}>
                    <div className="player-name">
                        {defendingPlayer?.name}
                    </div>

                    <div className="player-timer">
                        {defenderTime}
                    </div>
                </div>

            </header>

            <section className="question-section">

                {duelPhase === "waiting" && (
                    <span style={{ fontSize: "3rem" }}>ESPERANDO AL ARBITRO...</span>
                )}

                {duelPhase === "countdown" && (
                    <div className="countdown">
                        {countdown}
                    </div>
                )}

                <button onClick={() => {
                    window.open("/referee?started=true", "_blank", "width=1200,height=800");

                }} className="open-referee">
                    ⚖️ Árbitro
                </button>

                {currentQuestion?.image && (
                    <img
                        src={currentQuestion.image}
                        alt=""
                        className="question-image"
                    />
                )}

                {currentQuestion?.trackId && (
                    <div className="question-audio">

                        <div
                            className={`
                                vinyl
                                ${duelPhase === "playing" && !revealAnswer
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

            {winner && (
                <div className="winner-overlay">

                    <div className="winner-content">

                        <h1>🏆 GANADOR 🏆</h1>

                        <h2>{winner.name}</h2>

                        <p>
                            Conquista el territorio
                        </p>

                    </div>

                </div>
            )}

        </main>
    );
}