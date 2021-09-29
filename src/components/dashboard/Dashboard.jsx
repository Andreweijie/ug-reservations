import React, { Component } from "react";
import { db } from "../Firebase/firebase";
import ReserveData from "./ReserveData";

export default class Dashboard extends Component {
  state = {
    reservations: [],
    loading: true,
  };
  componentDidMount() {
    db.collection("reservations")
      .where("outlet", "==", "TCS")
      .orderBy("createdAt", "desc")
      .limit(50)
      .onSnapshot((querySnapshot) => {
        console.log(querySnapshot);
        let data = [];
        querySnapshot.forEach((doc) => {
          let info = doc.data();
          data.push({ ...info, id: doc.id });
        });
        this.setState({
          reservations: data,
          loading: false,
        });
      });
  }
  render() {
    console.log(this.state.reservations);
    return (
      <div className="dashboard">
        {!this.state.loading
          ? this.state.reservations.map((each) => {
              return <ReserveData key={each.id} data={each}></ReserveData>;
            })
          : null}
      </div>
    );
  }
}
