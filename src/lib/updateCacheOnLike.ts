import type { QueryClient } from "@tanstack/react-query";

export default function updateCacheOnLike({
  client,
  data,
  variables,
  action,
}: {
  client: QueryClient;
  data: { userId: string };
  variables: { bookId: number };
  action?: "like" | "unlike" | undefined;
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
          ...oldBook.book,
          likes: action === "like" ? [data.userId] : [],
        },
      };
    }
  );
}
