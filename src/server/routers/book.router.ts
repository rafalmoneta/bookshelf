import { createBookHandler } from "./../controllers/book.controller";
import { createBookSchema } from "./../schema/book.schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const bookRouter = createTRPCRouter({
  createBook: protectedProcedure
    .input(createBookSchema)
    .mutation(({ input }) => createBookHandler({ input })),
});
