import songs from '../../songs.json'

export const FETCH_SONGS = 'FETCH_SONGS';
export const FILTER_SONGS = 'FILTER_SONGS';

export function fetchSongs() {
  return { type: FETCH_SONGS, payload: songs }
}

export function filterSongs(searchterm) {
  return {
    type: FILTER_SONGS,
    payload: searchterm
  }
}
