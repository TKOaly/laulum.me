import { promises, writeFile } from "fs";
import { join } from "path";
import fm, { test } from "front-matter";

const INPUT_DIRECTORY = "./songs/";
const OUTPUT_FILE = "./src/songs.json";

async function parseSongFromFile(filename) {
  const data = await promises.readFile(
    join(INPUT_DIRECTORY, filename),
    "utf-8"
  );

  if (!test(data)) {
    throw Error(`File ${filename} is not in frontmatter format`);
  }

  const content = fm(data);
  const { title, melody, writers } = content.attributes;
  const lyrics = content.body;

  return { title, melody, writers, lyrics };
}

function writeSongs(filename, songs) {
  writeFile(filename, JSON.stringify(songs), function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + filename);
    }
  });
}

const filenames = await promises.readdir(INPUT_DIRECTORY);
const parsedSongs = await Promise.all(filenames.map(parseSongFromFile));
// Sort songs in alphabetical order
parsedSongs.sort((a, b) => a.title.localeCompare(b.title));
// Add id based on index
const songs = parsedSongs.map((song, i) => ({ id: i + 1, ...song }));

writeSongs(OUTPUT_FILE, songs);
