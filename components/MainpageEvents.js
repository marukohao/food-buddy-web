import React, { useState, useEffect } from "react";
import MainpageEventCard from "./MainpageEventCard";

const HOSTSAPI = "https://share-table-backend.herokuapp.com/hostevents";

export default function MainpageEvents({ profile }) {
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
        if (profile.location) {
          const hostsByLocation = data.filter(
            host =>
              host.restaurant.location.toLowerCase() ==
              profile.location.toLowerCase()
          );
          console.log("check", hostsByLocation);
          setHosts(hostsByLocation);
        }
      });
  }, [profile]);

  return (
    <div className="outer-container">
      <div className="container">
        {hosts.map(host => (
          <MainpageEventCard host={host} key={host.host.id} />
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
        }
        .container {
          margin: 40px 20px;
          display: flex;
          flex-direction: row;
          overflow: scroll;
        }
      `}</style>
    </div>
  );
}
