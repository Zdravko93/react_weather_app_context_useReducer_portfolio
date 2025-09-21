import React from "react";

import classes from "./WindSpeed.module.css";

import { convertWindSpeed } from "../../../../utils/utilsWindData";

import Card from "../../../UI/Card";
import { useWeatherContext } from "../../../../context/WeatherContext";

const WindSpeed = React.memo(function WindSpeed({ isMetric }) {
  const { windData } = useWeatherContext().state;

  if (!windData) {
    // Return null until windData is available
    return null;
  }

  const windSpeed = convertWindSpeed(windData.speed, isMetric);
  const windUnit = isMetric ? "km/h" : "m/s";

  return (
    <Card WRAPPER="div" className={classes["weather-number-unit-group"]}>
      <p aria-describedby="wind-title">
        <span id="wind-speed">{windSpeed}</span>
        <span id="wind-unit">{`${windUnit}`}</span>
      </p>
    </Card>
  );
});

export default WindSpeed;
