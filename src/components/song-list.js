import React, { Component } from 'react';
import SearchBar from './search-bar';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class SongList extends Component {
  renderList() {
    if (!this.props.songs) return (<div>Loading songs...</div>);
    return this.props.songs.map(song => {
      return (
          <Link to={"songs/"+song.key} key={song.title} className="col-md-4">
            <div className="song-card">{song.title}</div>
          </Link>
      );
    });
  }

  render() {
    return (
      <div>
        <SearchBar />
        <div className="song-list row">
          {this.renderList()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    songs: state.filteredSongs
  };
}

export default connect(mapStateToProps, null)(SongList);
