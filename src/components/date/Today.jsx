import React, { Component } from "react";
import { db } from "../Firebase/firebase";
import ReserveData from "../dashboard/ReserveData";
import Summary from "../dashboard/Summary";

export default class Today extends Component {
  state = {
    reservations: [],
    loading: true
  };
  componentDidMount() {
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    db.collection("test")
      .where("outlet", "==", "TCS")
      .where("date", ">=", new Date(year, month, day, 0, 0, 0, 0))
      .where("date", "<=", new Date(year, month, day, 23, 0, 0, 0))
      .onSnapshot(querySnapshot => {
        console.log(querySnapshot);
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
  render() {
    console.log(this.state.reservations);
    return (
      <div className="dashboard">
        {!this.state.loading
          ? this.state.reservations.map(each => {
              return <Summary key={each.id} data={each}></Summary>;
            })
          : null}
      </div>
    );
  }
}
