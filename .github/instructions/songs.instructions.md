---
applyTo: "songs/*"
---
These are instructions for reviewing song files.
Priority is that the file is correctly named, formatted and that the lyrics are easy to follow.

**Technical formatting**
- The file **must** be a markdown file that ends with `.md`.
- The file name should be snake_case.
- The file **must** start with a frontmatter block (`---`).
  - The frontmatter block **must** contain metadata that matches `types/song.d.ts`, except for `lyrics` (which is the body of the file).

**Lyrics formatting**
Formatting notes:
- Refrains, verses etc. should be their own paragraphs (separated with newlines from other text).
- Refrains sung multiple times should not be written out.
  - If a refrain is sung twice, it should be enclosed with `:,:`
    - Good: `:,: This is\nmy refrain :,:`
    - Bad: `This is\nmy refrain\nThis is\nmy refrain`
    - Bad: `:,:This is\nmy refrain:,:`
  - If a refrain is sung more than twice, `(xN)` should be used instead
    - Good: `This is\nmy refrain (x3)`
    - Bad: `This is\nmy refrain\nThis is\nmy refrain\nThis is\nmy refrain`
  - Refrains should always be written out after verses in between, never shortened with `...`
    - Good: `:,: Refrain refrain :,:\nVerse\n:,: Refrain refrain :,:`
    - Bad: `:,: Refrain refrain :,:\nVerse\n:,: Refrain ...`
- Excess markdown use is discouraged.
- Caps lock and exclamation mark use is discouraged, unless for extreme emphasis.
- Lines should be short.
- Lines should start with a capital letter unless it is a continuing sentence split onto multiple lines.
- Lines should end in punctuation unless it is a continuing sentence split onto multiple lines.
- Lines should not have excess spaces at the end.

**General reviewing**
There should be no typos and the body content should be well-formatted song lyrics with markdown support.
Note that these lyrics may contain unfamiliar proper nouns, puns etc. that are not typos. Most songs are in Finnish.
Take the context of the song into account; e.g. for songs that have repeated patterns, it is not necessary to always write out the full lyrics.
Try to consider whether the lyrics are spaced out based on rhyme and meter. Note that some song lyrics may break this intentionally.