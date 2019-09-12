import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  Popover,
  Button,
  Badge,
  Popconfirm,
  Icon,
  Drawer
} from "antd";
import Router from "next/router";
import MessagesContainer from "./MessagesContainer";

const { Meta } = Card;

export default function ListCard({
  event,
  isHost,
  upcomingHost,
  reRender,
  user,
  hostUser,
  joinUsers
}) {
  const [visible, setVisible] = useState(false);
  const [profile, setProfile] = useState();
  const [notification, setNotification] = useState([]);

  let json = localStorage.getItem("data");
  let jsonObj = JSON.parse(json);
  let joinEventmember;
  let hostEventmember;
  if (!user) {
    if (!isHost) {
      joinEventmember = [...joinUsers, hostUser];
    }
    if (isHost) {
      hostEventmember = [...event.joined_users, jsonObj];
    }
  }

  useEffect(() => {
    try {
      let json = localStorage.getItem("data");
      let jsonObj = JSON.parse(json);
      setProfile(jsonObj);
      fetch(`https://share-table-backend.herokuapp.com/notifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          // console.log(data, event.host.id);
          const notification = data.filter(
            notification =>
              notification.host_id == event.host.id &&
              notification.user_id == jsonObj.id
          );
          // console.log(notification.new, notification)
          setNotification(notification[0]);
        });
    } catch {}
  }, []);

  const handleClick = user => {
    if (user.id != jsonObj.id) {
      Router.push(`/users/${user.id}`);
    }
  };

  const handleCancelClick = () => {
    fetch("https://share-table-backend.herokuapp.com/hosts" + "/" + event.host.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        cancelled: true
      })
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        reRender();
      });
  };

  const showDrawer = () => {
    setVisible(true);
    if (notification) {
      fetch("https://share-table-backend.herokuapp.com/notifications/" + notification.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify({
          new: false
        })
      })
        .then(resp => resp.json())
        .then(data => setNotification(data.new));
    }
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Card
        className="card"
        style={{
          opacity: "0.9",
          boxShadow: "2px 2px 5px lightgrey",
          borderRadius: "3px",
          marginBottom: "15px"
        }}
      >
        {event.host.cancelled && isHost ? (
          <p style={{ color: "orange" }}>Cancelled</p>
        ) : null}
        {isHost ? null : event.host.cancelled ? (
          <p style={{ color: "orange" }}>cancelled by host</p>
        ) : event.joined ? null : (
          <p style={{ color: "orange" }}>join request sent</p>
        )}
        <Meta
          avatar={<Avatar src={event.restaurant_image} size={64} />}
          title={event.restaurant_name}
          description={event.host.time + " " + event.host.date}
        />
        {/* <p>{event.host.time + " " + event.host.date}</p> */}
        <p style={{ color: "grey", marginTop: "10px", marginLeft: "60px" }}>
          party size: {event.host.party}
        </p>
        {isHost && !user ? (
          <p>
            Attendees:
            {hostEventmember.map(user => (
              <Popover
                style={{ opcity: "0.5" }}
                content={user.username}
                trigger="hover"
                key={user.id}
              >
                <Avatar
                  style={{ margin: "5px", cursor: "pointer" }}
                  size="medium"
                  icon="user"
                  src={user.avatar}
                  onClick={() => handleClick(user)}
                />
              </Popover>
            ))}
          </p>
        ) : null}
        {!isHost && !user ? (
          <p>
            Attendees:
            {joinEventmember.map(user => (
              <Popover
                style={{ opcity: "0.5" }}
                content={user.username}
                trigger="hover"
                key={user.id}
              >
                <Avatar
                  style={{ margin: "5px", cursor: "pointer" }}
                  size="medium"
                  icon="user"
                  src={user.avatar}
                  onClick={() => handleClick(user)}
                />
              </Popover>
            ))}
          </p>
        ) : null}
        <div className="bottom-container">
          {upcomingHost && !event.host.cancelled ? (
            <Popconfirm
              title="Are you sure to cancel this event？"
              icon={<Icon type="question-circle-o" style={{ color: "red" }} />}
              onConfirm={handleCancelClick}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{
                  marginLeft: "161px",
                  marginBottom: "-33px",
                  display: "inherit"
                }}
              >
                cancel event
              </Button>
            </Popconfirm>
          ) : null}
          {user ? null : event.joined === null ? null : (
            <Badge
              dot={notification ? notification.new : false}
              style={{ width: "5px" }}
            >
              <a href="#" className="head-example" />
              <p
                onClick={showDrawer}
                style={{ cursor: "pointer", marginTop: "10px" }}
              >
                {notification ? (
                  notification.new ? (
                    <p style={{ color: "red" }}>
                      <Icon type="message" style={{ marginRight: "7px" }} />
                      new message
                    </p>
                  ) : (
                    <p
                      onClick={showDrawer}
                      style={{ cursor: "pointer", marginTop: "10px" }}
                    >
                      <Icon type="message" style={{ marginRight: "7px" }} />
                      leave a message
                    </p>
                  )
                ) : (
                  <p
                    onClick={showDrawer}
                    style={{ cursor: "pointer", marginTop: "10px" }}
                  >
                    <Icon type="message" style={{ marginRight: "7px" }} />
                    leave a message
                  </p>
                )}
              </p>
            </Badge>
          )}
        </div>
      </Card>
      <Drawer
      width={350}
        title={"Event messages"}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        style={{ height: "100vh" }}
      >
        <MessagesContainer
          host={event.host}
          hosts={hostEventmember}
          joins={joinEventmember}
        />
      </Drawer>
      <style>{`
        @media (max-width: 480px) {
          Card {
            width: 200px;
          }
        }
      `}</style>
    </div>
  );
}
