import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

import type { Book } from "@/types/book";
import { getBook, getBookNames } from "@/lib/books";
import { getBookLink } from "@/lib/getTelegramUrl";
import { Link } from "@/components/Link";
import { Header } from "@/components/Header";
import slugify from "@/lib/slugify";
import React from "react";
import { BackButton } from "@/components/BackButton";
import { songExists } from "@/lib/songs";

export async function getStaticPaths() {
  const bookNames = await getBookNames();
  const paths = bookNames.map((name) => ({
    params: { name },
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps<{ book: Book }> = async (
  context
) => {
  const query = context.params?.name;

  if (!query || query instanceof Array) {
    return { notFound: true };
  }

  const book = await getBook(query);

  if (book === null) {
    return { notFound: true };
  }

  const songs = await Promise.all(
    book.songs.map(async (song) => {
      if (song.content || song.slug) {
        return song;
      }

      const slug = slugify(song.title);
      if (await songExists(slug)) {
        return { ...song, slug };
      }

      return song;
    })
  );

  return {
    props: {
      book: {
        ...book,
        songs,
      },
    },
  };
};

const BookPage = ({ book }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = `${book.title} | laulum.me`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={`${book.title} on laulum.me`} />
        <meta
          name="description"
          content={`View the contents of ${book.title}.`}
        />
        <meta
          name="keywords"
          content={`${book.title}, sitsit, laulu, sitsikirja, sanat, lyrics, laulum.me, tko-äly, sitz, table party, academic table party, pöytäjuhla, book`}
        />

        <meta name="og:title" content={book.title} />
        <meta name="og:type" content="website" />
        <meta
          name="og:image"
          content="https://laulum.me/icons/apple-touch-icon.png"
        />
        <meta name="og:url" content={`https://laulum.me/books/${book.name}`} />
        <meta
          name="og:description"
          content={`View the contents of ${book.title}.`}
        />
        <meta name="og:site_name" content="laulum.me" />
      </Head>

      <Header>
        <BackButton />
        <Link
          href={getBookLink(book)}
          variant="telegram"
          target="_blank"
          rel="noreferrer noopener"
        >
          Share on Telegram
        </Link>
      </Header>

      <main>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          {book.songs.map((song) => {
            const numberedTitle = `${song.number}: ${song.title}`;

            if (song.content) {
              return (
                <div
                  key={song.number}
                  style={{
                    padding: "1rem",
                    width: "calc(100% - 2rem)",
                  }}
                >
                  <p>{numberedTitle}</p>
                  <pre>{song.content}</pre>
                </div>
              );
            }

            if (song.slug) {
              return (
                <Link
                  key={song.number}
                  href={`/songs/${song.slug}`}
                  style={{ width: "100%" }}
                >
                  {numberedTitle}
                </Link>
              );
            }

            return (
              <div
                key={song.number}
                style={{
                  padding: "1rem",
                  width: "calc(100% - 2rem)",
                  border: "1px solid red",
                  borderRadius: "5pt",
                  background: "rgba(255, 0, 0, 0.25)",
                }}
              >
                {song.number}: {song.title}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default BookPage;
