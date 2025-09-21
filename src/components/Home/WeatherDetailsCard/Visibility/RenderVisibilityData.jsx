import classes from "../Visibility/RenderVisibilityData.module.css";

import Card from "../../../UI/Card";

function RenderVisibilityData({ visibility }) {
  if (visibility == null) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className={classes["visibility-error"]}
      >
        Visibility data unavailable.
      </div>
    );
  }

  return (
    <Card WRAPPER="div">
      <p
        aria-labelledby="visibility-title visibility-value-label"
        className={classes["visibility-distance"]}
      >
        <span id="visibility-value-label" className="visually-hidden">
          Visibility:{" "}
        </span>
        {visibility}
        <span aria-hidden="true">km</span>
      </p>
    </Card>
  );
}

export default RenderVisibilityData;
