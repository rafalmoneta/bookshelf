import type { QueryClient } from "@tanstack/react-query";

export default function updateCacheOnRate({
  client,
  data,
  variables,
}: {
  client: QueryClient;
  data: { userId: string };
  variables: { bookId: number; rating: number };
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
          ratings: [{ userId: data.userId, rating: variables.rating }],
        },
      };
    }
  );
}
