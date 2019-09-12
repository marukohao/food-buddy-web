import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Layouts from "../../components/Layouts";
import HostEvents from "../../components/HostEvents";
import CreateNewEvent from "../../components/CreateNewEvent";
import { Card, Button } from "antd";

const { Meta } = Card;
const RESTAURANTAPI = "https://share-table-backend.herokuapp.com/restaurants/";

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
  };

  const hiddenCreate = () => {
    setClicked(false);
  };

  const createNewHost = data => {
    setCreateNew(data);
  };

  return (
    <Layouts>
      <div className="container">
        <div className="card-container">
          <Card
            hoverable
            cover={<img alt="example" src={restaurant.image_url} />}
          >
            <Meta title={restaurant.name} description={restaurant.category} />
            <div className="button-container">
              <Button
                style={{ width: "100%", borderRadius: 0, height: "50px", marginTop: "20px" }}
                type="primary"
                onClick={handleCreateClick}
              >
                New Table
              </Button>
            </div>
          </Card>
        </div>
        <div className="host-event-container">
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
        @media (min-width: 480px) {
          .container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .card-container {
            width: 65%;
          }
          .host-event-container {
            width: 35%;
          }
        }
      `}</style>
    </Layouts>
  );
}
