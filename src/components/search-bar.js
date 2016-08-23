import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterSongs } from '../actions/index';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { searchterm: ''};
    }

    onInputChange(searchterm) {
        this.setState({searchterm});
        this.props.filterSongs(searchterm);
    }

    render() {
        return (
            <div className="searchbar col-md-12">
              <div className="input-group">
                  <input className="form-control"
                      placeholder="Search songs..."
                      value={this.state.searchterm}
                      onChange={event => this.onInputChange(event.target.value)}
                  />
              </div>
            </div>

        );
    }
}

export default connect(null, { filterSongs })(SearchBar);
