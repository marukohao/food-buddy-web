import React, { useState } from "react";
// import Calendar from "react-calendar";
import { Calendar, Button, Form } from "antd";
import Router from "next/router";
const HOSTAPI = "http://localhost:7777/hosts";

const CreateNewEvent = ({ restaurant, hiddenCreate, createNewHost }) => {
  const [date, setDate] = useState();

  // const handleChange = date => {
  //   setDate(date);
  //   console.log(date);
  // };

  const onChange = (value) => {
    console.log(value.format('LL'));
    setDate(value.format("LL"));
  }

  const handleSubmit = e => {
    // e.preventDefault();
    let json = localStorage.getItem("data");
    let jsonObj = JSON.parse(json);
    hiddenCreate();
    const party = parseInt(e.target.party.value);
    const time = e.target.time.value;
    const restaurant_id = restaurant.id;
    const user_id = jsonObj.id;
    console.log(party, time, restaurant_id, user_id, date);
    fetch(HOSTAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        party: party,
        time: time,
        restaurant_id: restaurant_id,
        user_id: user_id,
        date: date
      })
    }).then(res => res.json())
    .then(data => createNewHost());
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* <Calendar onChange={handleChange} value={date} /> */}
        <Calendar fullscreen={false} onChange={onChange} />
        <input type="text" id="party" placeholder="number of party" />
        <input type="text" id="time" placeholder="time 00:00" />
        <input type="submit" value="submit" />
      </form>
      <style jsx>{`
        .container {
          height: 400px;
          width: 400px;
        }
      `}</style>
    </div>
  );
};

export default CreateNewEvent;
