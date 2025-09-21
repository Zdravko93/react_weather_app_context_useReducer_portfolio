import { useMemo } from "react";

import classes from "../Visibility/VisibilityDescription.module.css";

import Card from "../../../UI/Card";
import Image from "../../../UI/Image";

import { getVisibilityMark } from "../../../../utils/utilsVisibilityData";

function VisibilityDescription({ visibility }) {
  const { mark, description } = useMemo(
    () => getVisibilityMark(visibility),
    [visibility]
  );

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
    <Card WRAPPER="figure" className={classes["visibility-description"]}>
      <figcaption id="visibility-description">{description}</figcaption>
      <Image
        imgSrc={mark}
        altText={`Visibility mark indicating: ${description}`}
        aria-labelledby="visibility-description"
      />
    </Card>
  );
}

export default VisibilityDescription;
