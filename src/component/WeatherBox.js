import React from "react";

const WeatherBox = ({ weather }) => {
  if (!weather || !weather.main) {
    return <div>Loading...</div>; // 또는 null을 반환하여 아무것도 렌더링하지 않음
  }

  const celsius = Math.round(weather.main.temp); // 소수점 이하 반올림
  const fahrenheit = Math.round(celsius * 1.8 + 32); // 소수점 이하 반올림

  return (
    <div className="weather_box">
      <div>{weather.name}</div> 
      <h2>{celsius}C / {fahrenheit}F</h2>
      <h3>{weather.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;

