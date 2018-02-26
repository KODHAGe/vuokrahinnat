import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import ContentContainer from './components/contentcontainer/ContentContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ContentContainer />
      </div>
    );
  }
}

export default App;
