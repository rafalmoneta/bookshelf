import type { GetServerSideProps } from "next";
import type { RouterOutputs } from "../../../utils/trpc";
import { unstable_getServerSession } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import { authOptions } from "../../api/auth/[...nextauth]";
import Layout from "../../../components/Layout";
import BookPlaceholder from "../../../../public/assets/book-placeholder.svg";
import BookStatus from "../../../components/BookStatus";

export default function BookPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isError, isLoading } = trpc.book.getBook.useQuery({
    bookId: Number(id),
  });

  const book = data?.book as RouterOutputs["book"]["getBook"]["book"];

  // console.log(JSON.stringify(book));

  // TODO: Do better loading
  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <Layout title="Home - Fake Bookshelf">
      <div className="mx-auto mb-4 grid max-w-[900px] grid-cols-1 gap-8 pt-16 dark:text-white lg:grid-cols-[1fr_2fr]">
        <div className="relative mx-auto h-[475px] w-full max-w-[315px]">
          <Image
            src={book?.image ? book.image : BookPlaceholder}
            alt={`${book?.name} cover`}
            object-fit="contain"
            fill
          />
        </div>
        <div>
          <div className="relative flex">
            <div className="flex-1 justify-between">
              <h1 className="text-[35px] font-bold">{book?.name}</h1>
              <div>
                <i>{book?.author ? book.author : "Unknown"}</i>
                <span className="mx-2">|</span>
                <i>
                  {book?.publisher ? book.publisher : "Publisher Not Specified"}
                </i>
              </div>
            </div>
            <div className="text-gray flex p-2">
              <BookStatus book={book} />
            </div>
          </div>
          <div className="mt-2 min-h-[50px]">{/* TODO: */}</div>
          <br />
          <p className="block whitespace-pre-wrap">{book?.description}</p>
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
