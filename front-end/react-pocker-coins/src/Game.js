import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { getInitialCoinsData } from "./DataProvider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: getInitialCoinsData()
    };

    this.columns = [
      {
        Header: "Player",
        accessor: "player"
      },
      {
        Header: "Amount",
        accessor: "amount"
      }
    ];
    this.eventSource = new EventSource("http://localhost:5000/coins");
  }

  componentDidMount() {
    this.eventSource.addEventListener("updateAmountState", e =>
      this.updateAmountState(JSON.parse(e.data))
    );

    this.eventSource.addEventListener("removePlayer", e =>
      this.removePlayer(JSON.parse(e.data))
    );

    this.eventSource.addEventListener("closedConnection", e => this.stopGame());
  }

  stopGame() {
    this.eventSource.close();
  }

  updateAmountState(amountState) {
    let newData = this.state.data.map(item => {
      if (item.player === amountState.player) {
        item.amount = amountState.amount;
      }
      return item;
    });

    this.setState(Object.assign({}, { data: newData }));
  }
  removePlayer(player) {
    const newData = this.state.data.filter(
      item => item.player !== player.player
    );

    this.setState(Object.assign({}, { data: newData }));
  }

  render() {
    return (
      <div className="Game">
        {/*<button onClick={() => this.stopGame()}>Stop game</button>*/}
        <Button
          onClick={() => this.stopGame()}
          variant="contained"
          color="primary"
        >
          Stop game
        </Button>
        <ReactTable data={this.state.data} columns={this.columns} /> <br />
        <TextField placeholder="Placeholder here" label="Basic TextField" />
        <TextField
          id="standard-name"
          label="Name"
          value="abc"
          margin="normal"
        />
        <div className="App">
          <p>
            <Link to="/">Home</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Game;
