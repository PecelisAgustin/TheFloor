import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categoryQuestions, type CategoryQuestion } from "../DATA/categoriesAgrupment";
import { duelChannel, type DuelChannelEvent } from "../utils/duelchannel";

export function Referee() {
    const [searchParams] = useSearchParams();
    const room = searchParams.get("room");
    const [connected, setConnected] = useState(false);

    const [duelPhase, setDuelPhase] = useState<"waiting" | "countdown" | "playing" | "no-duel">("no-duel");
    const [countdown, setCountdown] = useState<number | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<CategoryQuestion | null>(null);
    const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false)
    const [currentCategory, setCurrentCategory] = useState<string | null>(null)

    useEffect(() => {
        if (!room) return;

        duelChannel.connect(room);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setConnected(true);
    }, [room]);





    useEffect(() => {
        const handler = (event: DuelChannelEvent) => {

            if (event.data.type === "NEW_DUEL") {
                setCurrentCategory(event.data.category);
                setDuelPhase("waiting");
            } else if (event.data.type === "END_DUEL") {
                setCurrentQuestion(null);
                setCountdown(null);
                setButtonsDisabled(false);
                remainingQuestions.current = [];
                setCurrentCategory(null)
                setDuelPhase("no-duel")
            } else if (event.data.type === "END_OF_GAME") {
                window.close()
            } else if (event.data.type === "NEW_QUESTION") {
                // eslint-disable-next-line react-hooks/immutability
                handlePass()
            }
        };
        duelChannel.addEventListener("message", handler);

        return () => {
            duelChannel.removeEventListener("message", handler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const remainingQuestions = useRef<CategoryQuestion[]>([]);

    const getNextQuestion = (): CategoryQuestion | null => {
        if (remainingQuestions.current.length === 0) {
            const all = categoryQuestions.find(([name]) => name === currentCategory)?.[1] ?? [];
            // eslint-disable-next-line react-hooks/immutability
            remainingQuestions.current = [...all].filter(q => q !== currentQuestion);
        }

        if (remainingQuestions.current.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * remainingQuestions.current.length);
        const question = remainingQuestions.current[randomIndex];

        remainingQuestions.current.splice(randomIndex, 1);



        return question;
    };

    const startDuel = () => {
        const all = categoryQuestions.find(([name]) => name === currentCategory)?.[1] ?? [];
        // eslint-disable-next-line react-hooks/immutability
        remainingQuestions.current = [...all];

        duelChannel.postMessage({ type: "START_DUEL" });
        setDuelPhase("countdown");
        setCountdown(3);
    };

    const handleCorrect = () => {
        const nextQuestion = getNextQuestion();
        if (!nextQuestion) return;

        setCurrentQuestion(nextQuestion);
        console.log(currentQuestion)
        duelChannel.postMessage({ type: "CORRECT_QUESTION", question: nextQuestion });
        setButtonsDisabled(true)
        setTimeout(() => {
            setButtonsDisabled(false)
        }, 300);
    };

    const handlePass = () => {
        const nextQuestion = getNextQuestion();
        if (!nextQuestion) return;

        setCurrentQuestion(nextQuestion);
        duelChannel.postMessage({ type: "PASS_QUESTION", question: nextQuestion });
        setButtonsDisabled(true)
        setTimeout(() => {
            setButtonsDisabled(false)
        }, 3000);
    };

    useEffect(() => {
        if (duelPhase !== "countdown") return;

        if (countdown === 0) {
            const question = getNextQuestion();
            if (question) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setCurrentQuestion(question);
                duelChannel.postMessage({ type: "NEW_QUESTION", question });
            }
            setDuelPhase("playing");
            return;
        }

        const timeout = setTimeout(() => {
            setCountdown((c) => (c !== null ? c - 1 : c));
        }, 1000);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countdown]);

    return (
        <main className="referee-page">
            <h1>Árbitro</h1>

            {!room && (
                <h2>Falta el código de sala en el link. Escaneá el QR de nuevo.</h2>
            )}

            {room && !connected && (
                <h2>Conectando...</h2>
            )}

            {room && connected && duelPhase !== "no-duel" ? (
                <>
                    {duelPhase === "waiting" && (
                        <button className="start-duel-btn" onClick={startDuel}>
                            Empezar duelo
                        </button>
                    )}

                    {duelPhase === "countdown" && (
                        <div className="countdown">{countdown}</div>
                    )}

                    <div className="referee-question">
                        {currentQuestion?.image && (
                            <img src={currentQuestion.image} alt="" className="referee-image" />
                        )}
                        {currentQuestion?.text && (
                            <div className="referee-text">{currentQuestion.text}</div>
                        )}
                    </div>

                    <div className="referee-answer">
                        {currentQuestion?.answer}
                        {currentQuestion?.possibleAnswers?.map((c) => ` / ${c}`)}
                    </div>

                    <div className="referee-actions">
                        <button
                            disabled={buttonsDisabled || duelPhase === "waiting" || duelPhase === "countdown"}
                            className="correct-btn"
                            onClick={handleCorrect}
                        >
                            Correcta
                        </button>

                        <button
                            disabled={buttonsDisabled || duelPhase === "waiting" || duelPhase === "countdown"}
                            className="pass-btn"
                            onClick={handlePass}
                        >
                            Pasar
                        </button>
                    </div>
                </>
            ) : room && connected ? (
                <>
                    <h2>ESPERANDO UN DUELO...</h2>
                </>
            ) : null}
        </main>
    );
}
