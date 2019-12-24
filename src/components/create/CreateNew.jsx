import React, { Component } from "react";

export default class CreateNew extends Component {
  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text"></input>
          </div>
        </form>
      </div>
    );
  }
}
