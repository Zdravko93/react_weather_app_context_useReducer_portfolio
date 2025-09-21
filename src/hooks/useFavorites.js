import { useCallback } from "react";
import { useWeatherContext } from "../context/WeatherContext";

export const useFavorites = () => {
  const { state, dispatch } = useWeatherContext();
  const { favoriteCities } = state;

  const handleAddToFavorites = useCallback(
    (city) => {
      if (!favoriteCities.includes(city)) {
        const updatedFavorites = [...favoriteCities, city];
        dispatch({ type: "SET_FAVORITE_CITIES", payload: updatedFavorites });
      }
    },
    [favoriteCities, dispatch]
  );

  const handleRemoveFromFavorites = useCallback(
    (city) => {
      const updatedFavorites = favoriteCities.filter((c) => c !== city);
      dispatch({ type: "SET_FAVORITE_CITIES", payload: updatedFavorites });
    },
    [favoriteCities, dispatch]
  );

  return {
    handleAddToFavorites,
    handleRemoveFromFavorites,
    favoriteCities,
  };
};
