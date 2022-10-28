import React, { useMemo, useState } from "react";
import { extract, partial_ratio } from "fuzzball";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import slugify from "./slugify";
import { Song } from "./types";

interface SongListProps {
  /** The list of songs to be listed in SongList */
  songs: Song[];
}

const SongList = (props: SongListProps) => {
  const { songs } = props;
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const searchIsEmpty = searchTerm.trim().length === 0;

  const sortedSongs = useMemo(() => {
    const fuzzSortedSongs = extract(searchTerm, songs, {
      scorer: partial_ratio,
      processor: (choice: Song) => choice.title,
      limit: searchIsEmpty ? undefined : 15,
    }) as [Song, number, number][];
    return fuzzSortedSongs;
  }, [songs, searchTerm, searchIsEmpty]);

  const handleSubmit = () => {
    if (sortedSongs.length === 0) {
      return;
    }
    navigate("songs/" + slugify(sortedSongs[0][0].title));
  };

  return (
    <div>
      <Helmet>
        <title>laulum.me</title>
      </Helmet>
      <div className="searchbar">
        <div className="input-group">
          <form onSubmit={handleSubmit}>
            <input
              className="form-control"
              placeholder="Type song name and press enter/submit"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </form>
        </div>
      </div>
      <div className="song-list">
        {sortedSongs.map(([song, score]) => (
          <Link to={"songs/" + slugify(song.title)} key={song.id}>
            <div
              className="song-card"
              style={!searchIsEmpty ? { opacity: score / 100 } : {}}
            >
              {song.title}
            </div>
          </Link>
        ))}
      </div>
      <div className="footer">
        <div className="footer-content">
          Want to add a song? Make a pull request!{" "}
          <a href="https://github.com/muhve/laulum.me/">
            github.com/muhve/laulum.me
          </a>
        </div>
      </div>
    </div>
  );
};

export default SongList;
