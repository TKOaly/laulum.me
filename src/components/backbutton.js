var React = require('react');
var Router = require('react-router');

var History = Router.History;

var BackButton = React.createClass({
  mixins: [ History ],
  render: function() {
    return (
      <button className="dank" onClick={this.history.goBack}>{this.props.children}</button>
    );
  }
});

module.exports = BackButton;
