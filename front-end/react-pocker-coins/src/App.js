import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { getInitialCoinsData } from "./DataProvider";

class App extends Component {
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
    this.eventSource.onmessage = e =>
      this.updateAmountState(JSON.parse(e.data));
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

  render() {
    return (
      <div className="App">
        <ReactTable data={this.state.data} columns={this.columns} />
      </div>
    );
  }
}

export default App;
