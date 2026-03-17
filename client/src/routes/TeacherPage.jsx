import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import FinalPodium from "../components/FinalPodium";
import LobbyScreen from "../components/LobbyScreen";
import QuestionDisplay from "../components/QuestionDisplay";
import RankingTransition from "../components/RankingTransition";
import useSocket from "../hooks/useSocket";
import { buildJoinUrl, formatJoinUrl, fetchServerMeta } from "../lib/api";
import {
  clearTeacherRoom,
  getTeacherRoom,
  saveTeacherRoom
} from "../lib/sessionStorage";

function LoadingStage({ message }) {
  return (
    <div className="stage-wrap items-center justify-center">
      <div className="glass-panel mx-auto max-w-xl p-8 text-center">
        <p className="muted-label">Quiz Arena</p>
        <h1 className="headline-font mt-4 text-4xl font-black text-white">{message}</h1>
      </div>
    </div>
  );
}

export default function TeacherPage() {
  const socket = useSocket();
  const [teacherState, setTeacherState] = useState(null);
  const [serverMeta, setServerMeta] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    fetchServerMeta()
      .then((meta) => {
        if (isMounted) {
          setServerMeta(meta);
        }
      })
      .catch(() => {
        if (isMounted) {
          setServerMeta(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    function requestTeacherRoom() {
      const savedRoomCode = getTeacherRoom();

      if (savedRoomCode) {
        socket.emit("restore_teacher", { roomCode: savedRoomCode });
        return;
      }

      socket.emit("create_room");
    }

    function handleTeacherState(nextState) {
      setTeacherState(nextState);
      setErrorMessage("");
      saveTeacherRoom(nextState.roomCode);
    }

    function handleRoomError(payload) {
      if (payload.code === "ROOM_NOT_FOUND" && getTeacherRoom()) {
        clearTeacherRoom();
        socket.emit("create_room");
        return;
      }

      setErrorMessage(payload.message);
    }

    socket.on("connect", requestTeacherRoom);
    socket.on("teacher_state", handleTeacherState);
    socket.on("room_created", handleTeacherState);
    socket.on("teacher_restored", handleTeacherState);
    socket.on("room_error", handleRoomError);

    if (socket.connected) {
      requestTeacherRoom();
    }

    return () => {
      socket.off("connect", requestTeacherRoom);
      socket.off("teacher_state", handleTeacherState);
      socket.off("room_created", handleTeacherState);
      socket.off("teacher_restored", handleTeacherState);
      socket.off("room_error", handleRoomError);
    };
  }, [socket]);

  const joinUrl = teacherState?.roomCode
    ? buildJoinUrl({
        roomCode: teacherState.roomCode,
        suggestedJoinBaseUrl: serverMeta?.suggestedJoinBaseUrl
      })
    : "";
  const visibleJoinUrl = formatJoinUrl(joinUrl);

  const networkHint = visibleJoinUrl
    ? `Se o QR não abrir, digite ${visibleJoinUrl} no celular. Professor e alunos precisam estar no mesmo Wi-Fi; se ainda falhar, libere a porta 5173 no firewall do Windows.`
    : "Professor e alunos precisam estar no mesmo Wi-Fi para entrar na sala em tempo real.";

  const isLastQuestion =
    teacherState?.question &&
    teacherState.question.number === teacherState.question.totalQuestions;

  function handleStartQuiz() {
    socket.emit("start_quiz", { roomCode: teacherState.roomCode });
  }

  function handleContinue() {
    socket.emit("next_question", { roomCode: teacherState.roomCode });
  }

  function handleSelectTheme(theme) {
    if (!teacherState || theme === teacherState.selectedTheme) {
      return;
    }

    socket.emit("set_quiz_theme", {
      roomCode: teacherState.roomCode,
      theme
    });
  }

  function handleRestart() {
    socket.emit("restart_quiz", { roomCode: teacherState.roomCode });
  }

  function handleNewRoom() {
    clearTeacherRoom();
    window.location.reload();
  }

  return (
    <main className="page-shell">
      {!teacherState ? (
        <LoadingStage message="Preparando a sala ao vivo..." />
      ) : (
        <AnimatePresence mode="wait">
          {teacherState.phase === "lobby" ? (
            <LobbyScreen
              key="lobby"
              roomCode={teacherState.roomCode}
              players={teacherState.players}
              connectedPlayersCount={teacherState.connectedPlayersCount}
              joinUrl={joinUrl}
              networkHint={networkHint}
              selectedTheme={teacherState.selectedTheme}
              availableThemes={teacherState.availableThemes}
              onSelectTheme={handleSelectTheme}
              onStartQuiz={handleStartQuiz}
              canStartQuiz={teacherState.canStartQuiz}
            />
          ) : null}

          {(teacherState.phase === "question" || teacherState.phase === "answer_reveal") &&
          teacherState.question ? (
            <QuestionDisplay
              key={`question-${teacherState.question.id}-${teacherState.phase}`}
              question={teacherState.question}
              answeredCount={teacherState.answeredCount}
              totalPlayers={teacherState.totalConnectedPlayers}
              selectedTheme={teacherState.selectedTheme}
              showCorrectAnswer={teacherState.phase === "answer_reveal"}
              onForceContinue={handleContinue}
            />
          ) : null}

          {teacherState.phase === "ranking" ? (
            <RankingTransition
              key={`ranking-${teacherState.roomCode}-${teacherState.question?.number ?? 0}`}
              ranking={teacherState.ranking}
              autoAdvanceAt={teacherState.transitionEndsAt}
              onContinue={handleContinue}
              showContinueButton
              title={isLastQuestion ? "Ranking final da partida" : "Ranking da rodada"}
              subtitle={
                isLastQuestion
                  ? "A classificação completa foi atualizada. O pódio final aparece a seguir."
                  : "A classificação parcial aparece depois da resposta correta e antes da próxima pergunta."
              }
            />
          ) : null}

          {teacherState.phase === "final" ? (
            <FinalPodium
              key={`final-${teacherState.roomCode}`}
              ranking={teacherState.ranking}
              onRestart={handleRestart}
              onNewRoom={handleNewRoom}
              showTeacherActions
            />
          ) : null}
        </AnimatePresence>
      )}

      {errorMessage ? (
        <div className="fixed bottom-4 left-1/2 z-20 w-[92vw] max-w-lg -translate-x-1/2 rounded-2xl border border-rose-300/25 bg-rose-500/12 px-4 py-3 text-center text-sm text-rose-100 backdrop-blur-xl">
          {errorMessage}
        </div>
      ) : null}
    </main>
  );
}