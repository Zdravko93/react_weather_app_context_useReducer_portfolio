import { useCallback } from "react";
import { useWeatherContext } from "../context/WeatherContext";
import {
  fetchWeatherByGeolocation,
  fetchAdditionalWeatherData,
} from "../utils/weatherAPI";
import { getWindDirection } from "../utils/utilsWindData";
import { getSunriseSunsetTimes } from "../utils/utilsSunriseSunsetTimes";
import { getFriendlyError } from "../utils/errorHandler";

export const useUserLocationWeather = (API_KEY) => {
  const { state, dispatch } = useWeatherContext();
  const { city, isLocationWeatherFetched } = state;

  // Success callback - memoized
  const onPositionSuccess = useCallback(
    async (position) => {
      const { latitude, longitude } = position.coords;

      dispatch({ type: "SET_ERROR", payload: null }); // Reset error at start
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_FADE_IN", payload: false });

      try {
        const weatherData = await fetchWeatherByGeolocation(
          latitude,
          longitude,
          API_KEY
        );

        const cityName = weatherData?.name ?? "";

        if (cityName && cityName !== city) {
          dispatch({ type: "SET_CITY", payload: cityName });
        }

        const { airQualityData, forecastData, uvIndexData } =
          await fetchAdditionalWeatherData(latitude, longitude, API_KEY);

        const sunrise = getSunriseSunsetTimes(weatherData?.sys?.sunrise);
        const sunset = getSunriseSunsetTimes(weatherData?.sys?.sunset);

        const windData = {
          speed: weatherData?.wind?.speed ?? 0,
          direction: getWindDirection(weatherData?.wind?.deg ?? 0),
        };

        dispatch({
          type: "SET_ALL_WEATHER_DATA",
          payload: {
            weatherData,
            forecastData,
            airQualityData,
            uvIndex: uvIndexData?.value ?? null,
            humidity: weatherData?.main?.humidity ?? null,
            sunrise,
            sunset,
            windData,
          },
        });

        dispatch({ type: "SET_LOCATION_WEATHER_FETCHED", payload: true });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: getFriendlyError(error) });
        dispatch({ type: "SET_WEATHER_DATA", payload: null });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({ type: "SET_FADE_IN", payload: true });
      }
    },
    [API_KEY, city, dispatch]
  );

  // Error callback - memoized
  const onPositionError = useCallback(
    (error) => {
      const friendly = getFriendlyError(error);
      dispatch({ type: "SET_ERROR", payload: friendly });
    },
    [dispatch]
  );

  const fetchWeatherByUserLocation = useCallback(() => {
    if (isLocationWeatherFetched) return;

    if (!("geolocation" in navigator)) {
      dispatch({
        type: "SET_ERROR",
        payload: "Geolocation is not supported by your browser.",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      onPositionSuccess,
      onPositionError
    );
  }, [isLocationWeatherFetched, onPositionSuccess, onPositionError]);

  return { fetchWeatherByUserLocation };
};
