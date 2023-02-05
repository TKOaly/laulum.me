import type { InferGetStaticPropsType } from "next";

import Head from "next/head";
import Router from "next/router";
import { Merriweather } from "@next/font/google";

import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { extract, partial_ratio } from "fuzzball";

import Icon from "@/components/Icon";
import { Input } from "@/components/Input";
import { Link } from "@/components/Link";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import { usePWAPrompt } from "@/lib/usePWAPrompt";
import { getSongs } from "@/lib/songs";
import slugify from "@/lib/slugify";
import { UpdateOverlay } from "@/components/UpdateOverlay";

const merriweather = Merriweather({ subsets: ["latin"], weight: "400" });

export async function getStaticProps() {
  const songs = await getSongs();
  return {
    props: { titles: songs.map(({ title }) => title) },
  };
}

const Index = ({ titles }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // PWA update prompting, song downloads
  const { promptVisible, updateWorker } = usePWAPrompt();

  // Search box
  const [query, setQuery] = useState("");
  const updateQuery = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setQuery(target.value);
    },
    [setQuery]
  );

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
      <Head>
        <title>laulum.me | TKO-äly Songbook</title>
      </Head>

      <Header>
        <div style={{ position: "relative" }}>
          <Icon style={promptVisible ? { filter: "blur(3px)" } : {}} />
          {promptVisible && <UpdateOverlay updateWorker={updateWorker} />}
        </div>
        <h1 className={merriweather.className}>laulum.me</h1>
      </Header>

      <main>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Type song name and press enter/submit"
            value={query}
            onChange={updateQuery}
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
      </main>

      <Footer style={{ textAlign: "center" }}>
        <Link
          href="https://github.com/TKOaly/laulum.me"
          variant="primary"
          target="_blank"
          rel="noreferrer noopener"
        >
          Contribute a song on GitHub
        </Link>
      </Footer>
    </>
  );
};

export default Index;
