import React, { Component } from "react";
import { db } from "../Firebase/firebase";

export default class ReserveData extends Component {
  state = {
    sending: "Send Email"
  };
  confirmReserve = () => {
    db.collection("reservations")
      .doc(this.props.data.id)
      .update({
        confirmed: true
      });
  };
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

  sendConfirmation = () => {
    this.setState(
      {
        sending: "Sending..."
      },
      () => {
        const mailData = {
          name: this.props.data.name,
          date: new Date(this.props.data.date.seconds * 1000),
          pax: this.props.data.pax,
          seatPref: this.props.data.seatPref,
          time: this.props.data.time,
          email: this.props.data.email,
          outlet: "TCS"
        };
        fetch(
          "https://us-central1-reservations-7dd65.cloudfunctions.net/widgets/sendConfirmationMail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(mailData)
          }
        )
          .then(res => res.json())
          .then(data => {
            if (data.message) {
              console.log("Success");

              this.confirmReserve();

              this.setState({ sending: "sent" });
            }
          });
      }
    );
  };
  render() {
    let date = new Date(this.props.data.date.seconds * 1000).toLocaleString(
      "en-US",
      {
        year: "numeric",
        month: "numeric",
        day: "numeric"
      }
    );
    let createDate = new Date(
      this.props.data.createdAt.seconds * 1000
    ).toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    });
    return (
      <div className="reserve-data-box">
        <div className="header">
          <span>
            ID: <b>{this.props.data.id}</b>
          </span>
          <button onClick={this.cancelReservation}>Cancel</button>
        </div>
        <hr></hr>
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
        </div>
        <div className="buttons">
          <button className="email-btn" onClick={this.sendConfirmation}>
            Send Email
          </button>
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
          <button
            className="arrive-btn"
            style={
              this.props.data.finished
                ? { backgroundColor: "#69d693", color: "#fff" }
                : { backgroundColor: "#333333", color: "#fff" }
            }
            onClick={this.confirmArrival}
          >
            {this.props.data.finished ? "Arrived" : "Arrive"}
          </button>
        </div>
      </div>
    );
  }
}
