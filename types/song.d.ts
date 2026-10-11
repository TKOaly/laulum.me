export interface Song {
  /** Name of the song */
  title: string;
  /** Melody of the song */
  melody?: string;
  /** Writer of the song */
  writers?: string;
  /** People to thank for the song */
  thanks?: string;
  /** Additional information about the song */
  info?: string;
  /** Update attribution for the song */
  update?: string;
  /** Lyrics of the song */
  lyrics: string;
  /** Hidden means the song is not displayed on the main page */
  hidden?: boolean;
}
