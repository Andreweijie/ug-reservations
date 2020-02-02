import React, { Component } from "react";
import { Route, withRouter, Link } from "react-router-dom";
import CreateNew from "./components/create/CreateNew";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Confirmation from "./components/create/Confirmation";
import Today from "./components/date/Today";

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src="https://i.imgur.com/wWxOWWa.png" alt="test" />
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/create">Create New</Link>
          <Link to="/today">Today</Link>
        </div>
        <Route exact path="/create" component={CreateNew} />
        <Route exact path="/" component={Dashboard}></Route>
        <Route exact path="/today" component={Today}></Route>
        <Route exact path="/confirmation" component={Confirmation}></Route>
      </div>
    );
  }
}

export default withRouter(App);
