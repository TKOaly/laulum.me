import Router from "next/router";
import { useMemo, useCallback } from "react";

import { extract, partial_ratio } from "fuzzball";

import { Input } from "./Input";
import { Link } from "./Link";

import useInput from "@/lib/useInput";
import slugify from "@/lib/slugify";

export type BookListProps = {
  titles: string[];
};

export const BookList = ({ titles }: BookListProps) => {
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

    const fuzzSortedBooks = extract(query, titles, {
      scorer: partial_ratio,
      cutoff: 40,
      limit: 15,
    }) as [string, number, number][];

    return fuzzSortedBooks.map(([title, score]) => ({ title, score }));
  }, [query, titles]);

  const handleSubmit = useCallback(() => {
    if (sortedTitles.length === 0) {
      return;
    }

    Router.push(`books/${slugify(sortedTitles[0].title)}`);
  }, [sortedTitles]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          placeholder="Type book name and press enter/submit"
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
        {sortedTitles.length === 0 && <p>No books found</p>}
        {sortedTitles.map(({ title, score }) => (
          <Link
            key={title}
            href={`/books/${slugify(title)}`}
            style={{ width: "100%", opacity: Math.max(score, 20) / 100 }}
          >
            {title}
          </Link>
        ))}
      </div>
    </>
  );
};
