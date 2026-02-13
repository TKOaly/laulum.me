import type { Book } from "@/types/book";

import { promises } from "fs";
import path from "path";

const directory = path.join(process.cwd(), "books");

// Simple cache
let FILENAMES: string[] | null = null;
const getFilenames = async () => {
  if (FILENAMES) return FILENAMES;

  FILENAMES = await promises.readdir(directory);
  return FILENAMES;
};

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

// Simple cache to avoid reading and parsing the same book file multiple times
const BOOKS = new Map<string, Book>();

const readBook = async (filename: string): Promise<Book> => {
  const filePath = path.join(directory, filename);
  const stats = await promises.stat(filePath);
  const cacheKey = `${filename}-${stats.mtime.getTime()}`;

  if (BOOKS.has(cacheKey)) {
    return BOOKS.get(cacheKey)!;
  }

  const contents = await promises.readFile(filePath, "utf-8");
  const book = {
    ...JSON.parse(contents),
    name: path.basename(filename, ".json"),
  };
  BOOKS.set(cacheKey, book);
  return book;
};

export const getBookNames = async () => {
  const filenames = await getFilenames();
  return filenames.map((filename) => path.basename(filename, ".json"));
};
