import Image from "next/image";
import Link from "next/link";
import type { RouterOutputs } from "../utils/trpc";
import BookPlaceholder from "../../public/assets/book-placeholder.svg";
import { HeartFilledIcon } from "./Elements/Icons";

const BookCard = ({
  book,
}: {
  book: RouterOutputs["book"]["getBook"]["book"];
}) => {
  const isLiked = book.likes.length > 0;
  const likeCount = book._count.likes;

  return (
    <div>
      <Link
        href={`/book/${book.id}`}
        aria-labelledby={`book-row-book-${book.id}`}
        className="flex gap-4 rounded-[20px] border-2 border-gray-800 p-6 py-4 hover:border-primary hover:no-underline"
      >
        <div className="relative w-[100px] md:w-[140px]">
          <Image
            src={book?.image ? book.image : BookPlaceholder}
            alt={`${book?.name} cover`}
            width={315}
            height={475}
            object-fit="contain"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex-1">
              <h2 className="m-0 text-lg font-semibold text-primary line-clamp-1">
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
            <div className="">
              <div className="inline-flex items-center gap-1.5">
                {isLiked ? (
                  <HeartFilledIcon className="h-4 w-4 text-red-500" />
                ) : null}
                {/* <span className="text-sm font-semibold tabular-nums">
                  {likeCount}
                </span> */}
              </div>
            </div>
          </div>
          <p className="mb-4 whitespace-pre-wrap pt-8 line-clamp-[5]">
            {book.description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
