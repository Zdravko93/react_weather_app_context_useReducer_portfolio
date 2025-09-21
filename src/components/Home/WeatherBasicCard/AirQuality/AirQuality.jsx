import React from "react";

import classes from "./AirQuality.module.css";

import Card from "../../../UI/Card.jsx";

import { getAQIDescription } from "../../../../utils/utilsAirQuality";
import { getAQIClasses } from "../../../../utils/utilsAirQuality";
import { useWeatherContext } from "../../../../context/WeatherContext.jsx";

const AirQuality = React.memo(function AirQuality() {
  // context
  const { airQualityData } = useWeatherContext().state;

  const aqi = airQualityData?.list?.[0]?.main?.aqi ?? "N/A"; // Air Quality Index
  const airQualityDescription = getAQIDescription(aqi); // Air Quality Index Description
  // dynamic descriptive classes for Air Quality Index
  const airQualityIndexClass = getAQIClasses(aqi);

  return (
    <Card
      WRAPPER="section"
      aria-labelledby="air-quality-title"
      className={classes["air-quality"]}
    >
      <h3 id="air-quality-title" className={classes["air-quality-header"]}>
        Air Quality
      </h3>
      <p
        id="air-quality-index"
        className={`${classes["air-quality-index"]} ${classes[airQualityIndexClass]}`}
      >
        <span aria-label={`Air Quality Index: ${aqi}`}>{aqi}</span>
      </p>
      <p
        id="air-quality-description"
        className={classes["air-quality-description"]}
      >
        {airQualityDescription}
      </p>
    </Card>
  );
});

export default AirQuality;
