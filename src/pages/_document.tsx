import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="dark scroll-smooth">
        <Head>
          <meta name="msapplication-TileColor" content="#000000" />
        </Head>
        <body className="bg-white text-black antialiased dark:bg-ourblack dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
