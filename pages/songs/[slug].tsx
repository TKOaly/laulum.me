import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

import { Footer, Header, Link } from "@/components";

import { getSongLink } from "@/lib/getTelegramUrl";
import { getSong, getSongs } from "@/lib/serverSongs";
import slugify from "@/lib/slugify";
import { Song } from "@/types/song";
import { useEffect, useRef, useState } from "react";
import { getBookNames } from "@/lib/books";
import {
  readPersonalization,
  recordSongVisit,
  toggleSongFavorite,
  toggleSongHidden,
} from "@/lib/personalization";

import markdownStyles from "./markdown.module.css";

export async function getStaticPaths() {
  const songs = await getSongs();
  const paths = songs.map(({ title }) => ({
    params: { slug: slugify(title) },
  }));
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps<{
  song: Song & { filename: string };
  bookNames: string[] | null;
  markdownHtml: string;
}> = async (context) => {
  const query = context.params?.slug;

  if (!query || query instanceof Array) {
    return { notFound: true };
  }

  const song = await getSong(query);

  if (song === null) {
    return { notFound: true };
  }

  const bookNames = await getBookNames();

  const processedContent = await unified()
    .use(remarkGfm)
    .use(remarkParse)
    .use(remarkHtml)
    .process(song.lyrics);

  const markdownHtml = processedContent.toString();

  return { props: { markdownHtml, song, bookNames } };
};

const SongPage = ({
  song,
  bookNames,
  markdownHtml,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = `${song.title} | laulum.me`;
  const slug = slugify(song.title);
  const router = useRouter();

  const didInitialize = useRef(false);

  const [backPage, setBackPage] = useState("/");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isUserHidden, setIsUserHidden] = useState(false);

  useEffect(() => {
    if (!bookNames) return;

    const params = new URLSearchParams(window?.location.search);
    const book = params.get("book");

    if (!book) return;
    if (!bookNames.includes(book)) {
      console.error("Unknown book name provided to query string.");
      return;
    }
    setBackPage(`/book/${encodeURIComponent(book)}`);
  }, [setBackPage, bookNames]);

  useEffect(() => {
    if (didInitialize.current) {
      return;
    }

    didInitialize.current = true;

    const state = readPersonalization();
    const userHidden = Boolean(state.hidden[slug]);
    const hiddenByContent = Boolean(song.hidden);

    setIsFavorite(Boolean(state.favorites[slug]));
    setIsUserHidden(userHidden);

    if (userHidden || hiddenByContent) {
      const canContinue = window.confirm(
        "This song is hidden. Are you sure you want to view it?"
      );

      if (!canContinue) {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/");
        }
        return;
      }
    }

    recordSongVisit(slug);
  }, [router, slug, song.hidden]);

  const handleFavoriteClick = () => {
    const next = toggleSongFavorite(slug);
    setIsFavorite(Boolean(next.favorites[slug]));
  };

  const handleHiddenClick = () => {
    const next = toggleSongHidden(slug);
    setIsUserHidden(Boolean(next.hidden[slug]));
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={`${song.title} on laulum.me`} />
        <meta
          name="description"
          content={`Lyrics for ${song.title}${
            song.writers ? ` by ${song.writers}` : ""
          }`}
        />
        <meta
          name="keywords"
          content={`${song.title}, sitsit, laulu, sitsilaulu, sanat, lyrics, laulum.me, tko-äly, sitz, table party, academic table party, pöytäjuhla`}
        />

        <meta name="og:title" content={`♫ ${song.title}`} />
        <meta name="og:type" content="website" />
        <meta
          name="og:image"
          content="https://laulum.me/icons/apple-touch-icon.png"
        />
        <meta name="og:url" content={`https://laulum.me/songs/${slug}`} />
        <meta
          name="og:description"
          content={`Lyrics for the song ${song.title}.`}
        />
        <meta name="og:site_name" content="laulum.me" />
      </Head>

      <Header>
        <Link href={backPage} variant="primary">
          Back
        </Link>
        <Link
          href={getSongLink(song)}
          variant="telegram"
          target="_blank"
          rel="noreferrer noopener"
        >
          Share on Telegram
        </Link>
      </Header>

      <main>
        <>
          <h1>{song.title}</h1>
          {song.writers && (
            <em style={{ display: "block" }}>Written by {song.writers}</em>
          )}
          {song.melody && (
            <em style={{ display: "block" }}>Melody: {song.melody}</em>
          )}

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              marginBlock: "1rem",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={handleFavoriteClick}
              style={{
                border: "1px solid currentcolor",
                background: "transparent",
                borderRadius: "5pt",
                padding: "0.5rem 0.75rem",
                cursor: "pointer",
              }}
            >
              {isFavorite ? "Remove favorite" : "Add favorite"}
            </button>

            <button
              type="button"
              onClick={handleHiddenClick}
              style={{
                border: "1px solid currentcolor",
                background: "transparent",
                borderRadius: "5pt",
                padding: "0.5rem 0.75rem",
                cursor: "pointer",
              }}
            >
              {isUserHidden ? "Unhide song" : "Hide song"}
            </button>
          </div>

          <div
            className={markdownStyles.markdown}
            dangerouslySetInnerHTML={{ __html: markdownHtml }}
          />
        </>
      </main>

      <Footer>
        <Link
          href={`https://github.com/TKOaly/laulum.me/edit/main/songs/${song.filename}`}
          target="_blank"
          rel="noreferrer noopener"
          variant="secondary"
        >
          Suggest an edit to this song
        </Link>
      </Footer>
    </>
  );
};

export default SongPage;
