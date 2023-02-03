import type { GetStaticProps, NextPage } from "next";
import type { Song } from "@/lib/song";
import Head from "next/head";
import slugify from "@/lib/slugify";
import { getTelegramLink } from "@/lib/shareLink";
import { Link } from "@/components/Link";
import Logo from "@/components/Logo";
import songs from "@/public/songs.json";

export async function getStaticPaths() {
  const paths = songs.map(({ title }) => {
    const slug = slugify(title);
    return { params: { slug } };
  });
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps<{ song?: Song }> = (context) => {
  const slug = context.params?.slug;
  const song = songs.find(({ title }) => slugify(title) === slug);
  return { props: { song } };
};

const SongPage: NextPage<{ song: Song }> = ({ song }) => {
  return (
    <>
      <Head>
        <title>{song.title} | laulum.me</title>
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
        {song.writers && <p>Written by {song.writers}</p>}
        {song.melody && <p>Melody: {song.melody}</p>}
        <pre
          style={{
            maxWidth: "fit-content",
            whiteSpace: "pre-line",
            fontSize: "1.25rem",
          }}
        >
          {song.lyrics}
        </pre>
      </main>
      <footer style={{ marginTop: "2rem" }}>
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
      </footer>
    </>
  );
};

export default SongPage;
