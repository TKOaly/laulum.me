import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import ReactGA from "react-ga";

import songsJson from "./songs.json";
import "./App.css";
import SongList from "./SongList.tsx";
import SongDetail from "./SongDetail.tsx";
import { Song } from "./types";

const songs = songsJson as Song[];

const history = createBrowserHistory();

const GA_CODE = process.env.REACT_APP_GA_CODE;

if (GA_CODE) {
  ReactGA.initialize(GA_CODE, {});
}

const trackGa = (location) => {
  const completePath = location.pathname + location.search;

  if (GA_CODE) {
    ReactGA.pageview(completePath);
  }
};

// Send initial page load as pageview
trackGa(window.location);

history.listen((location) => {
  window.scrollTo(0, 0);
  if (GA_CODE) trackGa(location);
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="songs/:slug" element={<SongDetail songs={songs} />} />
          <Route path="/" element={<SongList songs={songs} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
