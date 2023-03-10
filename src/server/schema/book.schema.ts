import { z } from "zod";
import type { TypeOf } from "zod";

export const paramsBook = z.object({
  bookId: z.number(),
});

export const filterBooksQuery = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
  status: z.enum(["READING", "READ", "WANT_TO_READ"]).optional(),
});

export const createBookSchema = z.object({
  name: z.string({
    required_error: "Name of the book is required",
  }),
  author: z.string({
    required_error: "Author name is required",
  }),
  publisher: z.string().optional(),
  image: z.any(),
  description: z.string().optional(),
});

export const likeBookSchema = z.object({
  bookId: z.number({ required_error: "Book ID is required" }),
});

export const updateBookStatusSchema = z.object({
  bookId: z.number({ required_error: "Book ID is required" }),
  status: z.enum(["READING", "READ", "WANT_TO_READ"]),
  startDate: z.date().optional(),
  finishDate: z.date().nullable().optional(),
});

export const rateBookSchema = z.object({
  bookId: z.number({ required_error: "Book ID is required" }),
  rating: z.number({ required_error: "Rating is required" }), // 1-5
});

export type ParamsBookInput = TypeOf<typeof paramsBook>;
export type FilterBooksQuery = TypeOf<typeof filterBooksQuery>;
export type CreateBookInput = TypeOf<typeof createBookSchema>;
export type LikeBookInput = TypeOf<typeof likeBookSchema>;
export type UpdateBookStatusInput = TypeOf<typeof updateBookStatusSchema>;
export type RateBookInput = TypeOf<typeof rateBookSchema>;
