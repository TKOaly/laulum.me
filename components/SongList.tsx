import Router from "next/router";
import { useMemo, useCallback, useState } from "react";

import { extract, partial_ratio } from "fuzzball";

import { Input } from "./Input";
import { Link } from "./Link";

import useInput from "@/lib/useInput";
import slugify from "@/lib/slugify";

import staticData from "@/staticData.json";

export type SongListProps = {
  titles: string[];
  tagToTitlesMap: Record<string, string[]>
};

export const SongList = ({ titles, tagToTitlesMap }: SongListProps) => {
  const {
    ref: inputRef,
    scrollTo: scrollToInput,
    query,
    updateQuery,
    clearQuery,
  } = useInput();

  // State for toggled tags (multi-select)
  const [toggledTags, setToggledTags] = useState<string[]>([]);

  // Type declaration for songTags
  const songTags: string[] = staticData.songTags;

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

  // Handler for toggling tag button
  const handleToggleTag = (tag: string) => {
    setToggledTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Handler for dropdown selection
  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tag = e.target.value;
    if (tag && !toggledTags.includes(tag)) {
      setToggledTags(prev => [...prev, tag]);
    }
  };

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

        {/* Tag dropdown menu */}
        <div style={{ margin: "1em 0" }}>
          <label htmlFor="tag-dropdown" style={{ marginRight: "0.5em" }}>
            Add tag:
          </label>
          <select
            id="tag-dropdown"
            defaultValue=""
            onChange={handleDropdownChange}
            style={{ marginRight: "1em" }}
          >
            <option value="">Select a tag</option>
            {songTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        {/* Show all toggled tags as buttons, allow deselect */}
        {toggledTags.length > 0 && (
          <div style={{ marginBottom: "1em" }}>
            {toggledTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => handleToggleTag(tag)}
                style={{
                  marginRight: "0.5em",
                  background: "#FFF500",
                  color: "#000000",
                  borderRadius: "12px",
                  border: "1px solid #6f6f6f",
                  cursor: "pointer"
                }}
              >
                {tag} ✕
              </button>
            ))}
          </div>
        )}
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {sortedTitles.length === 0 && <p>No songs found</p>}
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
