import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import "./player-app.js";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <p className="App-intro">
            <Link to="/game">Game</Link>
          </p>
        </div>
        <div className="App">
          <player-app />
        </div>
      </React.Fragment>
    );
  }
}
export default App;
