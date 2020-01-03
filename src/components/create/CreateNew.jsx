import React, { Component } from "react";
import db from "../Firebase/firebase";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";

export default class CreateNew extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      mobile: "",
      email: "",
      pax: 0,
      date: "",
      time: moment(),
      seatPref: "",
      contactPref: "",
      remarks: ""
    };
    this.onTimeChange = this.onTimeChange.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onTimeChange(value) {
    // do something
    console.log(value && value.format("HH:mm"));
    this.setState({ time: value });
  }

  onSubmit = e => {
    e.preventDefault();

    const newReserve = {
      outlet: "TCS",
      name: this.state.name,
      mobile: this.state.mobile,
      email: this.state.email,
      pax: this.state.pax,
      date: new Date(this.state.date),
      time: this.state.time.format("HH:mm"),
      seatPref: this.state.seatPref,
      contactPref: this.state.contactPref,
      remarks: this.state.remarks,
      finished: false,
      createdAt: new Date(),
      confirmed: false
    };

    db.collection("reservations").add(newReserve);
  };
  render() {
    return (
      <div id="create">
        <h1>Reserve A Table!</h1>
        <form>
          <div className="form-row">
            <div className="form-col">
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
                <label>Mobile No</label>
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
            </div>
            <div className="form-col">
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
                <TimePicker
                  defaultValue={this.state.value}
                  showSecond={false}
                  onChange={this.onTimeChange}
                  allowEmpty={false}
                ></TimePicker>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Seat Preference:</label>
              <div className="radio-div">
                <input
                  value="indoor"
                  onChange={this.onChange}
                  id="seatPref"
                  name="seatPref"
                  type="radio"
                ></input>
                <span>Indoor</span>
              </div>
              <div className="radio-div">
                <input
                  value="outdoor"
                  onChange={this.onChange}
                  id="seatPref"
                  name="seatPref"
                  type="radio"
                ></input>
                <span>Outdoor</span>
              </div>
              <div className="radio-div">
                <input
                  value="Bar"
                  onChange={this.onChange}
                  id="seatPref"
                  name="seatPref"
                  type="radio"
                ></input>
                <span>Bar</span>
              </div>
            </div>
            <div className="form-group">
              <label>You wish to be contacted by:</label>
              <div className="radio-div">
                <input
                  value="mobile"
                  onChange={this.onChange}
                  id="contactPref"
                  name="contactPref"
                  type="radio"
                ></input>
                <span>Mobile</span>
              </div>
              <div className="radio-div">
                <input
                  value="Email"
                  onChange={this.onChange}
                  id="contactPref"
                  name="contactPref"
                  type="radio"
                ></input>
                <span>Email</span>
              </div>
            </div>
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
        <div id="note">
          <span>
            If your reservation is for today, call us instead - 6475 0105. A
            grace period of 15mins will be given from your reservation time.
            Friday, Saturday & Eve of PH reservation timing up to 9:30pm.{" "}
          </span>
        </div>
      </div>
    );
  }
}
