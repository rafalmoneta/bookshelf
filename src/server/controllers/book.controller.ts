import { prisma } from "./../utils/prisma";
import { TRPCError } from "@trpc/server";
import type { CreateBookInput } from "../schema/book.schema";

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
