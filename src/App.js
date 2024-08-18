import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";

// 1. 앱이 실행되자마자 현재위치 기반의 날씨가 보인다
// 2. 날씨 정보에는 도시, 섭씨, 화씨 날씨 상태가 확인된다
// 3. 5개의 버튼이 있다 (현재위치와 다른 도시 4개)
// 4. 도시 버튼을 클릭하면 도시별 날씨가 나온다
// 5. 현재 위치 기반 날씨 버튼을 클릭하면 다시 현재 위치 기반으로 돌아온다
// 6. 데이터를 들고 오는 동안 로딩 스피너가 돈다

function App() {

  const [weather,setWeather]=useState(null)
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("현재위치", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=310beaa8565789898bb0a57ddcd5a5d4`;
    let response = await fetch(url); // 비동기
    let data = await response.json();
    console.log("data", data);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []); // array 값이 비어있어 componentDidMount()처럼 작동, render 후 바로 작동

  return (
    <div>
      <div className="container">
        <WeatherBox />
        <WeatherButton />
      </div>
    </div>
  );
}

export default App;
