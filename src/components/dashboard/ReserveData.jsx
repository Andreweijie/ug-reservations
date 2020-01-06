import React, { Component } from "react";
import db from "../Firebase/firebase";

export default class ReserveData extends Component {
  confirmReserve = () => {
    db.collection("reservations")
      .doc(this.props.data.id)
      .update({
        confirmed: true
      });
  };

  sendConfirmation = () => {
    const mailData = {
      name: this.props.data.name,
      date: this.props.data.date,
      pax: this.props.data.pax,
      seatPref: this.props.data.seatPref,
      time: this.props.data.time
    };
    fetch("/test", {
      method: "POST",
      body: JSON.stringify(mailData)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.confirmReserve();
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
      <div className="reserve-data">
        <span>
          <h4 style={{ margin: 0 }}>Name</h4>
          {this.props.data.name}
        </span>
        <span>
          <h4 style={{ margin: 0 }}>Mobile</h4>
          {this.props.data.mobile}
        </span>
        <span>
          <h4 style={{ margin: 0 }}>Email</h4>
          {this.props.data.email}
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
          <h4 style={{ margin: 0 }}>Seating</h4>
          {this.props.data.seatPref}
        </span>
        <span>
          <h4 style={{ margin: 0 }}>Contact</h4>
          {this.props.data.contactPref}
        </span>
        <span>
          <h4 style={{ margin: 0 }}>Remarks</h4>
          {this.props.data.remarks}
        </span>
        <button>Send Email</button>
        <button
          className="confirm-btn"
          style={
            this.props.data.confirmed
              ? { backgroundColor: "#3ee67e" }
              : { backgroundColor: "grey" }
          }
          onClick={this.confirmReserve}
        >
          {this.props.data.confirmed ? "Confirmed" : "Confirm"}
        </button>
      </div>
    );
  }
}
