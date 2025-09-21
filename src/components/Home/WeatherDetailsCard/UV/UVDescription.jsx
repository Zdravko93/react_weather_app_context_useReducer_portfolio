import React, { useMemo } from "react";

import classes from "./UVDescription.module.css";

import { getUVDescription } from "../../../../utils/utilsUvData";
import { useWeatherContext } from "../../../../context/WeatherContext";

const UVDescription = React.memo(function UVDescription() {
  const { uvIndex } = useWeatherContext().state;

  const { text, textColor } = useMemo(
    () => getUVDescription(uvIndex),
    [uvIndex]
  );

  return (
    <p
      id="uv-description"
      aria-describedby="uv-title"
      className={`${classes["uv-description"]} ${classes[textColor]}`}
    >
      <span id="uv-index-label">{text}</span>
    </p>
  );
});

export default UVDescription;
