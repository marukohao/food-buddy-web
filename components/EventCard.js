import React, { useState, useEffect } from "react";
import { Card, Avatar, Button} from "antd";

const { Meta } = Card;
const JOINAPI = "http://localhost:7777/joins";


export default function EventCard ({event, eventUser, joinUsers}) {
  let json = localStorage.getItem("data");
  let jsonObj = JSON.parse(json);
  
  const handleClick = () => {
    console.log(jsonObj.id, event.id)
    fetch(JOINAPI, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: jsonObj.id,
        host_id: event.id
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  }

  return (
    <div>
      <Card
        // extra={<a href="#">More</a>}
        style={{ width: 350, margin: "20px" }}
      >
        <Meta
          avatar={<Avatar size={64} icon="user" src={eventUser.avatar} />}
          title={eventUser.username}
          description={event.time + " " + event.date}
        />
        <p style={{ color: "grey" }}>party number: {event.party}</p>
        {jsonObj.id == eventUser.id ? null : (
          <Button onClick={handleClick} style={{ itemAlign: "center" }}>
            Join
          </Button>
        )}
        <p>{joinUsers.map(user => (
          <Avatar size="small" icon="user" src={user.avatar} key={user}/>
        ))} </p>
      </Card>
    </div>
  );
}