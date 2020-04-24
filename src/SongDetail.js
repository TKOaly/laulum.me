import React from "react";
import { Link } from "react-router-dom";
import slugify from "./slugify";

const SongDetail = (props) => {
  const slug = props.match.params.slug;
  const { songs } = props;
  const song = songs.find((s) => slugify(s.name) === slug);
  let key = 0;
  const lyrics = song.lyrics.split("\n").map((line) => {
    key++;
    return { line, key };
  });

  return (
    <div className="song-details">
      <div className="centered">
        <div className="lyrics">
          <Link to={"/"}>
            <button className="dank">Back to all songs</button>
          </Link>
          <h3>{song.name}</h3>
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
