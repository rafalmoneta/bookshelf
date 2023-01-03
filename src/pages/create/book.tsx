import type { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Layout from "../../components/Layout";

export default function AddBookPage() {
  return (
    <Layout title="Add Book - Fake Bookshelf">
      <div className="mb-16 pt-16 text-white xl:flex xl:w-full xl:justify-center">
        <div className="relative mx-auto w-full max-w-[600px]">
          <div className="relative mx-auto w-full max-w-[600px]">
            <h1 className="font-primary text-[35px] font-bold">
              Add a new book to bookshelf
            </h1>
            <p className="mt-8 text-lg leading-[32px]">
              You can create a new book by simply entering the title, author,
              and any other relevant information. You can then add the book to
              your library and mark it as read, liked, or score it based on your
              personal rating system.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

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
