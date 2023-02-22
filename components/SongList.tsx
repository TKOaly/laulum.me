import Router from "next/router";
import { useMemo, useCallback } from "react";

import { extract, partial_ratio } from "fuzzball";

import { Button } from "./Button";
import { Input } from "./Input";
import { Link } from "./Link";

import useInput from "@/lib/useInput";
import slugify from "@/lib/slugify";

export type SongListProps = {
  titles: string[];
};

export const SongList = ({ titles }: SongListProps) => {
  const {
    ref: inputRef,
    scrollTo: scrollToInput,
    query,
    updateQuery,
    clearQuery,
  } = useInput();

  const sortedTitles = useMemo(() => {
    if (query.trim().length === 0) {
      return titles.map((title) => ({ title, score: 100 }));
    }

    const fuzzSortedSongs = extract(query, titles, {
      scorer: partial_ratio,
      cutoff: 40,
      limit: 15,
    }) as [string, number, number][];

    return fuzzSortedSongs.map(([title, score]) => ({ title, score }));
  }, [query, titles]);

  const handleSubmit = useCallback(() => {
    if (sortedTitles.length === 0) {
      return;
    }

    Router.push(`songs/${slugify(sortedTitles[0].title)}`);
  }, [sortedTitles]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          placeholder="Type song name and press enter/submit"
          value={query}
          onChange={updateQuery}
          onFocus={scrollToInput}
        />
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {sortedTitles.length === 0 && (
          <div>
            <p>No songs found</p>
            <Button variant="secondary" onClick={clearQuery}>
              Clear search
            </Button>
          </div>
        )}
        {sortedTitles.map(({ title, score }) => (
          <Link
            key={title}
            href={`/songs/${slugify(title)}`}
            style={{ width: "100%", opacity: Math.max(score, 20) / 100 }}
          >
            {title}
          </Link>
        ))}
      </div>
    </>
  );
};
