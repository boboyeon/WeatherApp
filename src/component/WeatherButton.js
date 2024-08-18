import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, setCity }) => {
  console.log("cities?", cities);
  return (
    <div>
      <Button variant="primary" onClick={() => handleCityChange("current")}>
        Current Location
      </Button>{" "}
      {cities.map((item, index) => (
        <Button variant="primary" key={index} onClick={() => setCity(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;