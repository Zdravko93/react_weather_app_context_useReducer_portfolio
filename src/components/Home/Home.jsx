import { useEffect, useRef, Suspense, lazy } from "react";

import loadingClasses from "../UI/Loading/Loading.module.css";
import geolocationThemeSwitcherButtonGroupClasses from "../UI/geolocationThemeSwitcherButtonGroupClasses.module.css";
import searchInputClasses from "../UI/Search/Search.module.css";

import Card from "../UI/Card.jsx";
import Search from "../UI/Search/Search.jsx";
import SectionDivider from "../UI/SectionDivider/SectionDivider.jsx";
import WeatherCard from "./WeatherBasicCard/WeatherCardMain/WeatherCard.jsx";
import Loading from "../UI/Loading/Loading.jsx";
import Button from "../UI/Button.jsx";
import FavoriteCities from "../UI/FavoriteCities/FavoriteCities.jsx";
import ThemeSwitcher from "../UI/ThemeSwitcher/ThemeSwitcher.jsx";
import ErrorMessage from "../UI/Error/ErrorMessage.jsx";

import { useWeatherContext } from "../../context/WeatherContext.jsx";
import { useWeatherData } from "../../hooks/useWeatherData.js";
import { useUserLocationWeather } from "../../hooks/useUserLocationWeather.js";

const WeatherDetailsCard = lazy(() =>
  import("./WeatherDetailsCard/WeatherDetailsMain/WeatherDetailsCard.jsx")
);

const API_KEY = process.env.REACT_APP_API_KEY;

function Home() {
  const { state } = useWeatherContext();
  const { fetchCityWeather } = useWeatherData(API_KEY);
  const { fetchWeatherByUserLocation } = useUserLocationWeather(API_KEY);

  const { city, weatherData, isLoading, error, isWeatherDetailsVisible } =
    state;

  const prevCityRef = useRef();

  useEffect(() => {
    if (city && city !== prevCityRef.current) {
      prevCityRef.current = city;
      fetchCityWeather(city);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, fetchCityWeather]);

  return (
    <main style={{ position: "relative", minHeight: "500px" }}>
      {/* screen reader header */}
      <h1 className="visually-hidden">Weather Application</h1>

      <SectionDivider />

      {/* SEARCH INPUT */}
      {!isWeatherDetailsVisible && (
        <Search searchInputClassName={searchInputClasses["search-wrapper"]} />
      )}

      {/* GEOLOCATION AND GLOBAL THEME SWITCHER BUTTON GROUP */}
      <Card
        WRAPPER="div"
        className={
          geolocationThemeSwitcherButtonGroupClasses[
            "geolocation-theme-switcher-button-group"
          ]
        }
      >
        <Button
          className={
            geolocationThemeSwitcherButtonGroupClasses["geolocation-btn"]
          }
          aria-label="Fetch weather based on your current location"
          callback={() => fetchWeatherByUserLocation()}
        >
          Use current location
        </Button>
        <ThemeSwitcher
          className={
            geolocationThemeSwitcherButtonGroupClasses[
              "theme-switcher-btn-global"
            ]
          }
        />
      </Card>

      {/* LOADING SPINNER */}
      {isLoading && !isWeatherDetailsVisible && (
        <Loading className={loadingClasses["loading-text"]}>Loading...</Loading>
      )}

      {/* USER CITY SEARCH FEEDBACKS */}
      {!isWeatherDetailsVisible && !weatherData && !isLoading && !error && (
        <p className="no-data-placeholder" aria-live="polite">
          Enter a city to get weather details.
        </p>
      )}
      {error && !isWeatherDetailsVisible && (
        <ErrorMessage>{error}</ErrorMessage>
      )}

      {/* BASIC WEATHER CARD */}
      {!isWeatherDetailsVisible && weatherData && <WeatherCard />}
      {/* Conditionally render WeatherDetailsCard and provide FALLBACK */}
      <Suspense fallback={<Loading>Loading...</Loading>}>
        {/* handle visibility or animations based on isWeatherDetailsVisible */}
        {isWeatherDetailsVisible && <WeatherDetailsCard />}
      </Suspense>

      <SectionDivider />

      <FavoriteCities />
    </main>
  );
}

export default Home;
