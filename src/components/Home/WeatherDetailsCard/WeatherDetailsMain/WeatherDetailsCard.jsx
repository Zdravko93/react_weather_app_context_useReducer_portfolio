import React, { useState, useEffect, useMemo } from "react";

import classes from "./WeatherDetailsCard.module.css";
import unitToggleClasses from "../../../UI/ToggleUnit/ToggleUnit.module.css";
import loadingClasses from "../../../UI/Loading/Loading.module.css";

import Card from "../../../UI/Card.jsx";
import Loading from "../../../UI/Loading/Loading.jsx";
import ArrowButton from "../../../UI/Arrow/ArrowButton.jsx";
import ForecastCity from "../ForecastCity/ForecastCity.jsx";
import FiveDaysForecast from "../FiveDaysForecast/FiveDaysForecast.jsx";
import UV from "../UV/UV.jsx";
import Wind from "../Wind/Wind.jsx";
import SunriseSunset from "../SunriseSunset/SunriseSunset.jsx";
import Humidity from "../Humidity/Humidity.jsx";
import Visibility from "../Visibility/Visibility.jsx";
import Pollutants from "../Pollutants/Pollutants.jsx";
import WeatherDetailsHeader from "../WeatherDetailsHeader.jsx";

import { getNextFiveDays } from "../../../../utils/utilsForecastData.js";
import { useCityTime } from "../../../../hooks/useCityTime.js";
import { useWeatherContext } from "../../../../context/WeatherContext.jsx";
import ErrorMessage from "../../../UI/Error/ErrorMessage.jsx";

const WeatherDetailsCard = React.memo(function WeatherDetailsCard() {
  const { forecastData, isCelsius, forecastIsLoading, error } =
    useWeatherContext().state;

  // get states from custom hook
  const { currentTime, currentDayOfWeek, currentDate } =
    useCityTime(forecastData);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(false);
    const timeout = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  // get next 5 days
  // stabilize array, since it is passed to the child component
  const daysOfWeek = useMemo(
    () => getNextFiveDays(currentDayOfWeek),
    [currentDayOfWeek]
  );

  // dynamic classes for unit buttons
  const celsiusBtnClass = isCelsius
    ? unitToggleClasses["weather-details-unit-accent"]
    : "";
  const fahrenheitBtnClass = !isCelsius
    ? unitToggleClasses["weather-details-unit-accent"]
    : "";

  return (
    <Card
      WRAPPER="div"
      className={`${classes["weather-details-main-flex"]} ${
        fadeIn ? classes["fade-in"] : ""
      }`}
    >
      <Card WRAPPER="div" className={classes["weather-details-wrapper"]}>
        {/* Render 'BACK' arrow conditionally depending on 'error' state */}
        {!error && (
          <ArrowButton
            direction="left"
            label="Go to basic weather card"
            actionType="TOGGLE_WEATHER_DETAILS"
            payload={false}
          />
        )}

        <WeatherDetailsHeader
          celsiusBtnClass={`${unitToggleClasses["weather-details-toggle-celsius-btn"]} ${celsiusBtnClass}`}
          fahrenheitBtnClass={`${unitToggleClasses["weather-details-toggle-fahrenheit-btn"]} ${fahrenheitBtnClass}`}
          toggleUnitsWrapperClass={unitToggleClasses["toggle-units-wrapper"]}
          showError={error}
        />

        {/* LOADING */}
        {forecastIsLoading && (
          <Loading className={loadingClasses["weather-details-loading-text"]}>
            Loading forecast data...
          </Loading>
        )}

        {/* ERROR FALLBACKS */}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!forecastData && !forecastIsLoading && !error && (
          <ErrorMessage>
            Something went wrong. Please try again or check your input.
          </ErrorMessage>
        )}

        {forecastData && (
          <>
            <ForecastCity
              currentTime={currentTime}
              currentDay={currentDayOfWeek}
              currentDate={currentDate}
            />
            <FiveDaysForecast daysOfWeek={daysOfWeek} />
            <Card WRAPPER="div" className={classes["weather-details-main"]}>
              <h4>Today's Highlights</h4>
              <ul className={classes["weather-details-boxes"]}>
                <UV />
                <Wind />
                <SunriseSunset />
                <Humidity />
                <Visibility />
                <Pollutants />
              </ul>
            </Card>
          </>
        )}
      </Card>
    </Card>
  );
});

export default WeatherDetailsCard;
