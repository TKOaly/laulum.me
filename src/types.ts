export interface Song {
  /** ID of the song */
  id: number;
  /** Name of the song */
  title: string;
  /** Melody of the song */
  melody?: string;
  /** Writer of the song */
  writers?: string;
  /** Lyrics of the song */
  lyrics: string;
}
