import React from "react";

const WeatherBox = ({ weather }) => {
    const celsius = Math.round(weather?.main.temp); 
    const fahrenheit = Math.round(celsius * 1.8 + 32);
  
    return (
      <div className="weather_box">
        <div>{weather?.name}</div> 
        <h2> {celsius}C / {fahrenheit}F</h2>
        <h3>{weather?.weather[0].description}</h3>
      </div>
    );
};

export default WeatherBox;
