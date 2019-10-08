export default (state = null, action) => ({
  ...state,
  filteredSongs: state.songs.filter(
    ({ song }) =>
      title.toLowerCase().indexOf(action.payload.toLowerCase()) != -1,
  ),
})
