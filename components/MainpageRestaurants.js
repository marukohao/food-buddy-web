import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";

const RESTAURANTAPI = "http://localhost:7777/restaurants";

export default function MainpageRestaurants({profile}) {
  // const [restaurants, setRestaurants] = useState([]);
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
        if(profile.location){
        console.log(profile)
        // setRestaurants(data);
        const restaurants = data.filter(res => res.location.toLowerCase() == profile.location.toLowerCase())
        setRestaurantsToDisplay(restaurants);
        }
      });
  }, [profile]);

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
          overflow: auto;
          padding: 10px;
        }
        // @media (max-width: 480px) {
        //   .container {
        //     width: 195%;
        //   }
        // }
      `}</style>
    </div>
  );
}
