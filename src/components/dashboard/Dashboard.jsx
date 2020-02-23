import React, { Component } from "react";
import { db } from "../Firebase/firebase";
import ReserveData from "./ReserveData";
import { DatePicker } from "rc-datepicker";
import "rc-datepicker/lib/style.css";

export default class Dashboard extends Component {
  state = {
    reservations: [],
    loading: true,
    date: "",
    count: 0,
    dates: []
  };
  componentDidMount() {
    db.collection("test")
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
          loading: false,
          dates: data,
          count: data.length
        });
      });
  }

  onReset = () => {
    this.setState({
      date: "",
      dates: this.state.reservations,
      count: this.state.reservations.length
    });
  };

  onDateChange = (jsDate, dateString) => {
    let newDates = [];
    this.setState(
      {
        date: jsDate
      },
      () => {
        if (this.state.date !== "") {
          let { date } = this.state;
          let calDate;
          let reserveDate;
          calDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
          newDates = this.state.reservations.filter(reserve => {
            reserveDate = `${reserve.date
              .toDate()
              .getFullYear()}-${reserve.date
              .toDate()
              .getMonth()}-${reserve.date.toDate().getDate()}`;
            return reserveDate === calDate;
          });
          this.setState({ dates: newDates, count: newDates.length });
        }
      }
    );
  };
  addCount = () => {
    let current = this.state.count;
    this.setState({
      count: current + 1
    });
  };
  /* {!this.state.loading
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
          : null} */
  render() {
    let { date } = this.state;
    let calDate;
    if (this.state.date !== "") {
      calDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }
    console.log(this.state.reservations);
    return (
      <div className="dashboard">
        <div className="dates">
          <DatePicker
            value={this.state.date}
            onChange={this.onDateChange}
          ></DatePicker>
          <div>
            <h1 style={{ color: "#000" }}>{this.state.count}</h1>
            <button className="reset" onClick={this.onReset}>
              CLEAR
            </button>
          </div>
        </div>

        {!this.state.loading
          ? this.state.dates.map(each => {
              return <ReserveData key={each.id} data={each}></ReserveData>;
            })
          : null}
      </div>
    );
  }
}
