import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MenuJuego } from "./components/MenuJuego";
import { Players } from "./components/Players";
import { Game } from "./components/Game";
import { Duel } from "./components/Duel";
import { Referee } from "./components/Referee";
import { Menu } from "./components/Menu";
import { GamePapaCaliente } from "./components/GamePapaCaliente";
import { DuelPapaCaliente } from "./components/DuelPapaCaliente";
import { Lobby } from "./components/Lobby";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Menu />} />
        <Route path="/menu" element={<MenuJuego />} />
        <Route path="/players" element={<Players />} />
        <Route path="/papa-caliente" element={<GamePapaCaliente />} />
        <Route path="/game" element={<Game />} />
        <Route path="/duel" element={<Duel />} />
        <Route path="/duel-papa-caliente" element={<DuelPapaCaliente />} />
        <Route path="/referee" element={<Referee />} />
        <Route path="/lobby" element={<Lobby />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
