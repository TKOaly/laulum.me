import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { createBrowserHistory } from "@remix-run/router";

import songsJson from "./songs.json";
import "./App.css";
import SongList from "./SongList";
import SongDetail from "./SongDetail";
import { Song } from "./types";

const songs = songsJson as Song[];

const history = createBrowserHistory();

history.listen(() => {
  window.scrollTo(0, 0);
});

function App() {
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
