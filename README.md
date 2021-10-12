# Elektroninen sitsilaulukirja

This is an electronic version of songbook for sitsit. All the songs in this repo are mostly as they are in TKO-äly ry official songbook. The site itself is hosted in https://laulum.me

## Want to add a song? Make a pull request!

Song lyrics are stored in the songs/ directory. If you want to add a song, create a new txt file in the directory with the song lyrics in it.

The lyrics file format is:

| line nr |                      |
|---------|----------------------|
| 1       | Title                |
| 2       | Melody               |
| 3       | Credits for lyrics   |
| 4       | 1st line of lyrics   |
| 5       | 2nd line of lyrics   |

A good example would be gurulassa.txt

| line nr | content                      | notes                                                      |
|---------|------------------------------|------------------------------------------------------------|
| 1       | Gurulassa                    | Title of the song                                          |
| 2       | Puistossa                    | Original melody for the song                               |
| 3       | Ada                          | Credits for the creator of the lyrics                      |
| 4       |                              | empty lines in the beginning will be automatically removed |
| 5       | Gurulassa ilta viilenee.     |
| 6       | Topi lämpimikseen koodailee. |
| ...     | ...                          |

Melody and credits can be left empty, but don't start the lyrics itself before line 4. So if you don't want to add melody or credits, leave lines 2 and 3 empty in the file. When you create a pull request, Netlify should automatically create a preview page, where you can make sure your song is correctly formatted.
