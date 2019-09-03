import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Layouts from "../../components/Layouts";
import HostEvents from "../../components/HostEvents";
import CreateNewEvent from "../../components/CreateNewEvent";
import { Card, Button } from "antd";

const { Meta } = Card;
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
      {/* {clicked ? (
        <CreateNewEvent
          hiddenCreate={hiddenCreate}
          createNewHost={createNewHost}
          restaurant={restaurant}
        />
      ) : null} */}
      <div className="container">
        <div className="card-button">
          <Card
            hoverable
            style={{ width: "90%" }}
            cover={<img alt="example" src={restaurant.image_url} />}
          >
            <Meta title={restaurant.name} description={restaurant.category} />
          </Card>
          <Button style={{ margin: "30px"}} type="primary" onClick={handleCreateClick}>
            create new event
          </Button>
        </div>
        <div>
          <HostEvents restaurant={restaurant} createNew={createNew} />
        </div>
      </div>
      {clicked ? (
        <CreateNewEvent
          hiddenCreate={hiddenCreate}
          createNewHost={createNewHost}
          restaurant={restaurant}
        />
      ) : null}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          margin: 20px;
        }
        .card-button {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </Layouts>
  );
}
