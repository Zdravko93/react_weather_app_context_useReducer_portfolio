import React from "react";

import unitToggleClasses from "../../UI/ToggleUnit/ToggleUnit.module.css";
import WeatherDetailsCardClasses from "../WeatherDetailsCard/WeatherDetailsMain/WeatherDetailsCard.module.css";
import searchInputClasses from "../../UI/Search/Search.module.css";

import Card from "../../UI/Card";
import Search from "../../UI/Search/Search";
import ToggleUnit from "../../UI/ToggleUnit/ToggleUnit";

const WeatherDetailsHeader = React.memo(function WeatherDetailsHeader({
  celsiusBtnClass,
  fahrenheitBtnClass,
  toggleUnitsWrapperClass,
  showError,
}) {
  const weatherDetailsHeaderSearchClasses = `${searchInputClasses["search-wrapper"]} ${searchInputClasses["weather-details-search-wrapper"]}`;

  // Dynamic 'showError'prop based classes
  const errorSearchWrapperClasses = !showError
    ? weatherDetailsHeaderSearchClasses
    : `${weatherDetailsHeaderSearchClasses} ${searchInputClasses["search-wrapper-error"]}`;

  return (
    <Card
      WRAPPER="header"
      className={WeatherDetailsCardClasses["weather-details-header"]}
    >
      <h1 id="forecast-title">5-day forecast</h1>

      {!showError ? (
        <Card WRAPPER="div" aria-label="Forecast controls">
          <Search
            searchInputClassName={weatherDetailsHeaderSearchClasses}
            isDetailsHeaderSuggestions={true}
          />
        </Card>
      ) : (
        <Card WRAPPER="div" aria-label="Forecast controls">
          <Search
            searchInputClassName={errorSearchWrapperClasses}
            isDetailsHeaderSuggestions={true}
          />
        </Card>
      )}

      {!showError && (
        <ToggleUnit
          celsiusBtnClass={`${unitToggleClasses["weather-details-toggle-celsius-btn"]} ${celsiusBtnClass}`}
          fahrenheitBtnClass={`${unitToggleClasses["weather-details-toggle-fahrenheit-btn"]} ${fahrenheitBtnClass}`}
          toggleUnitsWrapperClass={toggleUnitsWrapperClass}
        />
      )}
    </Card>
  );
});

export default WeatherDetailsHeader;
