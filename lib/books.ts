import type { Book } from "@/types/book";

import { promises } from "fs";
import path from "path";

const directory = path.join(process.cwd(), "books");

const getFilenames = async () => promises.readdir(directory);

// FIXME: Validate JSON structure (parsed data is `unknown`)
export const getBooks = async (): Promise<Book[]> => {
  const filenames = await getFilenames();
  return await Promise.all(filenames.map(readBook));
};

export const getBook = async (name: string): Promise<Book | null> => {
  const filenames = await getFilenames();
  const filename = `${name}.json`;
  if (!filenames.includes(filename)) {
    return null;
  }
  return readBook(filename);
};

const readBook = async (filename: string): Promise<Book> => {
  const filePath = path.join(directory, filename);
  const contents = await promises.readFile(filePath, "utf-8");
  return {
    ...JSON.parse(contents),
    name: path.basename(filename, ".json"),
  };
};

export const getBookNames = async () => {
  const filenames = await getFilenames();
  return filenames.map((filename) => path.basename(filename, ".json"));
};
