export const initialState = {
  API_KEY: process.env.REACT_APP_API_KEY,
  searchQuery: "",
  city: null,
  suggestions: [],
  weatherData: null,
  forecastData: null,
  airQualityData: null,
  uvIndex: null,
  windData: null,
  sunrise: null,
  sunset: null,
  humidity: null,
  error: null,
  isLoading: false,
  fadeIn: false,
  isCelsius: true,
  isWeatherDetailsVisible: false,
  isCitySearched: false,
  favoriteCities: [],
};

export function weatherReducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      if (state.searchQuery === action.payload) return state;
      return { ...state, searchQuery: action.payload };

    case "SET_CITY":
      if (state.city === action.payload) return state;
      return { ...state, city: action.payload, suggestions: [] };

    case "SET_SUGGESTIONS":
      if (JSON.stringify(state.suggestions) === JSON.stringify(action.payload))
        return state;
      return { ...state, suggestions: action.payload };

    case "SET_LOADING":
      if (state.isLoading === action.payload) return state;
      return { ...state, isLoading: action.payload };

    case "SET_ERROR":
      if (state.error === action.payload) return state;
      return { ...state, error: action.payload };

    case "TOGGLE_UNIT":
      if (state.isCelsius === (action.payload === "celsius")) return state;
      return { ...state, isCelsius: action.payload === "celsius" };

    case "TOGGLE_WEATHER_DETAILS":
      if (state.isWeatherDetailsVisible === action.payload) return state;
      return { ...state, isWeatherDetailsVisible: action.payload };

    case "SET_FADE_IN":
      if (state.fadeIn === action.payload) return state;
      return { ...state, fadeIn: action.payload };

    case "SET_CITY_SEARCHED":
      if (state.isCitySearched === action.payload) return state;
      return { ...state, isCitySearched: action.payload };

    case "SET_FAVORITE_CITIES":
      if (
        JSON.stringify(state.favoriteCities) === JSON.stringify(action.payload)
      )
        return state;
      if (typeof window !== "undefined") {
        localStorage.setItem("favoriteCities", JSON.stringify(action.payload));
      }
      return { ...state, favoriteCities: action.payload };

    case "SET_ALL_WEATHER_DATA": {
      const {
        weatherData,
        forecastData,
        airQualityData,
        uvIndex,
        humidity,
        windData,
        sunrise,
        sunset,
      } = action.payload;

      const noChanges =
        JSON.stringify(state.weatherData) === JSON.stringify(weatherData) &&
        JSON.stringify(state.forecastData) === JSON.stringify(forecastData) &&
        JSON.stringify(state.airQualityData) ===
          JSON.stringify(airQualityData) &&
        state.uvIndex === uvIndex &&
        state.humidity === humidity &&
        JSON.stringify(state.windData) === JSON.stringify(windData) &&
        state.sunrise === sunrise &&
        state.sunset === sunset;

      if (noChanges) return state;

      return {
        ...state,
        weatherData,
        forecastData,
        airQualityData,
        uvIndex,
        humidity,
        windData,
        sunrise,
        sunset,
        error: null,
      };
    }

    default:
      return state;
  }
}
