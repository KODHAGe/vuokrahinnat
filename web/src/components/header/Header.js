import React, { Component } from 'react';

import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <div class="Header-bg"></div>
        <div class="Header-text">
          <h1>Mistä vuokrasi muodostuu?</h1>
          <h2>Metajuttu data-aiheiden kokeellisesta löytämistä annetusta aineistosta, niiden visualisoinnista ja mahdollisesti myös aavistuksen asuntojen vuokrahinnoista.</h2>
          <h3>Teksti, kuva, grafiikka: Wolf Wikgren</h3>
        </div>
      </div>
    );
  }
}

export default Header;
