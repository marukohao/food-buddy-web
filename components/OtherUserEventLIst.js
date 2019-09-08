import React from "react";
import ListCard from "./ListCard";
import { Card } from "antd";
import moment from "moment";
const { Meta } = Card;

export default function OtherUserEventList({hostEvents, joinedEvents, user}) {

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
            <ListCard event={event} key={event.host.id} user={user} isHost />
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
            <ListCard
              event={event}
              isHost={false}
              user={user}
              key={event.host.id}
            />
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
        .host-container {
          height: 100vh;
          overflow: scroll;
        }
        .joined-container {
          height: 100vh;
          overflow: scroll;
        }
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
