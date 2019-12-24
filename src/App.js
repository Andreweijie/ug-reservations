import React, { Component } from "react";
import { Route, withRouter, Link } from "react-router-dom";
import CreateNew from "./components/create/CreateNew";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/create">Create</Link>
        <Route exact path="/create" component={CreateNew} />
      </div>
    );
  }
}

export default withRouter(App);
