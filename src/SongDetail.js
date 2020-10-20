import React from "react";
import { Helmet } from "react-helmet";

import slugify from "./slugify";

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
