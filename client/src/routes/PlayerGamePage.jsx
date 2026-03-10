import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FinalPodium from "../components/FinalPodium";
import PlayerAnswerPanel from "../components/PlayerAnswerPanel";
import RankingTransition from "../components/RankingTransition";
import TimerBar from "../components/TimerBar";
import useSocket from "../hooks/useSocket";
import {
  clearPlayerSession,
  getPlayerSession,
  savePlayerSession
} from "../lib/sessionStorage";

function MobileLoading({ message }) {
  return (
    <div className="stage-wrap items-center justify-center">
      <div className="glass-panel mx-auto max-w-lg p-6 text-center">
        <p className="muted-label">Quiz Arena</p>
        <h1 className="headline-font mt-4 text-3xl font-black text-white">{message}</h1>
      </div>
    </div>
  );
}

export default function PlayerGamePage() {
  const socket = useSocket();
  const navigate = useNavigate();
  const { roomCode } = useParams();
  const [playerSession, setPlayerSession] = useState(() => getPlayerSession());
  const [playerState, setPlayerState] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedSession = getPlayerSession();

    if (!savedSession || savedSession.roomCode !== roomCode) {
      navigate(`/join?room=${roomCode}`, { replace: true });
      return;
    }

    setPlayerSession(savedSession);
  }, [navigate, roomCode]);

  useEffect(() => {
    if (!playerSession || playerSession.roomCode !== roomCode) {
      return undefined;
    }

    function requestPlayerRestore() {
      socket.emit("join_room", {
        roomCode,
        name: playerSession.name,
        playerId: playerSession.playerId
      });
    }

    function handleJoinSuccess(payload) {
      const nextSession = {
        roomCode: payload.roomCode,
        playerId: payload.playerId,
        name: payload.playerName
      };
      setPlayerSession(nextSession);
      savePlayerSession(nextSession);
    }

    function handlePlayerState(nextState) {
      if (nextState.roomCode !== roomCode || nextState.player.id !== playerSession.playerId) {
        return;
      }

      setPlayerState(nextState);
      setErrorMessage("");
      if (!nextState.player.hasAnsweredCurrentQuestion) {
        setSelectedAnswer(null);
      }
      savePlayerSession({
        roomCode: nextState.roomCode,
        playerId: nextState.player.id,
        name: nextState.player.name
      });
    }

    function handleRoomError(payload) {
      setErrorMessage(payload.message);

      if (["ROOM_NOT_FOUND", "ROOM_LOCKED", "PLAYER_NOT_FOUND"].includes(payload.code)) {
        clearPlayerSession();
        navigate(`/join?room=${roomCode}`, { replace: true });
      }
    }

    socket.on("connect", requestPlayerRestore);
    socket.on("join_success", handleJoinSuccess);
    socket.on("player_state", handlePlayerState);
    socket.on("room_error", handleRoomError);

    if (socket.connected) {
      requestPlayerRestore();
    }

    return () => {
      socket.off("connect", requestPlayerRestore);
      socket.off("join_success", handleJoinSuccess);
      socket.off("player_state", handlePlayerState);
      socket.off("room_error", handleRoomError);
    };
  }, [navigate, playerSession, roomCode, socket]);

  function handleSubmitAnswer(answerIndex) {
    if (!playerSession || playerState?.player.hasAnsweredCurrentQuestion) {
      return;
    }

    setSelectedAnswer(answerIndex);
    socket.emit("submit_answer", {
      roomCode,
      playerId: playerSession.playerId,
      answerIndex
    });
  }

  if (!playerSession || playerSession.roomCode !== roomCode) {
    return (
      <main className="page-shell">
        <MobileLoading message="Validando sua sala..." />
      </main>
    );
  }

  if (!playerState) {
    return (
      <main className="page-shell">
        <MobileLoading message="Conectando voce ao quiz..." />
      </main>
    );
  }

  return (
    <main className="page-shell">
      {playerState.phase === "lobby" ? (
        <section className="stage-wrap items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel mx-auto w-full max-w-lg p-6 sm:p-8"
          >
            <div className="text-center">
              <p className="muted-label">Aguardando inicio</p>
              <h1 className="headline-font mt-4 text-4xl font-black text-white">
                Ola, {playerState.player.name}
              </h1>
              <p className="mt-4 text-base text-slate-300">
                Voce entrou na sala {playerState.roomCode}. Assim que o professor iniciar, a pergunta aparece aqui.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.7rem] border border-white/10 bg-slate-950/35 p-4 text-center">
                <p className="muted-label">Sua pontuacao</p>
                <p className="mt-3 text-4xl font-black text-white">{playerState.player.score}</p>
              </div>
              <div className="rounded-[1.7rem] border border-white/10 bg-slate-950/35 p-4 text-center">
                <p className="muted-label">Jogadores online</p>
                <p className="mt-3 text-4xl font-black text-white">{playerState.totalConnectedPlayers}</p>
              </div>
            </div>
          </motion.div>
        </section>
      ) : null}

      {playerState.phase === "question" && playerState.question ? (
        <section className="stage-wrap items-center justify-center">
          <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
            <div className="glass-panel p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="player-badge">Sala {playerState.roomCode}</span>
                <span className="player-badge">{playerState.player.score} pts</span>
              </div>
              <div className="mt-4">
                <TimerBar
                  deadlineAt={playerState.question.deadlineAt}
                  durationMs={playerState.question.durationMs}
                />
              </div>
            </div>

            <PlayerAnswerPanel
              question={playerState.question}
              hasAnswered={playerState.player.hasAnsweredCurrentQuestion}
              selectedAnswer={
                playerState.answer?.answerIndex ?? selectedAnswer
              }
              onSubmit={handleSubmitAnswer}
            />
          </div>
        </section>
      ) : null}

      {playerState.phase === "ranking" ? (
        <RankingTransition
          ranking={playerState.ranking}
          playerId={playerState.player.id}
          autoAdvanceAt={playerState.transitionEndsAt}
          title="Ranking parcial"
          subtitle={`Voce esta em ${playerState.player.position} lugar com ${playerState.player.score} pontos.`}
        />
      ) : null}

      {playerState.phase === "final" ? (
        <FinalPodium ranking={playerState.ranking} playerId={playerState.player.id} />
      ) : null}

      {errorMessage ? (
        <div className="fixed bottom-4 left-1/2 z-20 w-[92vw] max-w-lg -translate-x-1/2 rounded-2xl border border-rose-300/25 bg-rose-500/12 px-4 py-3 text-center text-sm text-rose-100 backdrop-blur-xl">
          {errorMessage}
        </div>
      ) : null}
    </main>
  );
}
