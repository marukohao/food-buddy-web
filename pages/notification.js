import React, { useState, useEffect } from "react";
import Layouts from "../components/Layouts";
import NotificationList from "../components/NotificationList";

export default function Notification() {
  const [profile, setProfile] = useState({});
  const [hosts, setHosts] = useState([]);
  const [joins, setJoins] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    try {
      let json = localStorage.getItem("data");
      let jsonObj = JSON.parse(json);
      setProfile(jsonObj);

      fetch(`https://share-table-backend.herokuapp.com/notification`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userid: jsonObj.id,
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data);
          setHosts(data);
        });

      fetch(`https://share-table-backend.herokuapp.com/notification1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userid: jsonObj.id,
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data);
          setJoins(data);
        });
    } catch {}
  }, [render]);

  const reRender = () => {
    setRender(!render);
  };

  return (
    <Layouts>
      <NotificationList
        reRender={reRender}
        responseJoins={joins}
        requestJoins={hosts}
      />
    </Layouts>
  );
}
