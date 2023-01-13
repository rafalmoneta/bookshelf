import { useQueryClient } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";
import LikeButton from "./Elements/LikeButton";
import AddToListButton from "./Elements/AddToListButton";
import RemoveFromListButton from "./Elements/RemoveFromListButton";
import MarkAsReadButton from "./Elements/MarkAsReadButton";
import updateCacheOnLike from "../lib/updateCacheOnLike";
import updateCacheOnStatus from "../lib/updateCacheOnStatus";

const BookStatus = ({ book }: { book: any }) => {
  const client = useQueryClient();

  const likeMutation = trpc.book.likeBook.useMutation({
    onSuccess: (data, variables) =>
      updateCacheOnLike({ client, data, variables, action: "like" }),
  }).mutateAsync;

  const unLikeMutation = trpc.book.unlikeBook.useMutation({
    onSuccess: (data, variables) =>
      updateCacheOnLike({ client, data, variables, action: "unlike" }),
  }).mutateAsync;

  const addToReadingList = trpc.book.createBookStatus.useMutation({
    onSuccess: (data, variables) =>
      updateCacheOnStatus({ client, data, variables, status: "READING" }),
  }).mutateAsync;

  const removeFromReadingList = trpc.book.removeBookStatus.useMutation({
    onSuccess: (data, variables) =>
      updateCacheOnStatus({ client, data, variables }),
  }).mutateAsync;

  const markBookAsRead = trpc.book.updateBookStatus.useMutation({
    onSuccess: (data, variables) =>
      updateCacheOnStatus({
        client,
        data,
        variables,
        status: variables.status,
      }),
  }).mutateAsync;

  const isLiked = book.likes.length > 0;
  const isInTheList = book.readers.length > 0;
  const isReading = isInTheList && book.readers[0].status === "READING";
  const isRead = isInTheList && book.readers[0].status === "READ";

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
              markBookAsRead({ bookId: book.id, status: "READ" })
            }
            onUnMarkAsRead={() =>
              markBookAsRead({ bookId: book.id, status: "READING" })
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
          onAddToList={() => addToReadingList({ bookId: book.id })}
        />
      )}
    </div>
  );
};

export default BookStatus;
