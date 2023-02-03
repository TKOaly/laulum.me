import Head from "next/head";

import { Link } from "@/components/Link";
import slugify from "@/lib/slugify";
import songs from "@/public/songs.json";

import { Merriweather } from "@next/font/google";
import Logo from "@/components/Logo";
const merriweather = Merriweather({ subsets: ["latin"], weight: "400" });

const Index = () => {
  return (
    <>
      <Head>
        <title>laulum.me | TKO-äly Songbook</title>
      </Head>
      <header style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <h1 className={merriweather.className}>laulum.me</h1>
        <Logo style={{ marginLeft: "auto" }} />
      </header>
      <main>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          {songs.map((song) => (
            <Link
              key={song.id}
              href={`/songs/${slugify(song.title)}`}
              style={{ width: "100%" }}
            >
              {song.title}
            </Link>
          ))}
        </div>
      </main>
      <footer style={{ marginTop: "2rem", textAlign: "center" }}>
        <Link
          href="https://github.com/TKOaly/laulum.me"
          variant="primary"
          target="_blank"
          rel="noreferrer noopener"
        >
          Contribute a song on GitHub
        </Link>
      </footer>
    </>
  );
};

export default Index;
