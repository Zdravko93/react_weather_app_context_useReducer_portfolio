import React, { useMemo } from "react";

import classes from "./RealFeel.module.css";

import Card from "../../../UI/Card.jsx";

import {
  kelvinToCelsius,
  celsiusToFahrenheit,
} from "../../../../utils/utilsTemperatureData";
import { useWeatherContext } from "../../../../context/WeatherContext";

const RealFeel = React.memo(function RealFeel() {
  // context
  const { weatherData, isCelsius } = useWeatherContext().state;
  const { feels_like } = weatherData.main; // extracted 'feels_like' temperature in Kelvin

  // memoize both real feel temperature and unit
  const [realFeelTemp, unit] = useMemo(() => {
    const tempC = kelvinToCelsius(feels_like);
    const tempF = celsiusToFahrenheit(tempC);
    const value = isCelsius ? tempC.toFixed(1) : tempF.toFixed(1);
    const unit = isCelsius ? "°C" : "°F";
    return [value, unit];
  }, [feels_like, isCelsius]);

  return (
    <Card WRAPPER="div" className={classes["real-feel"]}>
      <h4 id="real-feel-title">Real Feel</h4>
      <Card WRAPPER="span" aria-labelledby="real-feel-title">
        <span>{realFeelTemp}</span>
        <span>{unit}</span>
      </Card>
    </Card>
  );
});

export default RealFeel;
