import React, { Component } from "react";
import { db } from "../Firebase/firebase";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import moment from "moment";
import "moment/locale/en-SG";

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
      remarks: "",
      loading: "submit"
    };
    this.onTimeChange = this.onTimeChange.bind(this);
  }

  onChange = e => {
    console.log(this.state.date);
    this.setState({ [e.target.id]: e.target.value });
  };
  onDateChange = (jsDate, dateString) => {
    this.setState(
      {
        date: dateString.slice(0, 10)
      },
      console.log(this.state.date)
    );
  };
  onTimeChange(value) {
    // do something
    console.log(value && value.format("HH:mm"));
    this.setState({ time: value });
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      loading: "submitting..."
    });
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

    db.collection("test").add(newReserve);

    /*fetch(
      "https://us-central1-reservations-7dd65.cloudfunctions.net/widgets/sendReservationMail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newReserve)
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.message) {
          console.log("success");
          this.props.history.replace("/confirmation");
        } else {
          console.log("Failed");
        }
      });*/
  };
  render() {
    return (
      <div id="create">
        <h1>Reserve A Table!</h1>
        <form>
          <div className="form-group">
            <label>Name*</label>
            <input
              required
              value={this.state.name}
              onChange={this.onChange}
              id="name"
              type="text"
            ></input>
          </div>
          <div className="form-group">
            <label>Mobile No*</label>
            <input
              required
              value={this.state.mobile}
              onChange={this.onChange}
              id="mobile"
              type="text"
            ></input>
          </div>
          <div className="form-group">
            <label>Email*</label>
            <input
              required
              value={this.state.email}
              onChange={this.onChange}
              id="email"
              type="Email"
            ></input>
          </div>

          <div className="form-group">
            <label>No of Pax*</label>
            <input
              required
              min="1"
              value={this.state.pax}
              onChange={this.onChange}
              type="number"
              id="pax"
            ></input>
          </div>
          <div className="form-group">
            <label>Date*</label>
            <DatePickerInput
              value={this.state.date}
              onChange={this.onDateChange}
              minDate={new Date()}
            ></DatePickerInput>
          </div>
          <div className="form-group">
            <label>Time*</label>
            <TimePicker
              defaultValue={this.state.value}
              showSecond={false}
              onChange={this.onTimeChange}
              allowEmpty={false}
              minuteStep={15}
            ></TimePicker>
          </div>
          <div className="form-group">
            <label>Seat Preference:*</label>
            <div className="radio-div">
              <input
                required
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
                required
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
                required
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
            <label>You wish to be contacted by:*</label>
            <div className="radio-div">
              <input
                required
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
                required
                value="Email"
                onChange={this.onChange}
                id="contactPref"
                name="contactPref"
                type="radio"
              ></input>
              <span>Email</span>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Remarks</label>
            <textarea
              value={this.state.remarks}
              onChange={this.onChange}
              id="remarks"
            ></textarea>
          </div>

          <button className="full-width" type="submit" onClick={this.onSubmit}>
            {this.state.loading}
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
