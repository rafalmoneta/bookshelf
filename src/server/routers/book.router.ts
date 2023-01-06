import { publicProcedure } from "./../trpc";
import {
  createBookHandler,
  getBookHandler,
  getBooksHandler,
  likeBookHandler,
} from "./../controllers/book.controller";
import {
  createBookSchema,
  filterBooksQuery,
  likeBookSchema,
  paramsBook,
} from "./../schema/book.schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const bookRouter = createTRPCRouter({
  createBook: protectedProcedure
    .input(createBookSchema)
    .mutation(({ input }) => createBookHandler({ input })),
  getBooks: publicProcedure
    .input(filterBooksQuery)
    .query(({ input }) => getBooksHandler({ filterQuery: input })),
  getBook: publicProcedure
    .input(paramsBook)
    .query(({ input, ctx }) => getBookHandler({ input, ctx })),
  likeBook: protectedProcedure
    .input(likeBookSchema)
    .mutation(({ input, ctx }) => likeBookHandler({ input, ctx })),
});
