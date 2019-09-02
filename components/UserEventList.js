import React, { useState, useEffect } from "react";
import ListCard from "./ListCard";
import { Card, Avatar, Button } from "antd";
const { Meta } = Card;

export default function UserEventList() {
  const [profile, setProfile] = useState({});
  const [hostEvents, setHostEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);

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
          console.log(data.joins);
          setHostEvents(data.hosts);
          setJoinedEvents(data.joins);
        });
    } catch {}
  }, []);

  return (
    <div className="container">
      <div className="host-container">
        <h3>Host list:</h3>
        {hostEvents.map(event => (
          <ListCard event={event} isHost />
        ))}
      </div>
      <div className="joined-container">
        <h3>Joined list:</h3>
        {joinedEvents.map(event => (
          <ListCard event={event} isHost={false} />
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
      `}</style>
    </div>
  );
}

// {
//   event.joined ? <p>joined</p> : <p>join request send</p>;
// }
