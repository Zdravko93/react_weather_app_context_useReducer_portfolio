import { useCallback } from "react";

import { useWeatherContext } from "../context/WeatherContext";
import {
  fetchWeatherByCity,
  fetchAdditionalWeatherData,
} from "../utils/weatherAPI";
import { getSunriseSunsetTimes } from "../utils/utilsSunriseSunsetTimes";
import { getWindDirection } from "../utils/utilsWindData";
import { getFriendlyError } from "../utils/errorHandler";

export const useWeatherData = (API_KEY) => {
  const { dispatch } = useWeatherContext();

  const fetchCityWeather = useCallback(
    async (city) => {
      dispatch({ type: "SET_ERROR", payload: null }); // reset error
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_FADE_IN", payload: false });

      try {
        const weatherData = await fetchWeatherByCity(city, API_KEY);
        const lat = weatherData?.coord?.lat;
        const lon = weatherData?.coord?.lon;

        const { airQualityData, forecastData, uvIndexData } =
          await fetchAdditionalWeatherData(lat, lon, API_KEY);

        const sunrise = getSunriseSunsetTimes(weatherData.sys.sunrise);
        const sunset = getSunriseSunsetTimes(weatherData.sys.sunset);

        const windData = {
          speed: weatherData.wind.speed,
          direction: getWindDirection(weatherData.wind.deg),
        };

        dispatch({
          type: "SET_ALL_WEATHER_DATA",
          payload: {
            weatherData,
            forecastData,
            airQualityData,
            uvIndex: uvIndexData.value,
            humidity: weatherData.main.humidity,
            sunrise,
            sunset,
            windData,
          },
        });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: getFriendlyError(error) });
        dispatch({
          type: "SET_ALL_WEATHER_DATA",
          payload: {
            weatherData: null,
            forecastData: null,
            airQualityData: null,
            uvIndex: null,
            humidity: null,
            windData: null,
            sunrise: null,
            sunset: null,
          },
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({ type: "SET_FADE_IN", payload: true });
      }
    },
    [API_KEY, dispatch]
  );

  return { fetchCityWeather };
};
