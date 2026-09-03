import { ErrorBoundary } from "@/components";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import Head from "next/head";

import "./app.css";
import "./markdown.css";


const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={roboto.className}>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </div>
    </>
  );
}
