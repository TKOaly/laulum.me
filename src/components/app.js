import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSongs } from '../actions/index';

class App extends Component {
  componentWillMount() {
    this.props.fetchSongs();
  }

  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}

export default connect(null, { fetchSongs })(App);
