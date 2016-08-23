export default function(state = null, action) {
  return action.payload.data.map(function(song) {
    return {
      key: song.id,
      title: song.name,
      melody: song.melody,
      lyrics: song.lyrics
    }
  });
}