import React, { useState, useEffect, useRef, useCallback } from "react";

import searchIcon from "../../../assets/search-icon.png";
import searchInputClasses from "./Search.module.css";
import suggestionsListWeatherDetailsCardClasses from "../CitySuggestions/CitySuggestions.module.css";

import Card from "../../UI/Card";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Image from "../../UI/Image";
import CitySuggestions from "../CitySuggestions/CitySuggestions";

import { useWeatherContext } from "../../../context/WeatherContext";
import { useCitySearch } from "../../../hooks/useCitySearch";
import { useCitySuggestions } from "../../../hooks/useCitySuggestions";

const Search = React.memo(function Search({
  searchInputClassName,
  isDetailsHeaderSuggestions,
}) {
  const { dispatch } = useWeatherContext();
  const { API_KEY, searchQuery, suggestions } = useWeatherContext().state;

  const [localQuery, setLocalQuery] = useState(searchQuery || "");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const suggestionsRef = useRef(null);
  const debounceRef = useRef(null);

  const { handleCitySearch, handleCityForecast } = useCitySearch();
  const { getCitySuggestions } = useCitySuggestions(API_KEY);

  const detailsHeaderSuggestionsClass = isDetailsHeaderSuggestions
    ? suggestionsListWeatherDetailsCardClasses[
        "suggestions-list-details-header"
      ]
    : "";

  const handleInputBlur = useCallback(() => {
    setTimeout(() => {
      setIsSuggestionsVisible(false);
    }, 100); // introduce delay to allow click to register, before suggestion gets removed from the DOM
  }, []);

  const clearInputState = useCallback(() => {
    setLocalQuery("");
    dispatch({ type: "SET_SUGGESTIONS", payload: [] });
    setIsSuggestionsVisible(false);
    setActiveIndex(-1);
  }, [dispatch]);

  const handleSuggestionSelect = useCallback(
    (cityName) => {
      handleCityForecast(cityName);

      clearInputState();
    },
    [handleCityForecast, clearInputState]
  );

  const triggerSearch = useCallback(() => {
    const trimmed = localQuery.trim();
    if (trimmed.length < 3) return;

    dispatch({ type: "SET_SEARCH_QUERY", payload: trimmed });
    handleCitySearch(trimmed);

    clearInputState();
  }, [localQuery, dispatch, handleCitySearch, clearInputState]);

  const handleSearchInputKeyDown = useCallback(
    (e) => {
      const { key } = e;

      if (key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      } else if (key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      } else if (key === "Enter") {
        e.preventDefault();
        let selectedCity = null;

        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          selectedCity = suggestions[activeIndex].name;
        } else if (suggestions.length > 0) {
          selectedCity = suggestions[0].name;
        }

        if (selectedCity) {
          handleSuggestionSelect(selectedCity);
        } else {
          triggerSearch();
        }

        clearInputState();
      } else if (key === "Escape") {
        clearInputState();
      }
    },
    [
      activeIndex,
      suggestions,
      handleSuggestionSelect,
      triggerSearch,
      clearInputState,
    ]
  );

  const handleInputFocus = useCallback(() => {
    if (suggestions.length > 0) {
      setIsSuggestionsVisible(true);
    }
  }, [suggestions.length]);

  useEffect(() => {
    if (suggestions.length > 0) {
      setIsSuggestionsVisible(true);
    }
  }, [suggestions]);

  // fetch debounced suggestions
  useEffect(() => {
    const trimmed = localQuery.trim();

    if (trimmed.length < 3) {
      dispatch({ type: "SET_SUGGESTIONS", payload: [] });
      return;
    }

    debounceRef.current = setTimeout(() => {
      getCitySuggestions(trimmed);
      setActiveIndex(-1);
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [localQuery, dispatch, getCitySuggestions]);

  // sync local 'localQuery' state to global 'searchQuery'
  useEffect(() => {
    if (searchQuery !== localQuery) {
      setLocalQuery(searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <Card
      WRAPPER="div"
      className={`${searchInputClasses["search-wrapper"]} ${searchInputClassName}`}
    >
      <Button
        ariaLabel="Search weather for the entered city"
        title="Search"
        callback={triggerSearch}
        className={searchInputClasses["search-button"]}
      >
        <Image
          className={searchInputClasses["search-icon"]}
          imgSrc={searchIcon}
        />
      </Button>

      <Input
        ariaLabel="Search city"
        className={searchInputClasses.search}
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        onKeyDown={handleSearchInputKeyDown}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        type="text"
        placeholder="Search city..."
        autoComplete="off"
      />

      {isSuggestionsVisible && suggestions.length > 0 && (
        <CitySuggestions
          ref={suggestionsRef}
          detailsHeaderSuggestionsClass={detailsHeaderSuggestionsClass}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          handleCityForecast={handleSuggestionSelect}
        />
      )}
    </Card>
  );
});

export default Search;
