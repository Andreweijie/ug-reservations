import React, { Component } from "react";
import { db } from "../Firebase/firebase";

export default class ReserveData extends Component {
  state = {
    sending: "Send Email",
  };
  confirmSent = () => {
    db.collection("reservations").doc(this.props.data.id).update({
      sent: true,
    });
  };
  confirmReserve = () => {
    db.collection("reservations").doc(this.props.data.id).update({
      confirmed: true,
    });
  };
  confirmArrival = () => {
    db.collection("reservations").doc(this.props.data.id).update({
      finished: true,
    });
  };
  confirmDecline = () => {
    db.collection("reservations").doc(this.props.data.id).update({
      declined: true,
    });
  };
  cancelReservation = () => {
    this.setState(
      {
        sending: "Sending...",
      },
      () => {
        const mailData = {
          name: this.props.data.name,
          date: new Date(this.props.data.date.seconds * 1000),
          pax: this.props.data.pax,
          seatPref: this.props.data.seatPref,
          time: this.props.data.time,
          email: this.props.data.email,
          outlet: "TCS",
        };
        fetch(
          "https://us-central1-reservations-7dd65.cloudfunctions.net/widgets/reject",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(mailData),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              console.log("Success");
              this.confirmDecline();
            }
          });
      }
    );
  };

  sendConfirmation = () => {
    this.setState(
      {
        sending: "Sending...",
      },
      () => {
        const mailData = {
          name: this.props.data.name,
          date: new Date(this.props.data.date.seconds * 1000),
          pax: this.props.data.pax,
          seatPref: this.props.data.seatPref,
          time: this.props.data.time,
          email: this.props.data.email,
          outlet: "TCS",
        };
        fetch(
          "https://us-central1-reservations-7dd65.cloudfunctions.net/widgets/sendConfirmationMail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(mailData),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              console.log("Success");

              this.confirmSent();

              this.setState({ sending: "sent" });
            }
          });
      }
    );
  };
  render() {
    console.log(this.props.data.date);
    let date = new Date(this.props.data.date.seconds * 1000).toLocaleString(
      "en-US",
      {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }
    );
    return (
      <div className="reserve-data-box">
        <div className="header">
          <span>
            ID: <b>{this.props.data.id}</b>
          </span>
          <button
            style={
              this.props.data.declined ? { backgroundColor: "#f71b39" } : null
            }
            onClick={this.cancelReservation}
          >
            Decline
          </button>
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
          <button
            style={this.props.data.sent ? { backgroundColor: "#3ee67e" } : null}
            className="email-btn"
            onClick={this.sendConfirmation}
            disabled={this.props.data.declined}
          >
            Confirm via email
          </button>
          <button
            className="confirm-btn"
            style={
              this.props.data.confirmed ? { backgroundColor: "#3ee67e" } : null
            }
            onClick={this.confirmReserve}
            disabled={this.props.data.declined}
          >
            {this.props.data.confirmed
              ? "Confirm via mobile"
              : "Confirm via mobile"}
          </button>
          <button
            className="arrive-btn"
            style={
              this.props.data.finished ? { backgroundColor: "#3ee67e" } : null
            }
            onClick={this.confirmArrival}
            disabled={this.props.data.declined}
          >
            {this.props.data.finished ? "Arrived" : "Arrive"}
          </button>
        </div>
      </div>
    );
  }
}
