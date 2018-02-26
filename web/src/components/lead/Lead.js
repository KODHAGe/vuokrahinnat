import React, { Component } from 'react';

import './Lead.css';

class Lead extends React.Component {
  render() {
    return (
      <div className="Lead">
        {this.props.content}
      </div>
    );
  }
}

export default Lead;
