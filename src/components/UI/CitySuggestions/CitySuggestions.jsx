import React, { forwardRef } from "react";

import classes from "./CitySuggestions.module.css";
import CitySuggestion from "./CitySuggestion";

import { useWeatherContext } from "../../../context/WeatherContext";

// Wrap component in 'forwardRef' to correctly forward the ref
const CitySuggestions = React.memo(
  forwardRef(
    (
      {
        detailsHeaderSuggestionsClass,
        activeIndex,
        setActiveIndex,
        handleCityForecast,
      },
      ref
    ) => {
      const { suggestions } = useWeatherContext().state; // extract context data

      return (
        <ul
          ref={ref}
          className={`${classes["suggestions-list"]} ${detailsHeaderSuggestionsClass}`}
          role="listbox"
          aria-label="City suggestions"
        >
          {suggestions.map((suggestion, index) => (
            <CitySuggestion
              key={suggestion.id}
              suggestion={suggestion}
              isActive={index === activeIndex}
              setActiveIndex={setActiveIndex}
              index={index}
              handleCityForecast={handleCityForecast}
            />
          ))}
        </ul>
      );
    }
  )
);

export default CitySuggestions;
