import type { NextPage, GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import BookCard from "../components/BookCard";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";
import { authOptions } from "./api/auth/[...nextauth]";

const Home: NextPage = () => {
  const { data } = trpc.book.getBooks.useQuery({ limit: 10, page: 1 });

  return (
    <>
      <Layout title="Home - Fake Bookshelf">
        <div className="mb-16 pt-16 text-black dark:text-white xl:flex xl:w-full xl:items-center xl:justify-center">
          <div className="relative mx-auto w-full xl:max-w-[600px]">
            <div className="relative w-full max-w-[600px] xl:mx-auto">
              <h1 className="font-primary text-[35px] font-bold">
                Fake Bookshelf
              </h1>
              <p className="mt-8 text-lg leading-[32px]">
                Welcome to the Book Manager! With this application, you can
                easily keep track of your reading progress and organize your
                books in one convenient place.
              </p>
              <p className="mt-8 text-lg leading-[32px]">
                Whether you&apos;re an avid reader looking to keep track of your
                progress, or just want a simple way to organize your books, the
                Book Manager has got you covered. Give it a try and start
                managing your books today!
              </p>
            </div>
          </div>
          <div className="relaitve mx-auto mb-16 hidden w-full max-w-[580px] overflow-hidden rounded-[20px] xl:mx-8 xl:mb-0 xl:block">
            {/* TODO: add content or image */}
          </div>
        </div>
        <h2 className="font-primary text-[35px] font-bold leading-[150%] text-black dark:text-white">
          Reading List
        </h2>
        <div className="mx-auto mt-8 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-2">
          {data?.data?.books.map((book) => (
            <li key={book.id} aria-label={book.name}>
              <BookCard key={book.id} book={book} />
            </li>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
