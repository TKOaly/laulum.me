import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

import { Footer, Header, Link } from "@/components";

import { getSongLink } from "@/lib/getTelegramUrl";
import { getSong, getSongs } from "@/lib/songs";
import slugify from "@/lib/slugify";
import { Song } from "@/types/song";
import { useEffect, useState } from "react";
import { getBookNames } from "@/lib/books";

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

  return { props: { song, bookNames } };
};

const SongPage = ({
  song,
  bookNames,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = `${song.title} | laulum.me`;
  const slug = slugify(song.title);

  const [backPage, setBackPage] = useState("/");
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
  }, [setBackPage]);

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
        <h1>{song.title}</h1>
        {song.writers && (
          <em style={{ display: "block" }}>Written by {song.writers}</em>
        )}
        {song.melody && (
          <em style={{ display: "block" }}>Melody: {song.melody}</em>
        )}
        <pre
          style={{
            fontFamily: "Times New Roman, serif",
            maxWidth: "fit-content",
            whiteSpace: "pre-line",
            fontSize: "1.3rem",
            lineHeight: "2rem",
          }}
        >
          {song.lyrics}
        </pre>
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
