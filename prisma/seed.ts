import { PrismaClient } from "@prisma/client";
import { books } from "./data/books";

import type { BookType } from "./data/books";

const prisma = new PrismaClient();

async function createBook(bookData: BookType) {
  let book = await prisma.book.findFirst({
    where: { id: bookData.id },
  });

  if (!book) {
    book = await prisma.book.create({ data: bookData });
  }
}

async function run() {
  console.log(`🌱 Inserting seed data`);

  for (const book of books) {
    console.log(`📕 Adding book: ${book.name}`);
    await createBook(book);
  }

  console.log(`✅ Seed data inserted`);
  console.log(`👋 Please start the process with \`yarn dev\``);
}

run()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
