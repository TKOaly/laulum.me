import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import "./App.css";
import SongList from "./SongList";
import SongDetail from "./SongDetail";
import type { Song } from "./types";
import { useEffect, useState } from "react";

function App() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/songs.json")
      .then((res) => res.json())
      .then(setSongs);
  }, [setSongs]);

  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="songs/:slug" element={<SongDetail songs={songs} />} />
          <Route path="/" element={<SongList songs={songs} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
