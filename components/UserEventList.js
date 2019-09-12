import React, { useState, useEffect } from "react";
import ListCard from "./ListCard";
import { Card, Empty, Button, Icon } from "antd";
import moment from "moment";
const { Meta } = Card;

export default function UserEventList() {
  const [profile, setProfile] = useState({});
  const [hostEvents, setHostEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [render, setRender] = useState(false);
  // console.log("time", Date.parse(moment()));
  useEffect(() => {
    try {
      let json = localStorage.getItem("data");
      let jsonObj = JSON.parse(json);
      setProfile(jsonObj);

      fetch(`https://share-table-backend.herokuapp.com/users/${jsonObj.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // userid: jsonObj.id,
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (!data.hosts) {
          } else {
            // console.log("joins", data.joins);
            setHostEvents(data.hosts);
            const filterJoins = data.joins.filter(
              join => join.declined != true
            );
            setJoinedEvents(filterJoins);
          }
        });
    } catch {}
  }, [render]);

  const reRender = () => {
    setRender(!render);
  };

  return (
    <div className="container">
      <div className="host-container">
        <h3>Future Hostings:</h3>
        {hostEvents.filter(
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
          hostEvents
            .filter(
              event =>
                Date.parse(event.host.date + " " + event.host.time) >=
                Date.parse(moment())
            )
            .map(event => (
              <ListCard
                event={event}
                key={event.host.id}
                isHost
                upcomingHost
                reRender={reRender}
              />
            ))
        )}
        <h3>Past Hostings:</h3>
        {hostEvents.filter(
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
          hostEvents
            .filter(
              event =>
                Date.parse(event.host.date + " " + event.host.time) <
                Date.parse(moment())
            )
            .map(event => (
              <ListCard
                event={event}
                key={event.host.id}
                isHost
                upcomingHost={false}
                reRender={reRender}
              />
            ))
        )}
      </div>
      <div className="joined-container">
        <h3>Upcoming Events:</h3>
        {joinedEvents.filter(
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
          joinedEvents
            .filter(
              event =>
                Date.parse(event.host.date + " " + event.host.time) >=
                Date.parse(moment())
            )
            .map(event => (
              <ListCard
                hostUser={event.host_user}
                joinUsers={event.join_users}
                event={event}
                isHost={false}
                key={event.host.id}
                upcomingHost={false}
                reRender={reRender}
              />
            ))
        )}
        <h3>Past Events:</h3>
        {joinedEvents.filter(
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
                key={event.host.id}
                upcomingHost={false}
                reRender={reRender}
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
          height: 100%;
        }
        h3 {
          padding: 20px 10px;
          color: #a87d59;
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

// {
//   event.joined ? <p>joined</p> : <p>join request send</p>;
// }
