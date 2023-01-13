import type { QueryClient } from "@tanstack/react-query";

export default function updateCacheOnStatus({
  client,
  data,
  variables,
  status,
}: {
  client: QueryClient;
  data: { userId: string };
  variables: { bookId: number };
  status?: "READING" | "READ" | "WANT_TO_READ" | undefined;
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
          readers: !status ? [] : [{ status: status, userId: data.userId }],
        },
      };
    }
  );
}
