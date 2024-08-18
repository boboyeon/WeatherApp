import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

// 1. 앱이 실행되자마자 현재위치 기반의 날씨가 보인다
// 2. 날씨 정보에는 도시, 섭씨, 화씨 날씨 상태가 확인된다
// 3. 5개의 버튼이 있다 (현재위치와 다른 도시 4개)
// 4. 도시 버튼을 클릭하면 도시별 날씨가 나온다
// 5. 현재 위치 기반 날씨 버튼을 클릭하면 다시 현재 위치 기반으로 돌아온다
// 6. 데이터를 들고 오는 동안 로딩 스피너가 돈다

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const cities = ["paris", "new york", "tokyo", "seoul"];
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("현재위치", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=310beaa8565789898bb0a57ddcd5a5d4&units=metric`;
    setLoading(true);
    let response = await fetch(url); // 비동기
    let data = await response.json();
    console.log("data", data);
    setWeather(data);
    setLoading(false);
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=310beaa8565789898bb0a57ddcd5a5d4&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log("data", data);
    setWeather(data);
    setLoading(false);
  };

  const handleCityChange = () => {
    if (city === "current") {
      setCity(null);
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
  }, [city]); // array 값이 비어있으면 componentDidMount()처럼 작동, render 후 바로 작동

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
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            handleCityChange={handleCityChange}
            setCity={setCity}
          />
        </div>
      )}
    </div>
  );
}

export default App;
