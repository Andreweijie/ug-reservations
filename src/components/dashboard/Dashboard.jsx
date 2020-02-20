import React, { Component } from "react";
import { db } from "../Firebase/firebase";
import ReserveData from "./ReserveData";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";

export default class Dashboard extends Component {
  state = {
    reservations: [],
    loading: true,
    date: "",
    count: 0
  };
  componentDidMount() {
    db.collection("reservations")
      .where("outlet", "==", "TCS")
      .orderBy("createdAt", "desc")
      .onSnapshot(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => {
          let info = doc.data();
          data.push({ ...info, id: doc.id });
        });
        this.setState({
          reservations: data,
          loading: false
        });
      });
  }

  onDateChange = (jsDate, dateString) => {
    this.setState(
      {
        date: jsDate
      },
      console.log(jsDate)
    );
  };
  addCount = () => {
    let current = this.state.count;
    this.setState({
      count: current + 1
    });
  };
  render() {
    let { date } = this.state;
    let calDate;
    if (this.state.date !== "") {
      calDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }

    return (
      <div className="dashboard">
        <DatePicker
          value={this.state.date}
          onChange={this.onDateChange}
        ></DatePicker>
        <h1>{this.state.count}</h1>
        {!this.state.loading
          ? this.state.reservations.map(each => {
              if (this.state.date == "") {
                return <ReserveData key={each.id} data={each}></ReserveData>;
              } else {
                let reserveDate = `${each.date
                  .toDate()
                  .getFullYear()}-${each.date
                  .toDate()
                  .getMonth()}-${each.date.toDate().getDate()}`;
                if (reserveDate === calDate) {
                  return <ReserveData key={each.id} data={each}></ReserveData>;
                } else {
                  console.log("fail");
                  return null;
                }
              }
            })
          : null}
      </div>
    );
  }
}
