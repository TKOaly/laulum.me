import type { InferGetStaticPropsType } from "next";

import Head from "next/head";
import { Merriweather } from "@next/font/google";

import {
  Icon,
  Link,
  Footer,
  Header,
  UpdateOverlay,
  SongList,
} from "@/components";

import { usePWAPrompt } from "@/lib/usePWAPrompt";
import { getSongs } from "@/lib/songs";

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

  return (
    <>
      <Head>
        <title>laulum.me | TKO-äly Songbook</title>

        <meta
          name="keywords"
          content="sitsit, laulu, sanat, lyrics, sitsilaulu, laulum.me, tko-äly, sitz, table party, academic table party, pöytäjuhla"
        />
        <meta name="description" content="Electronic Songbook by TKO-äly ry." />

        <meta name="og:title" content="laulum.me, the electronic songbook" />
        <meta name="og:type" content="website" />
        <meta
          name="og:image"
          content="https://laulum.me/icons/apple-touch-icon.png"
        />
        <meta name="og:url" content="https://laulum.me" />
        <meta name="og:description" content="TKO-äly's electronic songbook" />
        <meta name="og:site_name" content="laulum.me" />
      </Head>

      <Header>
        <div style={{ position: "relative" }}>
          <Icon style={promptVisible ? { filter: "blur(3px)" } : {}} />
          {promptVisible && <UpdateOverlay updateWorker={updateWorker} />}
        </div>
        <h1 className={merriweather.className}>laulum.me</h1>
      </Header>

      <div
        style={{
          height: "100vh",
        }}
      >
        <main>
          <SongList titles={titles} />
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
      </div>
    </>
  );
};

export default Index;
