import { useMemo } from "react";

import classes from "./HumidityDescription.module.css";

import Card from "../../../UI/Card";
import Image from "../../../UI/Image";

import { getHumidityMark } from "../../../../utils/utilsHumidityData";
import { useWeatherContext } from "../../../../context/WeatherContext";

function HumidityDescription() {
  const { humidity } = useWeatherContext().state;

  const { mark, description } = useMemo(
    () => getHumidityMark(humidity),
    [humidity]
  );

  return (
    <Card WRAPPER="div" className={classes["humidity-description"]}>
      <p className={classes["humidity-text"]}>{description}</p>
      <Image imgSrc={mark} altText={`Humidity mark - ${description}`} />
    </Card>
  );
}

export default HumidityDescription;
