export default (state = {}, action) =>
  action.payload.map(song => (
    {
      key: song.id,
      title: song.name,
      melody: song.melody,
      lyrics: song.lyrics
    }
  ))