import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { twMerge } from "tailwind-merge";
import updateCacheOnRate from "../lib/updateCacheOnRate";
import { trpc } from "../utils/trpc";
import { StarIcon } from "./Elements/Icons";

const visuallyHidden = "w-[1px] h-[1px] overflow-hidden absolute -inset-px";

type BookRatingProps = {
  bookId: number;
  bookRating: number | null;
};

const BookRating = ({ bookId, bookRating }: BookRatingProps) => {
  const client = useQueryClient();

  const rateBook = trpc.book.rateBook.useMutation({
    onSuccess: (data, variables) =>
      updateCacheOnRate({ client, data, variables }),
  }).mutateAsync;

  const rating = bookRating || 0;

  return (
    <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const ratingId = `rating-${i}`;
          const ratingValue = i + 1;

          return (
            <React.Fragment key={ratingId}>
              <label
                htmlFor={ratingId}
                className={twMerge(
                  "m-0 cursor-pointer",
                  ratingValue < rating ? "text-yellow-400" : "text-gray-300"
                )}
              >
                <input
                  type="radio"
                  name="rating"
                  id={ratingId}
                  value={ratingValue}
                  checked={ratingValue === rating}
                  onChange={() => rateBook({ bookId, rating: ratingValue })}
                  className={twMerge(
                    visuallyHidden,
                    "peer checked:bg-yellow-400"
                  )}
                />
                <span className={twMerge(visuallyHidden)}>
                  {ratingValue} {ratingValue === 1 ? "star" : "stars"}
                </span>
                <StarIcon className="h-6 w-6 fill-transparent peer-checked:fill-yellow-400 peer-checked:text-yellow-400" />
              </label>
            </React.Fragment>
          );
        })}
      </div>
      <div className="mx-2 text-gray-500">-</div>
    </div>
  );
};

export default BookRating;
