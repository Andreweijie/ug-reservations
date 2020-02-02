import React, { Component } from "react";
import db from "../Firebase/firebase";

/*
Time
Name
Table number
Pax
Turnover
*/

export default class Summary extends Component {
  confirmArrival = () => {
    db.collection("reservations")
      .doc(this.props.data.id)
      .update({
        finished: true
      });
  };

  cancelReservation = () => {
    db.collection("reservations")
      .doc(this.props.data.id)
      .delete()
      .then(() => {
        console.log("reservation cancelled");
      });
  };

  render() {
    console.log(this.props.data.date);
    let date = new Date(this.props.data.date.seconds * 1000).toLocaleString(
      "en-US",
      {
        year: "numeric",
        month: "numeric",
        day: "numeric"
      }
    );
    return (
      <div className="summary-data-box">
        <hr></hr>
        <div className="summary-data">
          <span>
            <h4 style={{ margin: 0 }}>Name</h4>
            {this.props.data.name}
          </span>
          <span>
            <h4 style={{ margin: 0 }}>Pax</h4>
            {this.props.data.pax}
          </span>
          <span>
            <h4 style={{ margin: 0 }}>Date</h4>
            {date}
          </span>
          <span>
            <h4 style={{ margin: 0 }}>Time</h4>
            {this.props.data.time}
          </span>
          <span>
            <h4 style={{ margin: 0 }}>Table</h4>
            <input type="text" value={this.props.data.time}></input>
          </span>
          <span>
            <h4 style={{ margin: 0 }}>Turnover</h4>
            <input type="text" value={this.props.data.time}></input>
          </span>
        </div>
        <div className="buttons">
          <button
            className="arrive-btn"
            style={
              this.props.data.finished
                ? { backgroundColor: "#69d693" }
                : { backgroundColor: "#333333" }
            }
            onClick={this.confirmArrival}
          >
            {this.props.data.finished ? "Arrived" : "Arrive"}
          </button>
          <button onClick={this.cancelReservation}>Cancel</button>
        </div>
      </div>
    );
  }
}
