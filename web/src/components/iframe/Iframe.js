import React, { Component } from 'react';

import './Iframe.css';

class Iframe extends React.Component {
  render() {
    return (
      <div className="Iframe">
        <iframe src={this.props.url} frameborder="0" scrolling="no"></iframe>
      </div>
    );
  }
}

export default Iframe;
