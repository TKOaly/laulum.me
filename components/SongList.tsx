import Router from "next/router";
import { FormEvent, useCallback, useRef } from "react";

import { Input } from "./Input";
import { Link } from "./Link";

import { BaseSong, useSongs } from "@/lib/useSongs";

export type SongListProps = {
  songs: BaseSong[];
};

export const SongList = ({ songs }: SongListProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    query,
    setQuery,
    sortMode,
    setSortMode,
    showHidden,
    setShowHidden,
    visibleSongs,
    favoriteSongs,
    hasHydrated,
    hiddenCount,
  } = useSongs(songs);

  const scrollToInput = useCallback(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (visibleSongs.length === 0) {
        return;
      }

      Router.push(`/songs/${visibleSongs[0].slug}`);
    },
    [visibleSongs]
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          placeholder="Type song name and press enter/submit"
          value={query}
          onChange={({ target }) => setQuery(target.value)}
          onFocus={scrollToInput}
        />
      </form>

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        <label htmlFor="song-sort-mode">Sort:</label>
        <select
          id="song-sort-mode"
          value={sortMode}
          onChange={({ target }) =>
            setSortMode(
              target.value === "mostVisited" ? "mostVisited" : "alphabetical"
            )
          }
          disabled={!hasHydrated}
          style={{ padding: "0.25rem" }}
        >
          <option value="alphabetical">Alphabetical</option>
          <option value="mostVisited">Most visited</option>
        </select>

        <button
          type="button"
          onClick={() => setShowHidden(!showHidden)}
          style={{
            border: "1px solid currentcolor",
            borderRadius: "5pt",
            background: "transparent",
            padding: "0.5rem 0.75rem",
            cursor: "pointer",
          }}
        >
          {showHidden ? "Hide hidden songs" : `Show hidden (${hiddenCount})`}
        </button>
      </div>

      {favoriteSongs.length > 0 && (
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ marginBottom: "0.75rem" }}>Favorites</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            {favoriteSongs.map((song) => (
              <Link key={`favorite-${song.slug}`} href={`/songs/${song.slug}`}>
                {song.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {visibleSongs.length === 0 && <p>No songs found</p>}
        {visibleSongs.map((song) => (
          <Link key={song.slug} href={`/songs/${song.slug}`} style={{ width: "100%" }}>
            {song.title}
          </Link>
        ))}
      </div>
    </>
  );
};
