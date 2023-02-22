# laulum.me

This is an electronic version of songbook for sitsit. All the songs in this repo are mostly as they are in TKO-äly ry official songbook. The site itself is hosted in https://laulum.me

## Want to add a song? Make a pull request!

Song lyrics are stored in the `songs/` directory.  
If you want to add a song, create a new file in the directory with the song lyrics in it.

You'll also need to add a header, containing at least a title for the song:

```
---
title: Song title
---

Song lyrics...
```

You can also specify the melody and/or writers:

```
---
title: Gurulassa
melody: Anssi Kela - Puistossa
writers: Ada
---

Gurulassa ilta viilenee.
Topi lämpimikseen koodailee...
```

### Books (WIP)

Books can be added as JSON files in the `books` folder. See [`books/tekis-2017.json`](/books/tekis-2017.json) for reference.

Books can be linked using their filename, e.g. `tekis-2017.json` matches https://laulum.me/book/tekis-2017.

**Format**

```js
{
  "title": "Title of the book",
  // Can be left out. Currently not displayed.
  "organisation": "Organisation ry",
  // Credits can be left out.
  // Keys are used as headers in credits list.
  "credits": {
    "Book master": ["Matti Meikäläinen"],
    "Lyric collectors": ["Eeva Esimerkki", "Sumu Satunnainen"]
  },
  // Any amount of songs.
  // Songs are displayed in the order listed in this array.
  "songs": [
    {
      // Arbitrary string. Can be anything.
      "number": "32",
      // Automatically links to laulum.me song if title matches.
      "title": "Song name",
      // Can be left out. Overrides everything and shows just this content alongside number and title.
      "content": "Custom content",
      // Can be left out. Manually specifies laulum.me song slug to link to.
      "slug": "song-slug"
    }
  ]
}
```

## Favicon

The favicon was created by Lassi Koistinen.
