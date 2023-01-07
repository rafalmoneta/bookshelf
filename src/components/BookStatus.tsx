import type { QueryClient } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";
import LikeButton from "./Elements/LikeButton";

function updateCache({
  client,
  data,
  variables,
  action,
}: {
  client: QueryClient;
  data: { userId: string };
  variables: { bookId: number };
  action: "like" | "unlike";
}) {
  client.setQueryData(
    [
      ["book", "getBook"],
      {
        input: {
          bookId: variables.bookId,
        },
        type: "query",
      },
    ],
    (oldBook) => {
      return {
        book: {
          // TODO: add type
          ...oldBook.book,
          likes: action === "like" ? [data.userId] : [],
        },
      };
    }
  );
}

const BookStatus = ({ book }: { book: any }) => {
  const client = useQueryClient();
  const likeMutation = trpc.book.likeBook.useMutation({
    onSuccess: (data, variables) =>
      updateCache({ client, data, variables, action: "like" }),
  }).mutateAsync;

  const unLikeMutation = trpc.book.unlikeBook.useMutation({
    onSuccess: (data, variables) =>
      updateCache({ client, data, variables, action: "unlike" }),
  }).mutateAsync;

  const isLiked = book.likes.length > 0;

  return (
    <div>
      <LikeButton
        isLiked={isLiked}
        onLike={() => likeMutation({ bookId: book.id })}
        onUnlike={() => unLikeMutation({ bookId: book.id })}
      />
    </div>
  );
};

export default BookStatus;
