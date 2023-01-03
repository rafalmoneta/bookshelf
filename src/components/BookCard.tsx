import Image from "next/image";
import Link from "next/link";
import type { RouterOutputs } from "../utils/trpc";
// import StatusButtons from "./StatusButtons";

const BookCard = ({
  book,
}: {
  book: RouterOutputs["book"]["getBook"]["data"]["book"];
}) => {
  return (
    <div>
      <Link
        href={`/book/${book.id}`}
        aria-labelledby={`book-row-book-${book.id}`}
        className="flex gap-4 rounded-[20px] border-2 border-gray-800 p-6 py-4 hover:border-primary hover:no-underline"
      >
        <div className="relative w-[100px] md:w-[140px]">
          <Image
            src={book?.image}
            alt={`${book?.name} cover`}
            width={315}
            height={475}
            object-fit="contain"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex-1">
              <h2 className="m-0 text-lg font-semibold text-primary">
                {book.name}
              </h2>
              <div className="">
                <small className="mt-2 italic">{book.author}</small>
                {book?.publisher ? (
                  <>
                    <small className="mx-2"> - </small>
                    <small>{book.publisher}</small>
                  </>
                ) : null}
              </div>
              {/* RATING HERE */}
            </div>
          </div>
          <p className="mb-4 whitespace-pre-wrap pt-8 line-clamp-[5]">
            {book.description}
          </p>
        </div>
      </Link>
      {/* <div className="ml-5 absolute right-[-20px] text-gray flex flex-col justify-around h-full">
        <StatusButtons book={book} />
      </div> */}
    </div>
  );
};

export default BookCard;
