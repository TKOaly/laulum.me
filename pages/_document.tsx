import { Html, Head, Main, NextScript } from "next/document";
import { basePath } from "@/next.config";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="keywords"
          content="sitsit, laulu, sitsilaulu, laulum.me, tko-äly, sitz, table party, academic table party, pöytäjuhla"
        />
        <link rel="icon" href={`${basePath}/favicon.ico`} sizes="any" />
        <link rel="icon" href={`${basePath}/icon.svg`} type="image/svg+xml" />
        <link
          rel="apple-touch-icon"
          href={`${basePath}/apple-touch-icon.png`}
        />
        <link rel="manifest" href={`${basePath}/manifest.json`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
