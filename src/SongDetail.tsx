import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";

import slugify from "./slugify.tsx";
import { Song } from "./types";

const tgShareLink = (url: string, song: Song) => {
  // I'm not sure whether a limit exists on Telegram's side or not. Adjust as necessary.
  // Note: Some web servers refuse to deal with header lines longer than 4096 bytes if my memory serves me right.
  const CHARLIM = 9001;
  const stem = "https://t.me/share/url";
  const urlify = (text) => {
    return (
      stem +
      "?url=" +
      encodeURIComponent(url) +
      "&text=" +
      encodeURIComponent(text)
    );
  };
  const head = song.melody
    ? song.name + "\n(melod. " + song.melody + ")"
    : song.name;
  const text = head + "\n\n" + song.lyrics;
  const full = urlify(text);
  if (full.length <= CHARLIM) {
    return full;
  }
  return urlify(head);
};

interface SongDetailProps {
  songs: Song[]
}

const SongDetail = (props: SongDetailProps) => {
  const navigate = useNavigate()
  const params = useParams();
  const { slug } = params;
  const { songs } = props;
  const song = songs.find((s) => slugify(s.name) === slug);
  let title = "404 Song not found";
  let lyrics = [];

  if (song) {
    title = song.name;
    let key = 0;
    lyrics = song.lyrics.split("\n").map((line) => {
      key++;
      return { line, key };
    });
  }

  return (
    <div className="song-details">
      <Helmet>
        <title>laulum.me | {title}</title>
      </Helmet>
      <div className="centered">
        <div className="lyrics">
          <button className="dank" onClick={() => navigate(-1)}>
            Back to all songs
          </button>
          <a
            className="tg-share-button"
            href={tgShareLink(document.location.href, song)}
            target="_blank"
            rel="noreferrer noopener"
          >
            Share on Telegram
          </a>
          <div className="song-content">
            <h3>{title}</h3>
            <div className="song-info">
              {song.melody ? `melody: ${song.melody}` : null}
              {song.melody ? <br /> : null}

              {song.lyricsBy ? `lyrics by: ${song.lyricsBy}` : null}
            </div>
            <p>
              {lyrics.map(function (line) {
                return (
                  <span key={line.key}>
                    {line.line}
                    <br />
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetail;
