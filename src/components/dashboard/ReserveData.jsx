import React, { Component } from "react";

export default class ReserveData extends Component {
  render() {
    console.log(this.props.data.date);
    let date = new Date(this.props.data.date.seconds * 1000).toLocaleString(
      "en-US"
    );
    return (
      <div className="reserve-data">
        <span>{this.props.data.name}</span>
        <span>{this.props.data.mobile}</span>
        <span>{this.props.data.email}</span>
        <span>{this.props.data.pax}</span>
        <span>{date}</span>
        <span>{this.props.data.time}</span>
        <span>{this.props.data.seatPref}</span>
        <span>{this.props.data.contactPref}</span>
        <span>{this.props.data.remarks}</span>
      </div>
    );
  }
}
