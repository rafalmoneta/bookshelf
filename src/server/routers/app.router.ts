import { createTRPCRouter } from "../trpc";
import { bookRouter } from "./book.router";
import { exampleRouter } from "./example";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  book: bookRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
