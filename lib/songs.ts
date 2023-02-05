import type { Song } from "@/types/song";
import fm from "front-matter";
import { promises } from "fs";
import path from "path";

const directory = path.join(process.cwd(), "songs");

const getFilenames = async () => {
  return promises.readdir(directory);
};

const readSong = async (filename: string) => {
  const filePath = path.join(directory, filename);
  const fileContents = await promises.readFile(filePath, "utf-8");

  const content = fm<Song>(fileContents);
  const lyrics = content.body;

  return { ...content.attributes, lyrics, slug: path.parse(filename).name };
};

export const getSongs = async () => {
  const filenames = await getFilenames();

  const songs = Promise.all(filenames.map(readSong));

  return songs;
};

export const getSong = async (slug: string): Promise<Song | null> => {
  const filenames = await getFilenames();
  const filename = `${slug}.md`;

  if (!filenames.includes(filename)) {
    return null;
  }

  return readSong(filename);
};
