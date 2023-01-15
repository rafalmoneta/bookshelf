import { prisma } from "./../utils/prisma";
import { TRPCError } from "@trpc/server";
import type {
  CreateBookInput,
  FilterBooksQuery,
  LikeBookInput,
  ParamsBookInput,
  RateBookInput,
  UpdateBookStatusInput,
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
  ctx,
}: {
  filterQuery: FilterBooksQuery;
  ctx: CreateContextOptions;
}) => {
  try {
    const take = filterQuery.limit || 10;
    const skip = (filterQuery.page - 1) * take;
    const user = ctx.session?.user;

    const books = await prisma.book.findMany({
      skip,
      take,
      include: {
        likes: {
          where: {
            userId: user?.id,
          },
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    if (!books) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Books where not found",
      });
    }

    return {
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
      include: {
        likes: {
          where: {
            userId: user?.id,
          },
          select: {
            userId: true,
          },
        },
        readers: {
          where: {
            userId: user?.id,
          },
          select: {
            userId: true,
            status: true,
            createdAt: true,
            startDate: true,
            finishDate: true,
          },
        },
        ratings: {
          where: {
            userId: user?.id,
          },
          select: {
            userId: true,
            rating: true,
          },
        },
        _count: {
          select: {
            likes: true,
            ratings: true,
          },
        },
      },
    });

    const aggregateRating = await prisma.bookRating.aggregate({
      where: {
        bookId: input.bookId,
      },
      _avg: {
        rating: true,
      },
    });

    if (!book) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Book with that ID not found",
      });
    }

    return {
      book: {
        ...book,
        aggregateRating: aggregateRating._avg.rating,
      },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const likeBookHandler = async ({
  input,
  ctx,
}: {
  input: LikeBookInput;
  ctx: CreateContextOptions;
}) => {
  try {
    const user = ctx.session?.user;

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authorized",
      });
    }

    return await prisma.bookLike.create({
      data: {
        bookId: input.bookId,
        userId: user.id,
      },
    });
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const unlikeBookHandler = async ({
  input,
  ctx,
}: {
  input: LikeBookInput;
  ctx: CreateContextOptions;
}) => {
  try {
    const user = ctx.session?.user;

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authorized",
      });
    }

    return await prisma.bookLike.delete({
      where: {
        bookId_userId: {
          bookId: input.bookId,
          userId: user.id,
        },
      },
    });
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const createBookStatusHandler = async ({
  input,
  ctx,
}: {
  input: UpdateBookStatusInput;
  ctx: CreateContextOptions;
}) => {
  try {
    const user = ctx.session?.user;

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authorized",
      });
    }

    return await prisma.bookRead.create({
      data: {
        bookId: input.bookId,
        userId: user.id,
        status: "READING",
        startDate: input.startDate,
      },
    });
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const updateBookStatusHandler = async ({
  input,
  ctx,
}: {
  input: UpdateBookStatusInput;
  ctx: CreateContextOptions;
}) => {
  try {
    const user = ctx.session?.user;

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authorized",
      });
    }

    return await prisma.bookRead.update({
      where: {
        bookId_userId: {
          bookId: input.bookId,
          userId: user.id,
        },
      },
      data: {
        status: input.status,
        finishDate: input.finishDate,
      },
    });
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const removeBookStatusHandler = async ({
  input,
  ctx,
}: {
  input: LikeBookInput;
  ctx: CreateContextOptions;
}) => {
  try {
    const user = ctx.session?.user;

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authorized",
      });
    }

    const bookRating = await prisma.bookRating.findUnique({
      where: {
        bookId_userId: {
          bookId: input.bookId,
          userId: user.id,
        },
      },
    });

    if (bookRating) {
      await prisma.bookRating.delete({
        where: {
          bookId_userId: {
            bookId: input.bookId,
            userId: user.id,
          },
        },
      });
    }

    return await prisma.bookRead.delete({
      where: {
        bookId_userId: {
          bookId: input.bookId,
          userId: user.id,
        },
      },
    });
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const getUserBooks = async ({
  filterQuery,
  ctx,
}: {
  filterQuery: FilterBooksQuery;
  ctx: CreateContextOptions;
}) => {
  try {
    const take = filterQuery.limit || 10;
    const skip = (filterQuery.page - 1) * take;
    const user = ctx.session?.user;

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authorized",
      });
    }

    const books = await prisma.book.findMany({
      skip,
      take,
      where: {
        readers: {
          some: {
            userId: user?.id,
            status: filterQuery.status || "READING",
          },
        },
      },
      include: {
        likes: {
          where: {
            userId: user?.id,
          },
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    if (!books) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Books where not found",
      });
    }

    return {
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

export const rateBookHandler = async ({
  input,
  ctx,
}: {
  input: RateBookInput;
  ctx: CreateContextOptions;
}) => {
  try {
    const user = ctx.session?.user;

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not authorized",
      });
    }

    const bookStatus = await prisma.bookRead.findUnique({
      where: {
        bookId_userId: {
          bookId: input.bookId,
          userId: user.id,
        },
      },
    });

    const isBookReadbyUser = bookStatus?.status === "READ";

    if (!isBookReadbyUser) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Must read the book before rating it",
      });
    }

    const bookRating = await prisma.bookRating.findUnique({
      where: {
        bookId_userId: {
          bookId: input.bookId,
          userId: user.id,
        },
      },
    });

    if (!bookRating) {
      return await prisma.bookRating.create({
        data: {
          bookId: input.bookId,
          userId: user.id,
          rating: input.rating,
        },
      });
    }

    return await prisma.bookRating.update({
      where: {
        bookId_userId: {
          bookId: input.bookId,
          userId: user.id,
        },
      },
      data: {
        rating: input.rating,
      },
    });
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};
