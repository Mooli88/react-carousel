import React, { Component } from 'react';
import Slides from './components/slides/Slides';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <main>
          <Slides />
        </main>
      </div>
    );
  }
}

export default App;
