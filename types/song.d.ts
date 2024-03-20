export interface Song {
  /** Name of the song */
  title: string;
  /** Melody of the song */
  melody?: string;
  /** Writer of the song */
  writers?: string;
  /** Lyrics of the song */
  lyrics: string;
  /** Hidden means the song is not displayed on the main page */
  hidden?: boolean;
}
