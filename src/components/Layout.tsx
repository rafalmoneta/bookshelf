import Head from "next/head";
import Header from "./Headers";

type LayoutProps = {
  title?: string;
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title ? title : "Fake Bookshelf"}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="px-6">
        <Header />
        <main className="mx-auto mt-[120px] max-w-[1200px] pb-12">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
