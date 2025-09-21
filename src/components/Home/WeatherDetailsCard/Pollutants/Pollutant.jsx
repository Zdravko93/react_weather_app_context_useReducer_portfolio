import classes from "./Pollutant.module.css";

import Card from "../../../UI/Card";

function Pollutant({ pollutant, value }) {
  return (
    <Card>
      <strong>{pollutant.toUpperCase()}</strong>:{" "}
      <span className={classes["pollutant-value"]}>{value} µg/m³</span>
    </Card>
  );
}

export default Pollutant;
