import React, { Component } from "react";

export default class Confirmation extends Component {
  render() {
    return (
      <div className="reservation-box">
        <h1>Your reservation has been submitted!</h1>
        <h3>
          We will contact you shortly through your preferred mode of contact to
          let you know whether your reservation has been <span>confirmed</span>.
        </h3>
        <h3>Thank You!</h3>
      </div>
    );
  }
}
