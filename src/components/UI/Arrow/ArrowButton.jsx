import React from "react";

import Button from "../Button";
import Arrow from "./Arrow";

import classes from "../DetailsArrow.module.css";
import { useWeatherContext } from "../../../context/WeatherContext";

const ArrowButton = React.memo(function ArrowButton({
  direction,
  label,
  actionType,
  payload,
}) {
  const { dispatch } = useWeatherContext();
  const { isWeatherDetailsVisible, fadeIn } = useWeatherContext().state;

  const baseButtonClasses = `${classes["details-arrow-btn"]} ${
    fadeIn ? classes["fade-in"] : ""
  }`;

  const specificButtonClasses = `${
    direction === "right" ? classes["arrow-right"] : classes["arrow-left"]
  }`;

  return (
    <Button
      ariaLabel={label}
      ariaExpanded={isWeatherDetailsVisible ? "true" : "false"}
      ariaDescribedBy={`${direction}-arrow-tooltip`}
      callback={() => dispatch({ type: actionType, payload })}
      className={`${baseButtonClasses} ${specificButtonClasses}`}
    >
      <Arrow
        direction={direction}
        className={`${classes["details-arrow"]}`}
        ariaLabel={label}
      />
    </Button>
  );
});

export default ArrowButton;
