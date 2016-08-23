export default function(state = null, action) {
    return Object.assign({}, state, {
        filteredSongs: state.songs.filter((song) => {return song.title.toLowerCase().indexOf(action.payload.toLowerCase()) != -1})
    })
}