import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TopBar from './components/TopBar';
import Body from './components/Body';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header>
          <TopBar/>
        </header>
       <Body />
      </div>
    );
  }
}

export default App;
