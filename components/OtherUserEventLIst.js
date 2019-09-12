import React from "react";
import ListCard from "./ListCard";
import { Card, Empty } from "antd";
import moment from "moment";

export default function OtherUserEventList({ hostEvents, joinedEvents, user }) {
  return (
    <div className="container">
      <div className="host-container">
        <h3>Upcoming Host list:</h3>
        {hostEvents.filter(
          event =>
            Date.parse(event.host.date + " " + event.host.time) >=
            Date.parse(moment())
        ).length == 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ margin: "0 0 20px 20px", display: "flex" }}
            description="No Events"
          />
        ) : (
          hostEvents
            .filter(
              event =>
                Date.parse(event.host.date + " " + event.host.time) >=
                Date.parse(moment())
            )
            .map(event => <ListCard event={event} isHost user={user} />)
        )}
        <h3>Past Host list:</h3>
        {hostEvents.filter(
          event =>
            Date.parse(event.host.date + " " + event.host.time) <
            Date.parse(moment())
        ).length == 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ margin: "0 0 20px 20px", display: "flex" }}
            description="No Events"
          />
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
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Events"
            style={{ margin: "0 0 20px 20px", display: "flex" }}
          />
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
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Events"
            style={{ margin: "0 0 20px 20px", display: "flex" }}
          />
        ) : (
          joinedEvents
            .filter(
              event =>
                Date.parse(event.host.date + " " + event.host.time) <
                Date.parse(moment())
            )
            .map(event => (
              <ListCard
                event={event}
                isHost={false}
                key={event.id}
                user={user}
              />
            ))
        )}
      </div>
      <style jsx>{`
        .host-container,
        .joined-container {
          padding: 20px 0;
          overflow: auto;
          width: 100%;
          max-width: 400px;
        }
        .container {
          display: flex;
          flex-direction: row;
          align-items: start;
          flex-direction: column;
        }
        h3 {
          padding: 20px;
          color: #cfcfcf;
        }
        @media (min-width: 480px) {
          .container {
            width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .host-container,
          .joined-container {
            height: 100%;
            margin: 0 30px;
          }
        }
      `}</style>
    </div>
  );
}
