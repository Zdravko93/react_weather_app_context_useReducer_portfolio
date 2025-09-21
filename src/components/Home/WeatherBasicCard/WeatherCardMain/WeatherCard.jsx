import React from "react";

import classes from "./WeatherCard.module.css";

import unitToggleClasses from "../../../UI/ToggleUnit/ToggleUnit.module.css";

import Card from "../../../UI/Card";
import ToggleUnit from "../../../UI/ToggleUnit/ToggleUnit";
import AirQuality from "../AirQuality/AirQuality";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import ArrowButton from "../../../UI/Arrow/ArrowButton";

import { useWeatherContext } from "../../../../context/WeatherContext";

const WeatherCard = React.memo(function WeatherCard() {
  // context
  const { weatherData, fadeIn, isCelsius } = useWeatherContext().state;

  if (!weatherData) {
    return (
      <div className={classes["weather-card-wrapper"]}>
        {/* You can keep the arrow so user can toggle */}
        <ArrowButton
          direction="right"
          label="Go to weather details card"
          actionType="TOGGLE_WEATHER_DETAILS"
          payload={true}
        />
        {/* Optional loading or placeholder */}
        <p>Loading weather data...</p>
      </div>
    );
  }

  const main = weatherData?.weather?.[0]?.main || "No data found";
  // dynamic class for weather card background
  const weatherBackgroundImageClass = classes[main.toLowerCase()] || "";

  // dynamic classes for toggling between celsius and fahrenheit units
  const celsiusBtnClass = isCelsius ? unitToggleClasses["unit-accent"] : "";
  const fahrenheitBtnClass = !isCelsius ? unitToggleClasses["unit-accent"] : "";

  return (
    <div className={classes["weather-card-wrapper"]}>
      <Card
        WRAPPER="div"
        className={`${classes["weather-card"]} ${weatherBackgroundImageClass} ${
          fadeIn ? classes["fade-in"] : ""
        }`}
      >
        <Card
          WRAPPER="section"
          aria-labelledby="city-title country-title"
          className={classes["weather-headers"]}
        >
          <h1 id="city-title">{weatherData.name}</h1>
          <h2 id="country-title">{weatherData.sys.country}</h2>
        </Card>
        <ToggleUnit
          celsiusBtnClass={`${unitToggleClasses["toggle-celsius-btn"]} ${celsiusBtnClass}`}
          fahrenheitBtnClass={`${unitToggleClasses["toggle-fahrenheit-btn"]} ${fahrenheitBtnClass}`}
          toggleUnitsWrapperClass={unitToggleClasses["toggle-units-wrapper"]}
        />
        <AirQuality />
        <WeatherInfo />
      </Card>
      <ArrowButton
        direction="right"
        label="Go to weather details card"
        actionType="TOGGLE_WEATHER_DETAILS"
        payload={true}
      />
    </div>
  );
});

export default WeatherCard;
