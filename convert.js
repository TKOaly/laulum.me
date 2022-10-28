import { promises } from "fs";
import path from "path";

/*
  Utility for converting old songs in .txt format to new frontmatter .md format
  Should only be needed once, but kept in the repo just in case
*/

const OLD_DIR = "oldsongs";
const NEW_DIR = "songs";

function parseSong(content) {
  let newContent = content.split("\n");
  newContent.pop();
  return {
    name: newContent.shift(),
    melody: newContent.shift(),
    lyricsBy: newContent.shift(),
    lyrics: parseLyrics(newContent),
  };
}

function parseLyrics(content) {
  let newContent = removeEmptyLinesFromBeginning(content);
  return newContent.reduce((lyrics, line) => {
    return lyrics + line + "\n";
  }, "");
}

function removeEmptyLinesFromBeginning(arr) {
  while (arr[0] === "") {
    arr.shift();
  }
  return arr;
}

function convertToFrontmatter(content) {
  const { name, melody, lyricsBy, lyrics } = parseSong(content);
  let str = "---\n";
  str += `title: ${name}\n`;
  if (melody) str += `melody: ${melody}\n`;
  if (lyricsBy) str += `writers: ${lyricsBy}\n`;
  str += "---\n";
  return str + lyrics;
}

const filenames = await promises.readdir(OLD_DIR);
filenames.forEach(async (file) => {
  const content = await promises.readFile(path.join(OLD_DIR, file), "utf8");
  const newFilename = path.join(NEW_DIR, file.replace(".txt", ".md"));
  await promises.writeFile(newFilename, convertToFrontmatter(content));
  console.log(`Wrote ${newFilename}`);
});
