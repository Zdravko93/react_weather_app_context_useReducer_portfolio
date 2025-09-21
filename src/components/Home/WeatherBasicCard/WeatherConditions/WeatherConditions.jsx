import React, { useMemo } from "react";

import classes from "./WeatherConditions.module.css";

import Card from "../../../UI/Card";
import Image from "../../../UI/Image";
import CurrentTemperature from "../CurrentTemperature/CurrentTemperature.jsx";

import { useWeatherContext } from "../../../../context/WeatherContext";

const WeatherConditions = React.memo(function WeatherConditions() {
  const { weatherData } = useWeatherContext().state;
  const { main } = weatherData.weather[0];

  const icon = weatherData.weather[0].icon;
  // dynamic image 'src' value for weather card
  const weatherImgSrc = useMemo(() => {
    return `http://openweathermap.org/img/wn/${icon}.png` || "";
  }, [icon]); // fallback to an empty string - avoid breaking the UI/APP

  return (
    <Card
      WRAPPER="section"
      aria-label="Current weather conditions"
      className={classes["weather-conditions"]}
    >
      <Image
        imgSrc={weatherImgSrc}
        altText={`Weather icon representing ${main.toLowerCase()} weather conditions.`}
      />
      <CurrentTemperature />
    </Card>
  );
});

export default WeatherConditions;
