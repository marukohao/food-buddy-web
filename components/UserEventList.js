import React, { useState, useEffect } from "react";
import ListCard from "./ListCard";
import { Card, Avatar, Button } from "antd";
import moment from "moment";
const { Meta } = Card;

export default function UserEventList() {
  const [profile, setProfile] = useState({});
  const [hostEvents, setHostEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  console.log("time", Date.parse(moment()));
  useEffect(() => {
    try {
      let json = localStorage.getItem("data");
      let jsonObj = JSON.parse(json);
      setProfile(jsonObj);

      fetch(`http://localhost:7777/users/${jsonObj.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userid: jsonObj.id,
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if(!data.hosts) {
          } else {
          console.log("joins", data.joins);
          setHostEvents(data.hosts);
          const filterJoins = data.joins.filter(join => join.declined != true)
          setJoinedEvents(filterJoins);
          } 
        });
    } catch {}
  }, []);
  
  return (
    <div className="container">
      <div className="host-container" style={{ marginRight: "40px" }}>
        <h3>Upcoming Host list:</h3>
        {hostEvents
          .filter(
            event =>
              Date.parse(event.host.date + " " + event.host.time) >=
              Date.parse(moment())
          )
          .map(event => (
            <ListCard event={event} isHost />
          ))}
        <h3>Past Host list:</h3>
        {hostEvents
          .filter(
            event =>
              Date.parse(event.host.date + " " + event.host.time) <
              Date.parse(moment())
          )
          .map(event => (
            <ListCard event={event} isHost />
          ))}
      </div>
      <div className="joined-container">
        <h3>Upcoming Joined list:</h3>
        {joinedEvents
          .filter(
            event =>
              Date.parse(event.host.date + " " + event.host.time) >=
              Date.parse(moment())
          )
          .map(event => (
            <ListCard event={event} isHost={false} key={event.id} />
          ))}
        <h3>Past Joined list:</h3>
        {joinedEvents
          .filter(
            event =>
              Date.parse(event.host.date + " " + event.host.time) <
              Date.parse(moment())
          )
          .map(event => (
            <ListCard event={event} isHost={false} key={event.id} />
          ))}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: start;
          margin: 20px;
        }
        h3 {
          color: #cfcfcf;
        }
        @media (max-width: 480px) {
          .container {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

// {
//   event.joined ? <p>joined</p> : <p>join request send</p>;
// }
