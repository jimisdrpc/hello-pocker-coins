import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Game from "./Game";
//import registerServiceWorker from "./registerServiceWorker";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/game" component={Game} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
//registerServiceWorker();
serviceWorker.unregister();
