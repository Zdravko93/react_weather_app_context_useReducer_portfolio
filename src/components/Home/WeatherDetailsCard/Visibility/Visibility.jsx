import React from "react";

import classes from "./Visibility.module.css";
import weatherDetailsCardClasses from "../../WeatherDetailsCard/WeatherDetailsMain/WeatherDetailsCard.module.css";

import Card from "../../../UI/Card";
import VisibilityDescription from "../Visibility/VisibilityDescription";
import RenderVisibilityData from "../Visibility/RenderVisibilityData";

import { convertVisibilityToKm } from "../../../../utils/utilsVisibilityData";
import { useWeatherContext } from "../../../../context/WeatherContext";

const Visibility = React.memo(function Visibility() {
  const { isCitySearched, forecastData } = useWeatherContext().state;

  const visibilityRaw = forecastData?.list?.[0]?.visibility;
  // convert unit to km
  const visibilityInKm = convertVisibilityToKm(visibilityRaw);

  return (
    <Card
      WRAPPER="div"
      className={`${weatherDetailsCardClasses["weather-details-box"]} ${
        isCitySearched ? weatherDetailsCardClasses["fade-in"] : ""
      }`}
    >
      <Card WRAPPER="div" className={classes.visibility}>
        <h5 id="visibility-title">Visibility</h5>
        <RenderVisibilityData visibility={visibilityInKm} />
        <VisibilityDescription visibility={visibilityInKm} />
      </Card>
    </Card>
  );
});

export default Visibility;
