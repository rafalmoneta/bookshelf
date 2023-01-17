import type { NextPage, GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import BookCard from "../components/BookCard";
import BookCardLoading from "../components/BookCardLoading";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";
import { authOptions } from "./api/auth/[...nextauth]";

const DiscoverPage: NextPage = () => {
  const { data, isLoading } = trpc.book.getBooks.useQuery({
    limit: 20,
    page: 1,
  });

  return (
    <>
      <Layout title="Discover Books - Fake Bookshelf">
        <div className="mb-16 pt-16 text-black dark:text-white xl:flex xl:w-full xl:items-center xl:justify-center">
          <div className="relative mx-auto w-full xl:max-w-[600px]">
            <div className="relative w-full max-w-[600px] xl:mx-auto">
              <h1 className="font-primary text-[35px] font-bold">
                Discover Books
              </h1>
              <p className="mt-8 text-lg leading-[32px]">
                Welcome to the Discover Book Section that helps users find new
                books to read. The section may also provide information about
                the books, such as a summary, reviews, and ratings. Users may be
                able to add books to a reading list or save them for later.
              </p>
            </div>
          </div>
          <div className="relaitve mx-auto mb-16 hidden w-full max-w-[580px] overflow-hidden rounded-[20px] xl:mx-8 xl:mb-0 xl:block">
            {/* TODO: add content or image */}
          </div>
        </div>
        {isLoading ? (
          <div className="mx-auto mt-8 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <li key={i} aria-label="Loading">
                <BookCardLoading />
              </li>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-8 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-2">
            {data?.data?.books.map((book) => (
              <li key={book.id} aria-label={book.name}>
                <BookCard key={book.id} book={book} />
              </li>
            ))}
          </div>
        )}
      </Layout>
    </>
  );
};

export default DiscoverPage;

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
