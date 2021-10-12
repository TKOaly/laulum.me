import React from "react";
import { Helmet } from "react-helmet";

import slugify from "./slugify";

const tgShareLink = (url, song) => {
  // I'm not sure whether a limit exists on Telegram's side or not. Adjust as necessary.
  // Note: Some web servers refuse to deal with header lines longer than 4096 bytes if my memory serves me right.
  const CHARLIM = 9001;
  const stem = "https://t.me/share/url";
  const urlify = (text) => {
    return stem + "?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(text);
  }
  const head = song.melody ?
    song.name + "\n(melod. " + song.melody + ")" :
    song.name;
  const text = head + "\n\n" + song.lyrics;
  const full = urlify(text);
  if (full.length <= CHARLIM) {
    return full;
  }
  return urlify(head);
}

const SongDetail = (props) => {
  const slug = props.match.params.slug;
  const { songs, history } = props;
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
          <button className="dank" onClick={() => history.goBack()}>
            Back to all songs
          </button>
          <a className="tg-share-button" href={tgShareLink(document.location.href, song)} target="_blank" rel="noreferrer noopener">
            Share on Telegram
          </a>
          <h3>{title}</h3>
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
  );
};

export default SongDetail;
