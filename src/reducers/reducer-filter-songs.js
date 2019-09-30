export default (state = {}, action) =>
  (
    {
      ...state,
      filteredSongs: state.songs.filter((song) => {return song.title.toLowerCase().indexOf(action.payload.toLowerCase()) != -1})
    }
  )