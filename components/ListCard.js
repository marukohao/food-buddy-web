import React, { useState, useEffect } from "react";
import { Card, Avatar, Button } from "antd";

const { Meta } = Card;

export default function ListCard({ event, isHost}) {
  let json = localStorage.getItem("data");
  let jsonObj = JSON.parse(json);


  return (
    <div>
      <Card
        // extra={<a href="#">More</a>}
        style={{ width: 350, margin: "20px" }}
      >
        <Meta
          // avatar={<Avatar size={64} icon="user" src={eventUser.avatar} />}
          // title={eventUser.username}
          description={event.time + " " + event.date}
        />
        <p style={{ color: "grey" }}>party number: {event.party}</p>
        {isHost ? null : (event.joined ? null : <p>join request send</p>)}
        {/* <p>
          {joinUsers.map(user => (
            <Avatar size="small" icon="user" src={user.avatar} key={user} />
          ))}{" "}
        </p> */}
      </Card>
    </div>
  );
}
