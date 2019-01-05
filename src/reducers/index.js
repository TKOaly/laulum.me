import songs from './reducer_songs'
import activeSong from './reducer_active_song';
import filteredSongs from './reducer-filter-songs';

export default function(state = {}, action) {
  switch (action.type) {
    case 'FETCH_SONGS':
      return {
        ...state,
        songs: songs(state.songs, action),
        filteredSongs: songs(state.songs, action)
      }
    case 'SELECT_SONG':
      return {
        ...state,
        activeSong: activeSong(state.activeSong, action)
      }
    case 'FILTER_SONGS':
      return filteredSongs(state, action);
    default:
      return state
  }
};
