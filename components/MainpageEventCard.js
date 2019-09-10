import React, { useState } from "react";
import Router from "next/router";
import { Card, Avatar } from "antd";

const { Meta } = Card;

export default function MainpageEventCard({ host }) {

  const handleClick = () => {
    Router.push(`/restaurant/${host.restaurant.id}`);
    console.log(restaurant);
  };

  return (
    <Card
      hoverable
      title={host.hoster.username}
      style={{
        width: "300px",
        margin: "20px",
        boxShadow: "2px 2px 5px lightgrey",
        overflowWrap: "break-word"
      }}
      onClick={handleClick}
      // cover={
      //   <img alt="example" src={host.restaurant.image_url} onClick={handleClick} />
      // }
    >
      <Meta
        avatar={<Avatar src={host.restaurant.image_url} size="large" />}
        title={host.restaurant.name}
        description={host.host.time + " " + host.host.date}
        style={{ width: "300px", overflowWrap: "break-word", wordWrap: "break-word" }}
      />
      <style jsx>{`
        img {
          height: 200px;
          width: 280px;
        }
      `}</style>
    </Card>
  );
}

<Avatar shape="square" icon="user" />;
