import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";

const RESTAURANTAPI = "http://localhost:7777/restaurants";

export default function MainpageRestaurants({ profile }) {
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
        if (profile.location) {
          console.log(profile);
          // setRestaurants(data);
          const restaurants = data.filter(
            res => res.location.toLowerCase() == profile.location.toLowerCase()
          );
          setRestaurantsToDisplay(restaurants);
        }
      });
  }, [profile]);

  return (
    <React.Fragment>
      <div className="container">
        {restaurantsToDisplay.map(restaurant => (
          <RestaurantCard restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          overflow: auto;
          margin: 40px 20px;
        }
        // @media (max-width: 480px) {
        //   .container {
        //     width: 195%;
        //   }
        // }
      `}</style>
    </React.Fragment>
  );
}
