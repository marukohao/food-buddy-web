import React, { useState, useEffect } from "react";
import { Card, Avatar, Button, message, Popover } from "antd";
import Router from "next/router";

const { Meta } = Card;
const JOINAPI = "http://localhost:7777/joins";

export default function EventCard({ event, eventUser, joinUsers }) {
  let json = localStorage.getItem("data");
  let jsonObj = JSON.parse(json);
  let Id = eventUser.id;

  const handleClick = () => {
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
        if (!data.errors) {
          console.log(data);
          message.success("Your request has been sent to host");
        } else {
          message.error("You have already sent a request");
        }
      });
  };

  const handleUserClick = user => {
    Router.push(`/users/${user.id}`);
  };

  const handleHostClick = id => {
    Router.push(`/users/${id}`);
  };

  return (
    <div>
      <Card
        style={{
          width: 350,
          margin: "20px",
          opacity: "0.85",
          borderRadius: "3px"
        }}
      >
        <Meta
          avatar={
            <Avatar
              onClick={() => handleHostClick(eventUser.id)}
              size={64}
              icon="user"
              src={eventUser.avatar}
              style={{ cursor: "pointer", opacity: "1" }}
            />
          }
          title={eventUser.username}
          description={event.time + " " + event.date}
        />
        <p style={{ color: "grey" }}>party number: {event.party}</p>
        {jsonObj.id == eventUser.id ? null : (
          <Button onClick={handleClick} style={{ itemAlign: "center" }}>
            Join
          </Button>
        )}
        <p>
          {joinUsers.map(user => (
            <Popover content={user.username}>
              <Avatar
                onClick={() => handleUserClick(user)}
                style={{ marginRight: "5px", cursor: "pointer" }}
                size="medium"
                icon="user"
                src={user.avatar}
                key={user.id}
              />
            </Popover>
          ))}{" "}
        </p>
      </Card>
    </div>
  );
}
