import React, { useState, useEffect } from "react";
import Layouts from "../components/Layouts";
import RestaurantContainer from "../components/RestaurantContainer";

export default function Restaurant() {
  return (
    <Layouts>
      <RestaurantContainer />
    </Layouts>
  );
}
