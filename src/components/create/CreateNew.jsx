import React, { Component } from "react";
import db from "../Firebase/firebase";
import { DatePicker, TimePicker } from "antd";

export default class CreateNew extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      mobile: "",
      email: "",
      pax: 0,
      date: "",
      time: "",
      remarks: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newReserve = {
      outlet: "TCS",
      name: this.state.name,
      mobile: this.state.mobile,
      email: this.state.email,
      pax: this.state.pax,
      date: new Date(this.state.date),
      time: this.state.time,
      remarks: this.state.remarks,
      finished: false,
      createdAt: new Date()
    };

    db.collection("reservations").add(newReserve);
  };
  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              value={this.state.name}
              onChange={this.onChange}
              id="name"
              type="text"
            ></input>
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              value={this.state.mobile}
              onChange={this.onChange}
              id="mobile"
              type="text"
            ></input>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              value={this.state.email}
              onChange={this.onChange}
              id="email"
              type="Email"
            ></input>
          </div>
          <div className="form-group">
            <label>No of Pax</label>
            <input
              value={this.state.pax}
              onChange={this.onChange}
              type="number"
              id="pax"
            ></input>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              value={this.state.date}
              onChange={this.onChange}
              type="date"
              id="date"
            ></input>
          </div>
          <div className="form-group">
            <label>Time</label>
            <input
              value={this.state.time}
              onChange={this.onChange}
              type="time"
              id="time"
            ></input>
          </div>
          <div className="form-group">
            <label>Remarks</label>
            <textarea
              value={this.state.remarks}
              onChange={this.onChange}
              id="remarks"
            ></textarea>
          </div>
          <button type="submit" onClick={this.onSubmit}>
            submit
          </button>
        </form>
      </div>
    );
  }
}
