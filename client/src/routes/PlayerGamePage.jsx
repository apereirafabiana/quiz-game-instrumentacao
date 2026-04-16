import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DEFAULT_AVATAR } from "../../../shared/avatarOptions.js";
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

const CONNECTION_COPY = {
  connecting: {
    label: "Conectando",
    badgeClass: "border-sky-300/25 bg-sky-500/12 text-sky-50"
  },
  connected: {
    label: "Conectado",
    badgeClass: "border-emerald-300/25 bg-emerald-500/12 text-emerald-50"
  },
  reconnecting: {
    label: "Reconectando",
    badgeClass: "border-amber-300/25 bg-amber-500/12 text-amber-50"
  },
  offline: {
    label: "Sem conexão",
    badgeClass: "border-rose-300/25 bg-rose-500/12 text-rose-50"
  }
};

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

function ConnectionBadge({ status }) {
  const copy = CONNECTION_COPY[status] ?? CONNECTION_COPY.connecting;

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${copy.badgeClass}`}>
      {copy.label}
    </span>
  );
}

export default function PlayerGamePage() {
  const socket = useSocket();
  const navigate = useNavigate();
  const { roomCode } = useParams();
  const [playerSession, setPlayerSession] = useState(() => getPlayerSession());
  const [playerState, setPlayerState] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [roomErrorMessage, setRoomErrorMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [submissionErrorMessage, setSubmissionErrorMessage] = useState("");
  const [connectionStatus, setConnectionStatus] = useState(
    socket.connected ? "connected" : "connecting"
  );

  function persistPlayerSession(nextSession) {
    setPlayerSession((currentSession) => {
      if (
        currentSession?.roomCode === nextSession.roomCode &&
        currentSession?.playerId === nextSession.playerId &&
        currentSession?.name === nextSession.name &&
        currentSession?.avatar === nextSession.avatar
      ) {
        return currentSession;
      }

      return nextSession;
    });

    savePlayerSession(nextSession);
  }

  useEffect(() => {
    const savedSession = getPlayerSession();

    if (!savedSession || savedSession.roomCode !== roomCode) {
      navigate(`/join?room=${roomCode}`, { replace: true });
      return;
    }

    setPlayerSession(savedSession);
  }, [navigate, roomCode]);

  useEffect(() => {
    function handleConnect() {
      setConnectionStatus("connected");
    }

    function handleDisconnect() {
      setConnectionStatus("reconnecting");
    }

    function handleConnectError() {
      setConnectionStatus("offline");
    }

    function handleReconnectAttempt() {
      setConnectionStatus("reconnecting");
    }

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);
    socket.io.on("reconnect_attempt", handleReconnectAttempt);
    socket.io.on("reconnect_error", handleConnectError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
      socket.io.off("reconnect_attempt", handleReconnectAttempt);
      socket.io.off("reconnect_error", handleConnectError);
    };
  }, [socket]);

  useEffect(() => {
    if (!playerSession || playerSession.roomCode !== roomCode) {
      return undefined;
    }

    function syncAnswerState(nextState) {
      if (nextState.phase === "lobby") {
        setSelectedAnswer(null);
        setSubmissionStatus("idle");
        setSubmissionErrorMessage("");
        return;
      }

      if (nextState.player.hasAnsweredCurrentQuestion && nextState.answer) {
        setSelectedAnswer(nextState.answer.answerIndex);
        setSubmissionStatus("confirmed");
        setSubmissionErrorMessage("");
        return;
      }

      if (!nextState.player.hasAnsweredCurrentQuestion) {
        setSelectedAnswer(null);
        setSubmissionStatus("idle");
        setSubmissionErrorMessage("");
      }
    }

    function requestPlayerRestore() {
      socket.emit("join_room", {
        roomCode,
        name: playerSession.name,
        avatar: playerSession.avatar,
        playerId: playerSession.playerId
      });
    }

    function handleJoinSuccess(payload) {
      if (payload.roomCode !== roomCode) {
        return;
      }

      const nextSession = {
        roomCode: payload.roomCode,
        playerId: payload.playerId,
        name: payload.playerName,
        avatar: payload.playerAvatar
      };

      persistPlayerSession(nextSession);
      setRoomErrorMessage("");

      if (payload.playerState) {
        setPlayerState(payload.playerState);
        syncAnswerState(payload.playerState);
      }
    }

    function handlePlayerState(nextState) {
      if (nextState.roomCode !== roomCode) {
        return;
      }

      const knownPlayerId = playerSession?.playerId ?? getPlayerSession()?.playerId;

      if (knownPlayerId && nextState.player.id !== knownPlayerId) {
        return;
      }

      setPlayerState(nextState);
      setRoomErrorMessage("");
      syncAnswerState(nextState);

      const nextSession = {
        roomCode: nextState.roomCode,
        playerId: nextState.player.id,
        name: nextState.player.name,
        avatar: nextState.player.avatar
      };
      persistPlayerSession(nextSession);
    }

    function handleRoomError(payload) {
      setRoomErrorMessage(payload.message);

      if (["ROOM_NOT_FOUND", "ROOM_LOCKED", "PLAYER_NOT_FOUND"].includes(payload.code)) {
        clearPlayerSession();
        navigate(`/join?room=${roomCode}`, { replace: true });
      }
    }

    function handleAnswerReceived(payload) {
      if (payload.roomCode !== roomCode) {
        return;
      }

      setSelectedAnswer(payload.answerIndex ?? selectedAnswer);
      setSubmissionStatus("confirmed");
      setSubmissionErrorMessage("");
    }

    socket.on("connect", requestPlayerRestore);
    socket.on("join_success", handleJoinSuccess);
    socket.on("player_state", handlePlayerState);
    socket.on("room_error", handleRoomError);
    socket.on("answer_received", handleAnswerReceived);

    if (socket.connected) {
      requestPlayerRestore();
    }

    return () => {
      socket.off("connect", requestPlayerRestore);
      socket.off("join_success", handleJoinSuccess);
      socket.off("player_state", handlePlayerState);
      socket.off("room_error", handleRoomError);
      socket.off("answer_received", handleAnswerReceived);
    };
  }, [navigate, playerSession, roomCode, socket]);

  function sendAnswer(answerIndex) {
    if (!playerSession) {
      return;
    }

    if (!socket.connected) {
      setSubmissionStatus("error");
      setSubmissionErrorMessage("Você está sem conexão. Aguarde reconectar e tente novamente.");
      return;
    }

    setSelectedAnswer(answerIndex);
    setSubmissionStatus("sending");
    setSubmissionErrorMessage("");

    socket.timeout(4500).emit(
      "submit_answer",
      {
        roomCode,
        playerId: playerSession.playerId,
        answerIndex
      },
      (timeoutError, response) => {
        if (timeoutError) {
          setSubmissionStatus("error");
          setSubmissionErrorMessage(
            "Não conseguimos confirmar sua resposta a tempo. Toque em “Tentar reenviar”."
          );
          return;
        }

        if (!response?.ok) {
          setSubmissionStatus("error");
          setSubmissionErrorMessage(
            response?.message ?? "O envio falhou. Tente reenviar sua resposta."
          );
          return;
        }

        setSelectedAnswer(response.answer?.answerIndex ?? answerIndex);
        setSubmissionStatus("confirmed");
        setSubmissionErrorMessage("");
      }
    );
  }

  function handleSubmitAnswer(answerIndex) {
    if (
      !playerSession ||
      playerState?.player.hasAnsweredCurrentQuestion ||
      playerState?.phase === "answer_reveal" ||
      submissionStatus === "sending" ||
      submissionStatus === "confirmed"
    ) {
      return;
    }

    sendAnswer(answerIndex);
  }

  function handleRetryAnswer() {
    if (
      typeof selectedAnswer !== "number" ||
      !playerSession ||
      playerState?.player.hasAnsweredCurrentQuestion ||
      playerState?.phase !== "question"
    ) {
      return;
    }

    sendAnswer(selectedAnswer);
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
        <MobileLoading message="Conectando você ao quiz..." />
      </main>
    );
  }

  const isLastQuestion =
    playerState.question &&
    playerState.question.number === playerState.question.totalQuestions;
  const playerAvatar = playerState.player.avatar ?? DEFAULT_AVATAR;

  return (
    <main className="page-shell">
      {connectionStatus !== "connected" ? (
        <div className="fixed left-1/2 top-4 z-20 w-[92vw] max-w-lg -translate-x-1/2 rounded-2xl border border-amber-300/25 bg-amber-500/12 px-4 py-3 text-center text-sm text-amber-50 backdrop-blur-xl">
          {connectionStatus === "offline"
            ? "Sem conexão no momento. Vamos restaurar sua partida assim que a internet voltar."
            : "Reconectando ao quiz... Seu estado será restaurado automaticamente."}
        </div>
      ) : null}

      {playerState.phase === "lobby" ? (
        <section className="stage-wrap items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel mx-auto w-full max-w-lg p-6 sm:p-8"
          >
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[2rem] border border-white/10 bg-white/10 text-5xl shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
                {playerAvatar}
              </div>
              <div className="mt-5 flex items-center justify-center gap-3">
                <p className="muted-label">Aguardando início</p>
                <ConnectionBadge status={connectionStatus} />
              </div>
              <h1 className="headline-font mt-4 text-4xl font-black text-white">
                Olá, {playerState.player.name}
              </h1>
              <p className="mt-4 text-base text-slate-300">
                Você entrou na sala {playerState.roomCode}. Assim que o professor iniciar, a
                pergunta aparece aqui.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.7rem] border border-white/10 bg-slate-950/35 p-4 text-center">
                <p className="muted-label">Pontuação</p>
                <p className="mt-3 text-4xl font-black text-white">{playerState.player.score}</p>
              </div>
              <div className="rounded-[1.7rem] border border-white/10 bg-slate-950/35 p-4 text-center">
                <p className="muted-label">Jogadores online</p>
                <p className="mt-3 text-4xl font-black text-white">
                  {playerState.totalConnectedPlayers}
                </p>
              </div>
              <div className="rounded-[1.7rem] border border-white/10 bg-slate-950/35 p-4 text-center">
                <p className="muted-label">Tema</p>
                <p className="mt-3 text-sm font-black uppercase tracking-[0.15em] text-white">
                  {playerState.selectedTheme}
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      ) : null}

      {(playerState.phase === "question" || playerState.phase === "answer_reveal") &&
      playerState.question ? (
        <section className="stage-wrap items-center justify-center">
          <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
            <div className="glass-panel p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="player-badge">Sala {playerState.roomCode}</span>
                <div className="flex items-center gap-3">
                  <span className="player-badge">{playerState.player.score} pts</span>
                  <ConnectionBadge status={connectionStatus} />
                </div>
              </div>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
                  <span>
                    {playerAvatar} {playerState.player.name}
                  </span>
                  <span>
                    {playerState.answeredCount}/{playerState.totalConnectedPlayers} responderam
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
                  <span>Tema: {playerState.selectedTheme}</span>
                  <span>{playerState.player.position}º lugar</span>
                </div>
                {playerState.phase === "question" ? (
                  <TimerBar
                    deadlineAt={playerState.question.deadlineAt}
                    durationMs={playerState.question.durationMs}
                  />
                ) : null}
              </div>
            </div>

            <PlayerAnswerPanel
              question={playerState.question}
              hasAnswered={playerState.player.hasAnsweredCurrentQuestion}
              selectedAnswer={playerState.answer?.answerIndex ?? selectedAnswer}
              showCorrectAnswer={playerState.phase === "answer_reveal"}
              submissionStatus={submissionStatus}
              submissionErrorMessage={submissionErrorMessage}
              onSubmit={handleSubmitAnswer}
              onRetrySubmit={handleRetryAnswer}
            />
          </div>
        </section>
      ) : null}

      {playerState.phase === "ranking" ? (
        <RankingTransition
          ranking={playerState.ranking}
          playerId={playerState.player.id}
          autoAdvanceAt={playerState.transitionEndsAt}
          title={isLastQuestion ? "Ranking final da partida" : "Ranking parcial"}
          subtitle={
            isLastQuestion
              ? `Você terminou em ${playerState.player.position}º lugar com ${playerState.player.score} pontos.`
              : `Você está em ${playerState.player.position}º lugar com ${playerState.player.score} pontos.`
          }
        />
      ) : null}

      {playerState.phase === "final" ? (
        <FinalPodium ranking={playerState.ranking} playerId={playerState.player.id} />
      ) : null}

      {roomErrorMessage ? (
        <div className="fixed bottom-4 left-1/2 z-20 w-[92vw] max-w-lg -translate-x-1/2 rounded-2xl border border-rose-300/25 bg-rose-500/12 px-4 py-3 text-center text-sm text-rose-100 backdrop-blur-xl">
          {roomErrorMessage}
        </div>
      ) : null}
    </main>
  );
}
