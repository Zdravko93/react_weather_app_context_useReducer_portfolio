import React from "react";

import classes from "./WeatherInfo.module.css";

import Card from "../../../UI/Card";
import WeatherConditions from "../WeatherConditions/WeatherConditions";
import RealFeel from "../../WeatherBasicCard/RealFeel/RealFeel";

import { useWeatherContext } from "../../../../context/WeatherContext";

const WeatherInfo = React.memo(function WeatherInfo() {
  // context
  const { weatherData } = useWeatherContext().state;
  const { main, description } = weatherData.weather[0];

  return (
    <Card
      WRAPPER="section"
      aria-labelledby="weather-summary-title"
      className={classes["weather-info"]}
    >
      <h3 id="weather-summary-title">
        {main} ({description})
      </h3>
      <WeatherConditions />
      <RealFeel />
    </Card>
  );
});

export default WeatherInfo;
