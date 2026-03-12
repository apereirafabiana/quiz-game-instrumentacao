import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import { getPlayerSession, savePlayerSession } from "../lib/sessionStorage";

export default function PlayerJoinPage() {
  const socket = useSocket();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const savedSession = getPlayerSession();
  const initialRoomCode = searchParams.get("room")?.toUpperCase() ?? "";

  const [roomCode, setRoomCode] = useState(
    savedSession?.roomCode === initialRoomCode ? savedSession.roomCode : initialRoomCode
  );
  const [name, setName] = useState(savedSession?.name ?? "");
  const [joining, setJoining] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    function handleJoinSuccess(payload) {
      savePlayerSession({
        roomCode: payload.roomCode,
        playerId: payload.playerId,
        name: payload.playerName
      });
      setJoining(false);
      navigate(`/play/${payload.roomCode}`, { replace: true });
    }

    function handleJoinError(payload) {
      setJoining(false);
      setErrorMessage(payload.message);
    }

    socket.on("join_success", handleJoinSuccess);
    socket.on("room_error", handleJoinError);

    return () => {
      socket.off("join_success", handleJoinSuccess);
      socket.off("room_error", handleJoinError);
    };
  }, [navigate, socket]);

  function handleSubmit(event) {
    event.preventDefault();

    const normalizedRoomCode = roomCode.trim().toUpperCase();
    const normalizedName = name.trim();

    if (!normalizedRoomCode) {
      setErrorMessage("Informe o codigo da sala.");
      return;
    }

    if (!normalizedName) {
      setErrorMessage("Informe seu nome ou apelido.");
      return;
    }

    setJoining(true);
    setErrorMessage("");

    socket.emit("join_room", {
      roomCode: normalizedRoomCode,
      name: normalizedName,
      playerId:
        savedSession?.roomCode === normalizedRoomCode ? savedSession.playerId : null
    });
  }

  return (
    <main className="page-shell">
      <section className="stage-wrap items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel mx-auto w-full max-w-lg overflow-hidden p-6 sm:p-8"
        >
          <div className="text-center">
            <p className="muted-label">Entrada do aluno</p>
            <h1 className="headline-font mt-4 text-4xl font-black text-white sm:text-5xl">
              Entre na sala
            </h1>
            <p className="mt-4 text-base text-slate-300">
              Digite o codigo exibido no telao e escolha um nome rapido para participar. Emojis tambem sao aceitos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="roomCode" className="muted-label">
                Codigo da sala
              </label>
              <input
                id="roomCode"
                value={roomCode}
                onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
                className="input-field mt-2 text-center text-2xl font-black tracking-[0.35em]"
                maxLength={5}
                placeholder="ABCDE"
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="name" className="muted-label">
                Nome ou apelido
              </label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="input-field mt-2"
                maxLength={24}
                placeholder="Ex.: Joao 🔧, Maria ⚙️"
                autoComplete="nickname"
              />
            </div>

            <button type="submit" disabled={joining} className="primary-button mt-4 w-full">
              {joining ? "Entrando..." : "Entrar no quiz"}
            </button>
          </form>

          {errorMessage ? (
            <div className="mt-4 rounded-2xl border border-rose-300/25 bg-rose-500/12 px-4 py-3 text-sm text-rose-100">
              {errorMessage}
            </div>
          ) : null}
        </motion.div>
      </section>
    </main>
  );
}