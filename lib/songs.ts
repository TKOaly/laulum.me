import type { Song } from "@/types/song";

import fm from "front-matter";
import { promises } from "fs";
import path from "path";
import slugify from "./slugify";

const directory = path.join(process.cwd(), "songs");
const cache = path.join(process.cwd(), "cache", "songs.json");

const getFilenames = async () => {
  return promises.readdir(directory);
};

// Since slugs do not match filenames, we need a mapping between the two.
const getSlugs = async (
  querySlug?: string
): Promise<Array<{ slug: string; filename: string }>> => {
  try {
    const cachedData = await promises.readFile(cache, "utf-8");
    const mapping = JSON.parse(cachedData);

    // If we cannot find the specified querySlug in the cache data, we might need to update our cache.
    // Mainly useful in dev environments.
    if (!mapping.some(({ slug }: { slug: string }) => slug === querySlug)) {
      throw Error(
        `Potential cache miss for querySlug ${querySlug}, revalidating...`
      );
    }

    return mapping;
  } catch (e) {}

  const filenames = await getFilenames();

  const songs = await Promise.all(
    filenames.map(async (filename) => {
      const song = await readSong(filename);
      return { ...song, filename };
    })
  );

  const mapping = songs.map(({ title, filename }) => ({
    slug: slugify(title),
    filename,
  }));

  try {
    await promises.mkdir(path.join(process.cwd(), "cache"));
  } catch (e) {}

  try {
    await promises.writeFile(cache, JSON.stringify(mapping), "utf-8");
  } catch (e) {
    console.error(e);
  }

  return mapping;
};

const readSong = async (
  filename: string
): Promise<Song & { filename: string }> => {
  const filePath = path.join(directory, filename);
  const fileContents = await promises.readFile(filePath, "utf-8");

  const content = fm<Song>(fileContents);
  const lyrics = content.body;

  const attributes = {
    ...content.attributes,
    tags:
      content.attributes.tags && typeof content.attributes.tags === "string"
        ? (content.attributes.tags as string).split(",").map(tag => tag.trim()).filter(Boolean)
        : []
  };

  return { ...attributes, lyrics, filename };
};

export const getSongs = async () => {
  const filenames = await getFilenames();
  const songs = Promise.all(filenames.map(readSong));
  return songs;
};

export const getSong = async (querySlug: string) => {
  const mapping = await getSlugs(querySlug);
  const match = mapping.find(({ slug }) => querySlug === slug);

  if (!match) {
    return null;
  }

  return readSong(match.filename);
};

export const songExists = async (querySlug: string) => {
  const mapping = await getSlugs(querySlug);
  return mapping.some(({ slug }) => querySlug === slug);
};
