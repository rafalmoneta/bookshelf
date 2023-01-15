import type { QueryClient } from "@tanstack/react-query";

export default function updateCacheOnStatus({
  client,
  data,
  variables,
  status,
}: {
  client: QueryClient;
  data: { userId: string };
  variables: { bookId: number; startDate?: Date; finishDate?: Date | null };
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
      const startDate = variables.startDate ? variables.startDate : null;
      const finishDate = variables.finishDate;

      const oldStartDate = oldBook.book.readers[0]?.startDate;

      return {
        book: {
          // TODO: add type
          ...oldBook.book,
          ratings: !status ? [] : [...oldBook.book.ratings],
          readers: !status
            ? []
            : [
                {
                  status: status,
                  userId: data.userId,
                  startDate: startDate ? startDate : oldStartDate,
                  finishDate: finishDate,
                },
              ],
        },
      };
    }
  );
}
