import { useCallback } from "react";

import { useWeatherData } from "./useWeatherData";
import { useWeatherContext } from "../context/WeatherContext";

export const useCitySearch = () => {
  const { dispatch } = useWeatherContext();
  const { API_KEY, city } = useWeatherContext().state;
  const { fetchCityWeather } = useWeatherData(API_KEY);

  const resetInput = useCallback(() => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: "" });
  }, [dispatch]);

  const handleCitySearch = useCallback(
    (query) => {
      const trimmedQuery = query.trim();

      if (trimmedQuery && trimmedQuery !== city) {
        dispatch({ type: "SET_CITY", payload: trimmedQuery });
        dispatch({ type: "SET_CITY_SEARCHED", payload: true });

        fetchCityWeather(trimmedQuery); // fetch with the query

        resetInput();
      }
    },
    [city, dispatch, resetInput, fetchCityWeather]
  );

  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCitySearch();
    }
  };

  const handleCityForecast = useCallback(
    (selectedCity) => {
      if (!selectedCity || selectedCity === city) return;

      dispatch({ type: "SET_CITY", payload: selectedCity });
      dispatch({ type: "SET_CITY_SEARCHED", payload: true });
      dispatch({ type: "SET_LOCATION_WEATHER_FETCHED", payload: false });

      fetchCityWeather(selectedCity);

      resetInput();
    },
    [dispatch, city, resetInput, fetchCityWeather]
  );

  return {
    handleCitySearch,
    handleEnterKeyDown,
    handleCityForecast,
    resetInput,
  };
};
