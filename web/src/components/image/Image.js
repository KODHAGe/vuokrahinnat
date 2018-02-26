import React, { Component } from 'react';

import './Image.css';

class Image extends React.Component {
  render() {
    return (
      <div className="Image">
        <img src={this.props.content}></img>
      </div>
    );
  }
}

export default Image;
