import React from "react";

import classes from "./Humidity.module.css";
import weatherDetailsCardClasses from "../WeatherDetailsMain/WeatherDetailsCard.module.css";

import Card from "../../../UI/Card";
import HumidityDescription from "./HumidityDescription";

import { useWeatherContext } from "../../../../context/WeatherContext";

const Humidity = React.memo(function Humidity() {
  // context
  const { humidity, isCitySearched } = useWeatherContext().state;

  return (
    <Card
      role="region"
      aria-label="Humidity information"
      className={`${weatherDetailsCardClasses["weather-details-box"]} ${
        isCitySearched ? weatherDetailsCardClasses["fade-in"] : ""
      }`}
    >
      <h5 id="humidity-title">Humidity</h5>
      <Card WRAPPER="div" className={classes.humidity}>
        <p className={classes["humidity-percentage"]}>{humidity}%</p>
        <HumidityDescription />
      </Card>
    </Card>
  );
});

export default Humidity;
