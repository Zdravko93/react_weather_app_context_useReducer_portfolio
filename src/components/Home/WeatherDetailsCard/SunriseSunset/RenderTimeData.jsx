import classes from "./RenderTimeData.module.css";

import Card from "../../../UI/Card";

function RenderTimeData({ time, timeSuffix }) {
  return (
    <Card WRAPPER="div" className={classes["time-data"]}>
      <p aria-label="sunrise and sunset time">{time}</p>
      <span aria-label={`sunrise and sunset ${timeSuffix}`}>{timeSuffix}</span>
    </Card>
  );
}

export default RenderTimeData;
