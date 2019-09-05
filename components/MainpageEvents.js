import React, { useState, useEffect } from "react";
import MainpageEventCard from "./MainpageEventCard";

const HOSTSAPI = "http://localhost:7777/hostevents";

export default function MainpageEvents() {
  const [hosts, setHosts] = useState([]);
  // const [restaurantsToDisplay, setRestaurantsToDisplay] = useState([]);

  useEffect(() => {
    fetch(HOSTSAPI, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setHosts(data);

      });
  }, []);

  return (
    <div className="outer-container">
      <div className="container">
        {hosts.map(host => (
          <MainpageEventCard host={host} />
        ))}
      </div>
      <style jsx>{`
        search {
          display: flex;
          justify-content: flex-end;
        }
        .outer-container {
          width: 80%
          display: flex;
          flex-direction: column;
          border-bottom: solid 1px lightgrey;
        }
        .container {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          overflow: scroll;
          padding: 10px;
        }
      `}</style>
    </div>
  );
}
