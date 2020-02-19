import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Confirmation from "./create/Confirmation";
import Today from "./date/Today";
import CreateNew from "./create/CreateNew";

export default class Main extends Component {
  render() {
    return (
      <div id="mains">
        <div className="links">
          <Link to="/main/dashboard">Home</Link>
          <Link to="/main/create">Create New</Link>
          <Link to="/main/today">Today</Link>
        </div>
        <Route exact path="/main/create" component={CreateNew} />
        <Route exact path="/main/dashboard" component={Dashboard}></Route>
        <Route exact path="/main/today" component={Today}></Route>
        <Route exact path="/main/confirmation" component={Confirmation}></Route>
      </div>
    );
  }
}
