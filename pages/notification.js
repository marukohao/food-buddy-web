import React, { useState, useEffect } from "react";
import Layouts from "../components/Layouts";
import NotificationList from "../components/NotificationList";

export default function Notification() {
  const [profile, setProfile] = useState({});
  const [hosts, setHosts] = useState([]);
  const [joins, setJoins] = useState([]);

  useEffect(() => {
    try {
      let json = localStorage.getItem("data");
      let jsonObj = JSON.parse(json);
      setProfile(jsonObj);

      fetch(`http://localhost:7777/notification`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userid: jsonObj.id,
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          setHosts(data);
        });
      
      fetch(`http://localhost:7777/notifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userid: jsonObj.id,
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          // console.log(data)
          setJoins(data);
        });

    } catch {}
  }, []);

  return (
  <Layouts>
    <NotificationList responseJoins={joins} requestJoins={hosts}/>
  </Layouts>
  );
}
