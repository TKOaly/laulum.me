let fs = require("fs");
let dirname = "songs/";
let outputFile = "./src/songs.json";
let songs = [];

fs.readdir(dirname, (err, filenames) => {
  if (!err) {
    filenames.forEach((filename, id) => {
      fs.readFile(dirname + filename, "utf-8", (err, content) => {
        if (!err) {
          songs.push(parseSong(content, id));
        }
        if (filename === filenames[filenames.length - 1])
          writeSongs(outputFile, songs);
      });
    });
  }
});

function parseSong(content, id) {
  newContent = content.split("\n");
  newContent.pop();
  return {
    id: id + 1,
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

function removeExtraInfo(content) {
  let newContent = content.split("\n");
  newContent.pop();
  newContent = newContent.splice(2, newContent.length - 1);
  if (newContent[newContent.length - 1] === "}") {
    console.log("!!!!");
    while (newContent[newContent.length - 1] != "{") {
      newContent.pop();
    }
    newContent.pop();
  }
  return newContent;
}

function writeSongs(filename, songs) {
  fs.writeFile(filename, JSON.stringify(songs), function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + filename);
    }
  });
}
