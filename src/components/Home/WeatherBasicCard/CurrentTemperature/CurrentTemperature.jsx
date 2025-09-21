import React, { useMemo } from "react";

import classes from "./CurentTemperature.module.css";

import {
  kelvinToCelsius,
  celsiusToFahrenheit,
} from "../../../../utils/utilsTemperatureData";
import { useWeatherContext } from "../../../../context/WeatherContext";

const CurrentTemperature = React.memo(function WeatherCardCurrentTemperature() {
  // context
  const { weatherData, isCelsius } = useWeatherContext().state;
  // extract temperature value from weatherData object
  const { temp } = weatherData.main; // extracted 'temp' value is in Kelvin

  const [temperature, unit] = useMemo(() => {
    const tempC = kelvinToCelsius(temp);
    const tempF = celsiusToFahrenheit(tempC);
    const value = isCelsius ? tempC.toFixed(1) : tempF.toFixed(1);
    const unit = isCelsius ? "°C" : "°F";
    return [value, unit];
  }, [temp, isCelsius]);

  return (
    <span
      aria-label={`Current temperature is ${temperature} ${unit}`}
      className={classes["current-temperature"]}
    >
      <span aria-hidden="true">{temperature}</span>
      <span aria-hidden="true">{unit}</span>
    </span>
  );
});

export default CurrentTemperature;
