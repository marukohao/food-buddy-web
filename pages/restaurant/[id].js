import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Layouts from "../../components/Layouts";
import HostEvents from "../../components/HostEvents";
import CreateNewEvent from "../../components/CreateNewEvent";
const RESTAURANTAPI = "http://localhost:7777/restaurants/";

export default function Restaurant() {

  const [restaurant, setRestaurant] = useState({});
  const [clicked, setClicked] = useState(false);
  const [createNew, setCreateNew] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!!router.query.id) {
      fetch(RESTAURANTAPI + `${router.query.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      })
        .then(res => res.json())
        .then(data => setRestaurant(data));
    }
    }, [router]);

  const handleCreateClick = () => {
    setClicked(true);
  }

  const hiddenCreate = () => {
    setClicked(false);
  }

  const createNewHost = (data) => {
    setCreateNew(data)
  } 

  return (
    <Layouts>
      {clicked ? (
        <CreateNewEvent hiddenCreate={hiddenCreate} createNewHost={createNewHost} restaurant={restaurant} />
      ) : null}
      <div className="container">
        <div>
          <img src={restaurant.image_url} />
          <h4>{restaurant.name}</h4>
          <h4>{restaurant.category}</h4>
          <button onClick={handleCreateClick}>create new event</button>
        </div>
        <div>
          <HostEvents restaurant={restaurant} createNew={createNew}/>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          margin: 20px;
        }
      `}</style>
    </Layouts>
  );
}
