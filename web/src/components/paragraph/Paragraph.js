import React, { Component } from 'react';

import './Paragraph.css';

class Paragraph extends React.Component {
  render() {
    return (
      <div className="Paragraph">
        <p>{this.props.content}</p>
      </div>
    );
  }
}

export default Paragraph;
