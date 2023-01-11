import { publicProcedure } from "./../trpc";
import {
  createBookHandler,
  createBookStatusHandler,
  getBookHandler,
  getBooksHandler,
  likeBookHandler,
  removeBookStatusHandler,
  unlikeBookHandler,
  updateBookStatusHandler,
} from "./../controllers/book.controller";
import {
  createBookSchema,
  filterBooksQuery,
  likeBookSchema,
  paramsBook,
  updateBookStatusSchema,
} from "./../schema/book.schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const bookRouter = createTRPCRouter({
  createBook: protectedProcedure
    .input(createBookSchema)
    .mutation(({ input }) => createBookHandler({ input })),
  getBooks: publicProcedure
    .input(filterBooksQuery)
    .query(({ input, ctx }) => getBooksHandler({ filterQuery: input, ctx })),
  getBook: publicProcedure
    .input(paramsBook)
    .query(({ input, ctx }) => getBookHandler({ input, ctx })),
  likeBook: protectedProcedure
    .input(likeBookSchema)
    .mutation(({ input, ctx }) => likeBookHandler({ input, ctx })),
  unlikeBook: protectedProcedure
    .input(likeBookSchema)
    .mutation(({ input, ctx }) => unlikeBookHandler({ input, ctx })),
  createBookStatus: protectedProcedure
    .input(likeBookSchema)
    .mutation(({ input, ctx }) => createBookStatusHandler({ input, ctx })),
  updateBookStatus: protectedProcedure
    .input(updateBookStatusSchema)
    .mutation(({ input, ctx }) => updateBookStatusHandler({ input, ctx })),
  removeBookStatus: protectedProcedure
    .input(likeBookSchema)
    .mutation(({ input, ctx }) => removeBookStatusHandler({ input, ctx })),
});
