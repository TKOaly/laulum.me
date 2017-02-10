let fs = require('fs');
let dirname = 'songs/';
let outputFile = 'songs.json';
var songs = [];

fs.readdir(dirname, (err, filenames) => {
  if (!err) {
    filenames.forEach((filename, id) => {
      fs.readFile(dirname + filename, 'utf-8', (err, content) => {
        if (!err) {
          songs.push(parseSong(content, id));
        }
        if (filename === filenames[filenames.length-1]) writeSongs(outputFile, songs);
      });
    });
  }
});

function parseSong(content, id) {
  newContent = content.split('\n');
  newContent.pop();
  return {
    id: id,
    name: newContent.shift(),
    melody: newContent.shift(),
    meta: parseMeta(content),
    lyrics: parseLyrics(content)
  };
}

function parseMeta(content) {
  var newContent = content.split('\n');
  if (newContent[newContent.length-1] !== '}') return {};
  var meta = "";
  while (newContent[newContent.length-1] != '{') {
    meta = newContent.pop()+meta;
  }
  meta = newContent.pop()+meta
  return JSON.parse(meta);
}

function parseLyrics(content) {
  //TODO FIX PLZ
  return content.reduce((lyrics, line) => {
    return lyrics+line+'\n';
  }, "")
}

function writeSongs(filename, songs) {
  fs.writeFile(filename, JSON.stringify(songs, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + filename);
    }
  });
}
