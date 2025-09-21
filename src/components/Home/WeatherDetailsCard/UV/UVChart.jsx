import React, { useMemo } from "react";

import classes from "./UVChart.module.css";

import Card from "../../../UI/Card";
import { useWeatherContext } from "../../../../context/WeatherContext";

const UVChart = React.memo(function UVChart() {
  const { uvIndex, error } = useWeatherContext().state;

  // Memoized rotation
  const rotation = useMemo(() => (uvIndex / 14) * 360, [uvIndex]);

  // Memoize class name
  const uvClass = useMemo(() => {
    if (uvIndex <= 2) return "circle-bar-low";
    if (uvIndex <= 5) return "circle-bar-moderate";
    if (uvIndex <= 7) return "circle-bar-high";
    if (uvIndex <= 10) return "circle-bar-very-high";
    return "circle-bar-extreme";
  }, [uvIndex]);

  return (
    <Card WRAPPER="div" className={classes.meter}>
      <Card WRAPPER="div" className={classes["circle-background"]}></Card>
      <Card
        WRAPPER="div"
        className={`${classes["circle-bar"]} ${classes[uvClass]} ${classes["circle-bar-rotate"]}`}
        style={{
          "--rotation": `${rotation}deg`,
        }}
        role="img"
        aria-label={`UV level indicator: ${uvIndex}, ${uvClass
          .replace("circle-bar-", "")
          .replace("-", " ")}`}
      ></Card>

      {!error ? (
        <p
          aria-labelledby="uv-title uv-index-label"
          className={classes["center-text"]}
        >
          <span id="uv-index-label" className="visually-hidden">
            UV Index:
          </span>
          <span id="uv-index">{uvIndex}</span>
        </p>
      ) : (
        <div
          id="uv-error"
          aria-describedby="uv-title"
          role="alert"
          aria-live="assertive"
          className={classes["center-text"]}
        >
          There was an error loading the UV data.
        </div>
      )}
    </Card>
  );
});

export default UVChart;
