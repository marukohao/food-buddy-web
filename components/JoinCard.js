import React, { useState } from "react";
import { Card, Icon, Avatar, Button, notification } from "antd";

const { Meta } = Card;
const JOINAPI = "http://localhost:7777/joins";

export default function JoinCard({ join, restaurantName, host, joinedNumber }) {
  const [clicked, setClicked] = useState(false);
  const [accept, setAccept] = useState(false);
  const [decline, setDecline] = useState(false);

  const handleAcceptClick = () => {
    if(Number(joinedNumber) < Number(host.party)) {
    // console.log("accept", join, host)
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
       setClicked(true);
       setAccept(true);
       console.log("accept", data)
        notification['success']({
        message: "you have accepted this request",
        // description:
        //   "This is the content of the notification. This is the content of the notification. This is the content of the notification."
      });

    })
  }
  }

  const handleDeclineClick = () => {
    // console.log("accept");
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
        console.log("declined", data)
        notification["error"]({
          message: "you have declined this request",
          // description:
          //   "This is the content of the notification. This is the content of the notification. This is the content of the notification."
        });
      });
  }

  return (
    <Card
      style={{
        width: 350,
        margin: "20px",
        boxShadow: "2px 2px 5px lightgrey",
        opacity: "0.7"
      }}
    >
      <p>
        <Avatar src={join.user.avatar} />
        {join.user.username} requests to join
      </p>
      <Meta
        // avatar={<Avatar src={join.user.avatar} />}
        title={restaurantName}
        description={host.time + " " + host.date}
      />
      <p>party number: {host.party}</p>
      <p>remaining:</p>
      {accept ? <p>accepted</p> : null}
      {decline ? <p>declined</p> : null}
      {clicked ? null : (
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
