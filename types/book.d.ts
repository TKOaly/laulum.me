export interface Book {
  /**
   * ID for the book, should be human-readable.
   * Read from the filename.
   * @example "tekis-2017"
   */
  name: string;
  /**
   * Full title of the song book
   */
  title: string;
  /**
   * Name of the organisation the book belongs to
   */
  organisation?: string;
  /**
   * Credits for the song
   */
  credits?: Credits;
  /**
   * Songs the book contains
   */
  songs: Song[];
}

/**
 * Key should be human-readable, it is rendered as the credit category title
 */
interface Credits {
  [key: string]: string[];
}

interface Song {
  /**
   * Number of the song in the song book
   * Can be arbitrary
   * @example "42"
   * @example "∞"
   */
  number: string;
  /**
   * Title of the song
   * Preferably matches a song in the database
   */
  title: string;
  /**
   * Has content defined in JSON, overrides other fields
   */
  content?: string;
  /**
   * Specifies exact song slug, should be used for linking
   */
  slug?: string;
}
