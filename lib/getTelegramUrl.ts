import { Book } from "@/types/book";
import type { Song } from "@/types/song";
import slugify from "./slugify";

const BYTE_LIMIT = 4096;
const TELEGRAM_BASE = "https://t.me/share/url";
const FALLBACK_BASE_URL = "https://laulum.me/";

export const getTelegramURL = (songUrl: string, text?: string): string => {
  const url = new URL(TELEGRAM_BASE);
  url.searchParams.set("url", songUrl);
  if (text) url.searchParams.set("text", text);
  return url.toString();
};

/**
 * A function to generate a Telegram share link for a song.
 * @param song
 * @param baseURL Base URL for the link, e.g. "https://laulum.me" (default)
 */
export const getSongLink = (song: Song, baseURL?: string): string => {
  const songURL = new URL(
    `/songs/${slugify(song.title)}`,
    baseURL ?? FALLBACK_BASE_URL
  ).toString();

  let header = `**${song.title}**\n`;
  if (song.melody) header += `(melody ${song.melody})`;

  let body = header;
  body += "\n\n";
  body += song.lyrics;

  const fullURL = getTelegramURL(songURL, body);
  // Check UTF-8 byte length
  if (new TextEncoder().encode(fullURL).length < BYTE_LIMIT) {
    return fullURL;
  }

  // If the body is too long (exceeds BYTE_LIMIT), send only necessary information
  return getTelegramURL(songURL, header);
};

/**
 * A function to generate a Telegram share link for a book.
 * @param book
 * @param baseUrl Base URL for the link, e.g. "https://laulum.me" (default)
 */
export const getBookLink = (book: Book, baseURL?: string): string => {
  const bookURL = new URL(`/books/${book.name}`, baseURL ?? FALLBACK_BASE_URL);
  return getTelegramURL(bookURL.toString());
};
