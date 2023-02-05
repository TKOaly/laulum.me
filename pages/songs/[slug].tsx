import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import type { Song } from "@/types/song";
import Head from "next/head";
import { getTelegramLink } from "@/lib/shareLink";
import { Link } from "@/components/Link";
import Logo from "@/components/Logo";
import { getSong, getSongs } from "@/lib/songs";

export async function getStaticPaths() {
  const songs = await getSongs();
  const paths = songs.map(({ slug }) => ({ params: { slug } }));
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
      <header style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
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
        <Logo style={{ marginLeft: "auto" }} />
      </header>
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
      <footer style={{ marginBlock: "2rem" }}>
        <Link
          href={`https://github.com/TKOaly/laulum.me/edit/main/songs/${song.slug}.md`}
          target="_blank"
          rel="noreferrer noopener"
          variant="secondary"
        >
          Suggest an edit to this song
        </Link>
      </footer>
    </>
  );
};

export default SongPage;
