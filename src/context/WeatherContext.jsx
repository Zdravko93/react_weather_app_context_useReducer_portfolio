import { createContext, useContext, useReducer, useMemo } from "react";
import { weatherReducer, initialState } from "./reducers";

const init = (initialState) => {
  if (typeof window !== "undefined") {
    return {
      ...initialState,
      favoriteCities:
        localStorage.getItem("favoriteCities") !== null
          ? JSON.parse(localStorage.getItem("favoriteCities"))
          : [],
    };
  }
  return initialState;
};

const WeatherContext = createContext();

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext muse be used within WeatherContext");
  }

  return context;
};

export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState, init);

  const memoizedValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <WeatherContext.Provider value={memoizedValue}>
      {children}
    </WeatherContext.Provider>
  );
};
