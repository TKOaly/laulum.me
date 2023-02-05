import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Link } from "@/components/Link";

import { getTelegramLink } from "@/lib/shareLink";
import { getSong, getSongs } from "@/lib/songs";
import slugify from "@/lib/slugify";

export async function getStaticPaths() {
  const songs = await getSongs();
  const paths = songs.map(({ title }) => ({
    params: { slug: slugify(title) },
  }));
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const query = context.params?.slug;

  if (!query || query instanceof Array) {
    return { notFound: true };
  }

  const song = await getSong(query);

  if (song === null) {
    return { notFound: true };
  }

  return { props: { song } };
};

const SongPage = ({ song }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = `${song.title} | laulum.me`;

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
      </Head>

      <Header>
        <Link href="/" variant="primary">
          Back
        </Link>
        <Link
          href={getTelegramLink(song)}
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
          href={`https://github.com/TKOaly/laulum.me/edit/main/songs/${slugify(
            song.title
          )}.md`}
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
