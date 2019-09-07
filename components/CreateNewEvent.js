import React, { useState } from "react";
// import Calendar from "react-calendar";
import { Calendar, Input, Button, message, Drawer } from "antd";
import { connect } from "react-redux";
import { addEvent } from "../redux/action";
import moment from "moment";
const HOSTAPI = "http://localhost:7777/hosts";

const CreateNewEvent = ({ restaurant, hiddenCreate, addEvent, events }) => {
  const [date, setDate] = useState(moment().format("LL"));
  const [inValidInput, setInValidInput] = useState(false);

  // const handleChange = date => {
  //   setDate(date);
  //   console.log(date);
  // };

  const onChange = value => {
    console.log(value.format("LL"));
    setDate(value.format("LL"));
  };

  const handleSubmit = e => {
    e.preventDefault();
    let json = localStorage.getItem("data");
    let jsonObj = JSON.parse(json);
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
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.errors);
        if (data.errors != undefined) {
          message.error(
            "input can't be blank / you have already created a event on this date"
          );
          setInValidInput(true);
        } else {
          addEvent(data)
          hiddenCreate();
          message.success("A new event has been created");
        }
      });
  };

  const handleClick = () => {
    hiddenCreate();
  };

  // add "you have already created a event on this date", calender default date is today's date

  return (
    <Drawer placement="left" closable={false} visible={true} >
      {/* <div className="outer-container">
        <div className="container"> */}
          {/* {inValidInput ? (
          <p>
            input can't be blank / you have already created a event on this date
          </p>
        ) : null} */}
          <form onSubmit={handleSubmit}>
            {/* <Calendar onChange={handleChange} value={date} /> */}
            <Calendar fullscreen={false} onChange={onChange} />
            <Input
              style={{ width: "60%", margin: "10px" }}
              type="text"
              id="party"
              placeholder="number of party"
            />
            <Input
              style={{ width: "60%", margin: "10px" }}
              type="text"
              id="time"
              placeholder="time 00:00"
            />
            <Input
              style={{ width: "60%", margin: "10px" }}
              type="submit"
              value="submit"
            />
          </form>
          <Button
            style={{ width: "50%", margin: "50px" }}
            type="primary"
            onClick={handleClick}
          >
            Exit
          </Button>
          <style jsx>{`
            .outer-container {
              width: 100vw;
              height: 100vh;
            }
            .container {
              opacity: 0.85;
              position: fixed;
              left: 40%;
              top: 25%;
              height: 50%;
              width: 20%;
              background-color: white;
              padding: 40px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            form {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
          `}</style>
        {/* </div>
      </div> */}
    </Drawer>
  );
};

const mapStateToProps = state => {
  const { events } = state;
  return { events };
};

const mapDispatchToProps = {
  addEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNewEvent);
