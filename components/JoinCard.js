import React, { useState } from "react";
import { Card, Avatar, Button, notification } from "antd";

const { Meta } = Card;
const JOINAPI = "http://localhost:7777/joins";

export default function JoinCard({ join, restaurantName, host, joinedNumber, reRender }) {
  const [clicked, setClicked] = useState(false);
  const [accept, setAccept] = useState(false);
  const [decline, setDecline] = useState(false);

  const handleAcceptClick = () => {
    if (Number(joinedNumber) < Number(host.party)) {
      const joinId = join.join.id;
      fetch(JOINAPI + "/" + joinId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify({
          joined: true
        })
      })
        .then(resp => resp.json())
        .then(data => {
          reRender();
          setClicked(true);
          setAccept(true);
          console.log("accept", data);
          notification["success"]({
            message: "you have accepted this request"
          });
        });
    }else {
      notification["warning"]({
        message: "You have reached the maximum party number"
      });      
    }
  };

  const handleDeclineClick = () => {
    const joinId = join.join.id;
    fetch(JOINAPI + "/" + joinId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        declined: true
      })
    })
      .then(resp => resp.json())
      .then(data => {
        setClicked(true);
        setDecline(true);
        notification["error"]({
          message: "you have declined this request"
          // description:
          //   "This is the content of the notification. This is the content of the notification. This is the content of the notification."
        });
      });
  };

  return (
    <Card
      style={{
        width: 350,
        margin: "20px",
        boxShadow: "2px 2px 5px lightgrey",
        opacity: "0.8"
      }}
    >
      <p>
        <Avatar src={join.user.avatar} style={{ marginRight: "7px"}}/>
        {join.user.username} requests to join
      </p>
      <Meta
        title={restaurantName}
        description={host.time + " " + host.date}
      />
      <p>party number: {host.party}</p>
      <p>remaining: {host.party - joinedNumber}</p>
      {accept || join.join.joined ? <p style={{color: "green"}}>accepted</p> : null}
      {decline || join.join.declined ? <p style={{color: "red"}}>declined</p> : null}
      {clicked || join.join.joined || join.join.declined ? null : (
        <div>
          <Button
            onClick={handleAcceptClick}
            style={{
              backgroundColor: "green",
              color: "white",
              marginRight: "70%"
            }}
            shape="round"
            icon="check"
          />

          <Button
            onClick={handleDeclineClick}
            style={{ backgroundColor: "red", color: "white" }}
            shape="round"
            icon="close"
          />
        </div>
      )}

      <style jsx>{`
        img {
          height: 200px;
          width: 280px;
        }
      `}</style>
    </Card>
  );
}
