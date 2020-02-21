import React, { Component } from "react";
import { auth } from "./Firebase/firebase";

export default class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorMessage);
      });
  };
  render() {
    return (
      <div className="login">
        <form>
          <div className="form-group">
            <label>email</label>
            <input
              type="email"
              id="email"
              value={this.state.email}
              onChange={this.onChange}
            ></input>
          </div>
          <div className="form-group">
            <label>password</label>
            <input
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.onChange}
            ></input>
          </div>
          <button onClick={this.handleSubmit}>login</button>
        </form>
      </div>
    );
  }
}
