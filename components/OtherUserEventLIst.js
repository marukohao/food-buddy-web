import React from "react";
import ListCard from "./ListCard";
import { Card, Empty } from "antd";
import moment from "moment";
const { Meta } = Card;

export default function OtherUserEventList({hostEvents, joinedEvents, user}) {

  return (
    <div className="container">
      <div className="host-container" style={{ marginRight: "40px" }}>
        <h3>Upcoming Host list:</h3>
        {hostEvents.filter(
          event =>
            Date.parse(event.host.date + " " + event.host.time) >=
            Date.parse(moment())
        ).length == 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          hostEvents
            .filter(
              event =>
                Date.parse(event.host.date + " " + event.host.time) >=
                Date.parse(moment())
            )
            .map(event => <ListCard event={event} isHost user={user}/>)
        )}
        <h3>Past Host list:</h3>
        {hostEvents.filter(
          event =>
            Date.parse(event.host.date + " " + event.host.time) <
            Date.parse(moment())
        ).length == 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          hostEvents
            .filter(
              event =>
                Date.parse(event.host.date + " " + event.host.time) <
                Date.parse(moment())
            )
            .map(event => (
              <ListCard event={event} key={event.host.id} user={user} isHost />
            ))
        )}
      </div>
      <div className="joined-container">
        <h3>Upcoming Joined list:</h3>
        {joinedEvents.filter(
          event =>
            Date.parse(event.host.date + " " + event.host.time) >=
            Date.parse(moment())
        ).length == 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          joinedEvents
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
            ))
        )}
        <h3>Past Joined list:</h3>
        {joinedEvents.filter(
          event =>
            Date.parse(event.host.date + " " + event.host.time) <
            Date.parse(moment())
        ).length == 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          joinedEvents
            .filter(
              event =>
                Date.parse(event.host.date + " " + event.host.time) <
                Date.parse(moment())
            )
            .map(event => (
              <ListCard event={event} isHost={false} key={event.id} user={user}/>
            ))
        )}
      </div>
      <style jsx>{`
        .host-container {
          height: 100vh;
          overflow: scroll;
          width: 400px;
        }
        .joined-container {
          height: 100vh;
          overflow: scroll;
          width: 400px;
        }
        .container {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: start;
        }
        h3 {
          padding: 20px;
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
