import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MenuTheFloor } from "./components/MenuTheFloor";
import { Players } from "./components/Players";
import { Game } from "./components/Game";
import { Duel } from "./components/Duel";
import { Referee } from "./components/Referee";
import { MenuPapaCaliente } from "./components/MenuPapaCaliente";
import { Menu } from "./components/Menu";
import { GamePapaCaliente } from "./components/GamePapaCaliente";
import { PlayersPapaCaliente } from "./components/PlayersPapaCaliente";
import { DuelPapaCaliente } from "./components/DuelPapaCaliente";
import { Lobby } from "./components/Lobby";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Menu />} />
        <Route path="/players-papa-caliente" element={<PlayersPapaCaliente />} />
        <Route path="/papa-caliente" element={<GamePapaCaliente />} />
        <Route path="/menu-papa-caliente" element={<MenuPapaCaliente />} />
        <Route path="/menu-the-floor" element={<MenuTheFloor />} />
        <Route path="/players" element={<Players />} />
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
