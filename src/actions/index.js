import axios from 'axios';

export const FETCH_SONGS = 'FETCH_SONGS';
export const FILTER_SONGS = 'FILTER_SONGS';

export function fetchSongs() {
  const url = '/songs.json';
  const request = axios.get(url);
  return request
    .then(res => res.data)
    .then(data => ({ type: FETCH_SONGS, payload: data }))
}

export function filterSongs(searchterm) {
  return {
    type: FILTER_SONGS,
    payload: searchterm
  }
}
