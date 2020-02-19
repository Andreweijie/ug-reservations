import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import "./App.css";
import fire, { auth } from "./components/Firebase/firebase";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Main from "./components/Main";

class App extends Component {
  state = {
    auth: true,
    user: null
  };
  componentDidMount() {
    /*auth
      .createUserWithEmailAndPassword("andreweijie@gmail.com", "Many@1234")
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorMessage);
      });*/
    //auth.signOut();
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user, auth: true });
        this.props.history.replace("/main/dashboard");
      } else {
        this.setState({ auth: false });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <img src="https://i.imgur.com/wWxOWWa.png" alt="test" />
        <Route
          exact
          path="/"
          render={() => <Redirect to="/main/dashboard" />}
        />
        <Route exact path="/login" render={props => <Login {...props} />} />
        <PrivateRoute
          path="/main"
          component={Main}
          auth={this.state.auth}
        ></PrivateRoute>
      </div>
    );
  }
}

export default withRouter(App);
