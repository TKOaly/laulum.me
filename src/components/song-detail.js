import React, { Component } from 'react';
import {connect} from 'react-redux';
import BackButton from './backbutton'

class SongDetail extends Component {
  render() {
    if (!this.props.songs) return (<div>Loading songs...</div>);

    const { match: { params: { id } } } = this.props
    const song = this.props.songs.find(song => song.key == id);

    ga('send', { 'hitType': 'pageview', 'page': song.title });

    var key = 0;

    const lyrics = song.lyrics.split("\n").map(line => {
      key++;
      return {line, key}
    });

    return (
      <div className="song-details">
        <div className="row centered">
          <div className="col-md-5 lyrics">
            <BackButton>Back to all songs</BackButton>
            <h3>{song.title}</h3>
            <p>{lyrics.map(function(line) {return <span key={line.key}>{line.line}<br/></span>})}</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    songs: state.songs
  };
}

export default connect(mapStateToProps)(SongDetail);
