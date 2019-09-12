import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { Input } from "antd";

const { Search } = Input;
const RESTAURANTAPI = "https://share-table-backend.herokuapp.com/restaurants";

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

  const handleSearch = value => {
    console.log(value);
    const input = value;
    let newRestaurants = restaurants.filter(restaurant => {
      return (
        restaurant.location.toLowerCase() == input.toLowerCase() ||
        restaurant.name.toLowerCase().includes(input.toLowerCase()) ||
        restaurant.category.toLowerCase() == input.toLowerCase()
      );
    });
    setRestaurantsToDisplay([...newRestaurants]);
  };

  return (
    <div className="outer-container">
      <div className="search">
        <Search
          placeholder="Search restaurants..."
          onSearch={value => handleSearch(value)}
        />
      </div>
      <div className="container">
        {restaurantsToDisplay.map(restaurant => (
          <div className="card-container">
            <RestaurantCard restaurant={restaurant} key={restaurant.id} />
          </div>
        ))}
      </div>
      <style jsx>{`
        .search {
          display: flex;
          justify-content: flex-end;
          width: 88%;
          max-width: 480px;
          margin: 20px;
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
          padding: 0 15px;
        }

        @media (min-width: 480px) {
          .card-container {
            margin-right: 10px;
          }
          .search {
            margin: 40px;
            width: 200px;
          }
        }
      `}</style>
    </div>
  );
}
