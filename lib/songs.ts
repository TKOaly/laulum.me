import type { Song } from "@/types/song";
import fm from "front-matter";
import { promises } from "fs";
import path from "path";
import slugify from "./slugify";

const directory = path.join(process.cwd(), "songs");

const getFilenames = async () => {
  return promises.readdir(directory);
};

export const getSongs = async () => {
  const filenames = await getFilenames();

  const songs = Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(directory, filename);
      const fileContents = await promises.readFile(filePath, "utf-8");

      const content = fm<Song & { slug?: string }>(fileContents);
      const { slug, title } = content.attributes;
      const lyrics = content.body;

      return { ...content.attributes, lyrics, slug: slug ?? slugify(title) };
    })
  );

  return songs;
};
