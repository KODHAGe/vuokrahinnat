import React, { Component } from 'react';

import './Footer.css';

const logo = require('../../assets/wwblk.png');

class Footer extends React.Component {
  render() {
    return (
      <div className="Footer">
        <img src={logo} /><br/>
        <a href="https://github.com/KODHAGe/vuokrahinnat/">Koko setti GitHubissa</a>
        <p>2018 WRW | wolfw.xyz</p>
      </div>
    );
  }
}

export default Footer;
