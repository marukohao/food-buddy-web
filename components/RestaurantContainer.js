import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { Input } from "antd";

const { Search } = Input;
const RESTAURANTAPI = "http://localhost:7777/restaurants";

export default function RestaurantContainer() {

  const [restaurants, setRestaurants] = useState([])
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
        setRestaurants(data)
        setRestaurantsToDisplay([...data])
      });
  }, []);
  
  const handleSearch = (value) => {
    console.log(value)
      const input = value;
      let newRestaurants = restaurants.filter(restaurant => {
        return (
          restaurant.location.toLowerCase() == input.toLowerCase() ||
          restaurant.name.toLowerCase().includes(input.toLowerCase()) ||
          restaurant.category.toLowerCase() == input.toLowerCase()
        );
      });
      setRestaurantsToDisplay([...newRestaurants])
  }

  return (
    <div className="outer-container">
      <Search
        className="search"
        placeholder="input search text"
        onSearch={value => handleSearch(value)}
        style={{ width: 200, margin: "20px" }}
      />
      <div className="container">
        { restaurantsToDisplay.map(restaurant => (
              <RestaurantCard restaurant={restaurant} key={restaurant.id} />
            ))}
      </div>
      <style jsx>{`
        search {
          display: flex;
          justify-content: flex-end;
        }
        .outer-container {
          display: flex;
          flex-direction: column;
        }
        .container {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}
