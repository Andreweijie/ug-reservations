import React, { Component } from "react";
import { Route, withRouter, Link } from "react-router-dom";
import CreateNew from "./components/create/CreateNew";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={require("./images/logo.webp")}></img>
        <Route exact path="/create" component={CreateNew} />
        <Route exact path="/" component={Dashboard}></Route>
      </div>
    );
  }
}

export default withRouter(App);
