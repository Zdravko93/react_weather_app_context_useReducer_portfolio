import React, { useState, useEffect, useMemo } from "react";

import classes from "./FiveDaysForecast.module.css";

import Card from "../../../UI/Card";
import ForecastCard from "../FiveDaysForecast/ForecastCard";

import { renderForecastData } from "../../../../utils/utilsForecastData";
import { useWeatherContext } from "../../../../context/WeatherContext";

const FiveDaysForecast = React.memo(function FiveDaysForecast({ daysOfWeek }) {
  const { forecastData, weatherData, isCelsius } = useWeatherContext().state;

  const weatherMainDescription = useMemo(() => {
    return weatherData?.weather?.[0]?.main || "Weather data not available";
  }, [weatherData]);

  // Memoize forecast calculation to avoid unnecessary re-renders
  const forecast = useMemo(() => {
    const data = renderForecastData(forecastData, isCelsius);
    return data?.forecast || [];
  }, [forecastData, isCelsius]);

  // local piece of state to handle animation
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // trigger fade-in effect after a slight delay
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 100); // delay before cards fade in

    return () => clearTimeout(timer);
  }, []);

  if (!forecast || forecast.length === 0) {
    //Fallback UI for empty or loading forecast data
    return (
      <Card WRAPPER="div" className={classes["weather-details-forecast"]}>
        <p>No forecast data available.</p>
      </Card>
    );
  }

  return (
    <Card WRAPPER="div" className={classes["weather-details-forecast"]}>
      <ul>
        {forecast.map((dayData, index) => (
          // here is best to avoid 'index' as a 'key' prop value, since it will not work in cases where the order of the array items changes
          // in this case I am providing more flexible prop value
          <ForecastCard
            key={dayData.date.toString()}
            index={index}
            daysOfWeek={daysOfWeek}
            weatherIconUrl={dayData.weatherIconUrl}
            maxTemp={dayData.maxTemp}
            minTemp={dayData.minTemp}
            unit={dayData.unit}
            weatherMainDescription={weatherMainDescription}
            fadeIn={fadeIn}
            delay={index * 100}
          />
        ))}
      </ul>
    </Card>
  );
});

export default FiveDaysForecast;
