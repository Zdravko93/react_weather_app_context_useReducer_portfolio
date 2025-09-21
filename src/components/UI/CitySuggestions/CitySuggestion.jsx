import React from "react";

import classes from "./CitySuggestions.module.css";

const CitySuggestion = React.memo(function CitySuggestion({
  suggestion,
  isActive,
  setActiveIndex,
  index,
  handleCityForecast,
}) {
  return (
    <li
      role="option"
      aria-selected={isActive}
      className={isActive ? classes["suggestion-item-active"] : ""}
      onClick={() => handleCityForecast(suggestion.name)}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseDown={() => handleCityForecast(suggestion.name)}
    >
      {suggestion.name}, {suggestion.sys.country}
    </li>
  );
});

export default CitySuggestion;
