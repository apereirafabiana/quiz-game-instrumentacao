import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PlayerGamePage from "./routes/PlayerGamePage";
import PlayerJoinPage from "./routes/PlayerJoinPage";
import TeacherPage from "./routes/TeacherPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TeacherPage />} />
        <Route path="/join" element={<PlayerJoinPage />} />
        <Route path="/play/:roomCode" element={<PlayerGamePage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
