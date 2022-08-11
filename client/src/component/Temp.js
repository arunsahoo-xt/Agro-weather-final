import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
// import "./style.css";

const Temp = ({apikeyy,lat}) => {
  const [searchValue, setSearchValue] = useState("pune");
  const [tempInfo, setTempInfo] = useState({});
  
  
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.agromonitoring.com/agro/1.0/weather?lat=${lat[0]}&lon=${lat[1]}&appid=${apikeyy}`;
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
     

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      // const { name } = data;
      const { speed } = data.wind;
      // const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        // name,
        speed,
        // country,
        // sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      {/* our temp card  */}
      <WeatherCard {...tempInfo} />
    </>
  );
};

export default Temp;