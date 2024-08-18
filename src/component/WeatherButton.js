import React from "react";
import "../App.css";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, selectedCity, handleCityChange }) => {
  return (
    <div className="menu-container">
      <Button
        variant={
          selectedCity === null || selectedCity === "" ? "success" : "primary"
        }
        onClick={() => handleCityChange("current")}
      >
        Current Location
      </Button>

      {cities.map((city, index) => (
        <Button
          variant={selectedCity === city ? "success" : "primary"}
          key={index}
          onClick={() => handleCityChange(city)}
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
