import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");
  const cities = ["paris", "new york", "tokyo", "seoul"];
  const API_KEY = "310beaa8565789898bb0a57ddcd5a5d4";
  
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeatherByCurrentLocation(latitude, longitude);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      setLoading(true);
      setAPIError("");
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setAPIError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    try {
      if (!city) return;
      setLoading(true);
      setAPIError("");
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setAPIError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeCity = (city) => {
    if (city === "current") {
      setCity(""); // setCity("")는 현재 위치를 의미
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader
            color="#87CEEB"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : apiError ? (
        <div className="container text-center">
          <h2>Error: {apiError}</h2>
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            selectedCity={city}
            handleCityChange={handleChangeCity}
          />
        </div>
      )}
    </div>
  );
}

export default App;
