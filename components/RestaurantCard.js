import React, { useState } from "react";
import Router from "next/router";
import { Card, Icon, Avatar } from "antd";

const { Meta } = Card;

export default function RestaurantCard({restaurant}) {
  // const [restaurants, setRestaurants] = useState([]);

  const handleClick = () => {
    Router.push(`/restaurant/${restaurant.id}`);
    console.log(restaurant)
  }

  return (
    <Card
      hoverable
      style={{ width: 280, marginRight: "20px", marginBottom: "20px", boxShadow: "2px 2px 5px lightgrey" }}
      cover={
        <img alt="example" src={restaurant.image_url} onClick={handleClick} />
      }
    >
      <Meta
        // avatar={<Avatar src={restaurant.image_url} />}
        title={restaurant.name}
        description={restaurant.category + "  📍" + restaurant.location}
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
