import { useCallback } from "react";
import { useWeatherContext } from "../context/WeatherContext";

export const useUnitToggle = () => {
  const { dispatch } = useWeatherContext();

  // Celsius/Fahrenheit
  const handleUnitToggle = useCallback(
    (unit) => {
      dispatch({ type: "TOGGLE_UNIT", payload: unit });
    },
    [dispatch]
  );

  return { handleUnitToggle };
};
