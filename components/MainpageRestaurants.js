import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";

const RESTAURANTAPI = "http://localhost:7777/restaurants";

export default function RestaurantContainer() {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsToDisplay, setRestaurantsToDisplay] = useState([]);

  useEffect(() => {
    fetch(RESTAURANTAPI, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setRestaurants(data);
        setRestaurantsToDisplay([...data]);
      });
  }, []);

  return (
    <div className="outer-container">
      <div className="container">
        {restaurantsToDisplay.map(restaurant => (
          <RestaurantCard restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
      <style jsx>{`
        search {
          display: flex;
          justify-content: flex-end;
        }
        .outer-container {
          width: 80%
          display: flex;
          flex-direction: column;
          border-bottom: solid 1px lightgrey;
        }
        .container {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          overflow: scroll;
          padding: 10px;
        }
      `}</style>
    </div>
  );
}
