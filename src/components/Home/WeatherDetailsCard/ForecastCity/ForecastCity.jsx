import React from "react";

import classes from "./ForecastCity.module.css";

import Card from "../../../UI/Card";

import { useWeatherContext } from "../../../../context/WeatherContext";

const ForecastCity = React.memo(function ForecastCity({
  currentDay,
  currentDate,
  currentTime,
}) {
  const { forecastData } = useWeatherContext()?.state || {};

  if (!forecastData?.city) {
    // Render fallback UI when city data not available
    return (
      <section aria-live="polite" className={classes["no-data"]}>
        No data available for searched city.
      </section>
    );
  }

  const { name } = forecastData.city;

  return (
    <Card
      WRAPPER="div"
      aria-label={`${name} weather forecast`}
      className={classes["forecast-city"]}
    >
      <h2>{name}</h2>
      <Card
        WRAPPER="div"
        aria-label={`${name} current day, date and time`}
        className={classes["forecast-city-day-time"]}
      >
        <h3>
          {currentDay}, {currentDate}
        </h3>
        <p aria-live="polite">{currentTime}</p>
      </Card>
    </Card>
  );
});

export default ForecastCity;
