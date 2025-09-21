import React from "react";

import { useState, useEffect } from "react";

import classes from "./ForecastCard.module.css";

import Card from "../../../UI/Card";
import Image from "../../../UI/Image";

const ForecastCard = React.memo(function ForecastCard({
  index,
  daysOfWeek,
  weatherIconUrl,
  maxTemp,
  minTemp,
  unit,
  weatherMainDescription,
  fadeIn,
  delay,
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (fadeIn) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay); // apply delay to each card
      return () => clearTimeout(timer);
    }
  }, [fadeIn, delay]);

  return (
    <Card
      className={`${classes["day-details"]} ${
        isVisible ? classes["fade-in"] : ""
      } ${isVisible ? classes["day-details-delay"] : ""}`}
      style={{ transitionDelay: `${delay}ms` }} // staggered delay
    >
      <h4>{daysOfWeek[index]}</h4>
      <Image
        imgSrc={weatherIconUrl}
        altText={`Weather icon representing ${weatherMainDescription}`}
      />
      <Card WRAPPER="div" className={classes["day-temperatures"]}>
        <strong>
          {maxTemp}
          {unit}
        </strong>
        <small aria-label="Minimum temperature">
          {minTemp}
          {unit}
        </small>
      </Card>
    </Card>
  );
});

export default ForecastCard;
