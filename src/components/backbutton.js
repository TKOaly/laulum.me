import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

class BackButton extends Component {
  render() {
    return (
      <Link to={'/'}><button className="dank">{this.props.children}</button></Link>
    );
  }
}

export default BackButton;
