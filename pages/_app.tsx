import type { AppProps } from "next/app";
import Head from "next/head";

import "@/lib/app.css";
import { Roboto } from "@next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={roboto.className}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
