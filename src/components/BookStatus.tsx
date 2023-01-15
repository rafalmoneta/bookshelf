import type { RouterOutputs } from "../utils/trpc";
import { trpc } from "../utils/trpc";
import { useQueryClient } from "@tanstack/react-query";
import LikeButton from "./Elements/LikeButton";
import AddToListButton from "./Elements/AddToListButton";
import RemoveFromListButton from "./Elements/RemoveFromListButton";
import MarkAsReadButton from "./Elements/MarkAsReadButton";
import updateCacheOnLike from "../lib/updateCacheOnLike";
import updateCacheOnStatus from "../lib/updateCacheOnStatus";

const BookStatus = ({
  book,
}: {
  book: RouterOutputs["book"]["getBook"]["book"];
}) => {
  const client = useQueryClient();
  const today = new Date();

  // TODO: Investiage if I should move these functions to buttons
  // to keep them closer to the source (?)
  const likeMutation = trpc.book.likeBook.useMutation({
    onSuccess: (data, variables) =>
      updateCacheOnLike({ client, data, variables, action: "like" }),
  }).mutateAsync;

  const unLikeMutation = trpc.book.unlikeBook.useMutation({
    onSuccess: (data, variables) =>
      updateCacheOnLike({ client, data, variables, action: "unlike" }),
  }).mutateAsync;

  const { mutate: addToReadingList } = trpc.book.createBookStatus.useMutation({
    onSuccess: (data, variables) =>
      updateCacheOnStatus({ client, data, variables, status: "READING" }),
  });

  const { mutate: removeFromReadingList } =
    trpc.book.removeBookStatus.useMutation({
      onSuccess: (data, variables) =>
        updateCacheOnStatus({ client, data, variables }),
    });

  const { mutate: markBookAsRead } = trpc.book.updateBookStatus.useMutation({
    onSuccess: (data, variables) =>
      updateCacheOnStatus({
        client,
        data,
        variables,
        status: variables.status,
      }),
  });

  const isLiked = book.likes.length > 0;
  const isInTheList = book.readers.length > 0;
  const isRead = isInTheList && book?.readers[0]?.status === "READ";

  return (
    <div>
      <LikeButton
        isLiked={isLiked}
        onLike={() => likeMutation({ bookId: book.id })}
        onUnlike={() => unLikeMutation({ bookId: book.id })}
      />
      {isInTheList ? (
        <>
          <MarkAsReadButton
            isInTheList={isInTheList}
            isRead={isRead}
            onMarkAsRead={() =>
              markBookAsRead({
                bookId: book.id,
                status: "READ",
                finishDate: today,
              })
            }
            onUnMarkAsRead={() =>
              markBookAsRead({
                bookId: book.id,
                status: "READING",
                finishDate: null,
              })
            }
          />
          <RemoveFromListButton
            isInTheList={isInTheList}
            onRemoveFromList={() => removeFromReadingList({ bookId: book.id })}
          />
        </>
      ) : (
        <AddToListButton
          isInTheList={isInTheList}
          onAddToList={() =>
            addToReadingList({
              bookId: book.id,
              startDate: today,
              status: "READING",
            })
          }
        />
      )}
    </div>
  );
};

export default BookStatus;
