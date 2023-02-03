import slugify from "./slugify";
import type { Song } from "./song";

const BYTE_LIMIT = 4096;
const TELEGRAM_BASE = "https://t.me/share/url";
const FALLBACK_BASE_URL = "https://laulum.me/";

const getTelegramURL = (url: string, text: string): string =>
  `${TELEGRAM_BASE}?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
    text
  )}`;

/**
 * A function to generate a Telegram share link for a song.
 * Reads the base URL from environment variable BASE_URL.
 * @param song
 * @param baseURL Base URL for the link, e.g. "https://laulum.me" (default)
 */
export const getTelegramLink = (song: Song, baseURL?: string): string => {
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
