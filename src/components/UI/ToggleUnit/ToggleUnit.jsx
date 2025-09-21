import React from "react";

import Card from "../Card";
import Button from "../Button";

import { useUnitToggle } from "../../../hooks/useUnitToggle";

const ToggleUnit = React.memo(function ToggleUnit({
  celsiusBtnClass,
  fahrenheitBtnClass,
  toggleUnitsWrapperClass,
  children,
}) {
  const { handleUnitToggle } = useUnitToggle();

  // function to determine if the callback function expects and argument
  const handleTemperatureUnitChange = (unit) => {
    if (unit) {
      handleUnitToggle(unit);
    } else {
      handleUnitToggle();
    }
  };

  return (
    <Card WRAPPER="div" className={toggleUnitsWrapperClass}>
      {children || (
        <>
          <Button
            ariaLabel="Switch to Celsius"
            className={celsiusBtnClass}
            callback={() => handleTemperatureUnitChange("celsius")}
          >
            °C
          </Button>
          <Button
            ariaLabel="Switch to Fahrenheit"
            className={fahrenheitBtnClass}
            callback={() => handleTemperatureUnitChange("fahrenheit")}
          >
            °F
          </Button>
        </>
      )}
    </Card>
  );
});

export default ToggleUnit;
