import React, { Component } from "react";

export default class ReserveData extends Component {
  render() {
    console.log(this.props.data.name);
    return (
      <div>
        <span>{this.props.data.name}</span>
        <span>{this.props.data.mobile}</span>
        <span>{this.props.data.email}</span>
        <span>{this.props.data.pax}</span>
        <span>{this.props.data.date.seconds}</span>
        <span>{this.props.data.remarks}</span>
      </div>
    );
  }
}
