import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="PropStack - Mapping the PropTech ecosystem" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
