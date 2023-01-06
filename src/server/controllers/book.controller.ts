import { prisma } from "./../utils/prisma";
import { TRPCError } from "@trpc/server";
import type {
  CreateBookInput,
  FilterBooksQuery,
  ParamsBookInput,
} from "../schema/book.schema";
import type { CreateContextOptions } from "../trpc";

export const createBookHandler = async ({
  input,
}: {
  input: CreateBookInput;
}) => {
  try {
    const book = await prisma.book.create({
      data: {
        name: input.name,
        author: input.author,
        publisher: input.publisher,
        image: input.image,
        description: input.description,
      },
    });

    return {
      status: "success",
      data: { book },
    };
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Book with that title already exists",
      });
    }
    throw err;
  }
};

export const getBooksHandler = async ({
  filterQuery,
}: {
  filterQuery: FilterBooksQuery;
}) => {
  try {
    const take = filterQuery.limit || 10;
    const skip = (filterQuery.page - 1) * take;

    const books = await prisma.book.findMany({ skip, take });

    if (!books) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Books where not found",
      });
    }

    return {
      status: "success",
      results: books.length,
      data: { books },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const getBookHandler = async ({
  input,
  ctx,
}: {
  input: ParamsBookInput;
  ctx: CreateContextOptions;
}) => {
  try {
    const user = ctx.session?.user;

    const book = await prisma.book.findFirst({
      where: {
        id: input.bookId,
      },
    });

    if (!book) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Book with that ID not found",
      });
    }

    return {
      status: "success",
      data: { book },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};
