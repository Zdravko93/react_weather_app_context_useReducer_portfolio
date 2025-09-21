import { convertTemperature } from "./utilsTemperatureData";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getNextFiveDays = (currentDay) => {
  const currentIndex = weekdays.indexOf(currentDay);
  if (currentIndex === -1) return [];

  // Return next 5 days, cycling through the week array
  const days = [];
  for (let i = 1; i <= 5; i++) {
    days.push(weekdays[(currentIndex + i) % weekdays.length]);
  }
  return days;
};

export const renderForecastData = (forecastData, isCelsius) => {
  if (!forecastData?.list || forecastData.list.length === 0) {
    return null;
  }

  // Group forecast items by day (date string)
  const groupedByDay = forecastData.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toISOString().split("T")[0]; // yyyy-mm-dd
    if (!acc[dayKey]) acc[dayKey] = [];
    acc[dayKey].push(item);
    return acc;
  }, {});

  // Get next 5 days keys sorted
  const dayKeys = Object.keys(groupedByDay).slice(0, 5);

  const forecast = dayKeys.map((dayKey) => {
    const dayForecastData = groupedByDay[dayKey];
    const date = new Date(dayForecastData[0].dt * 1000);
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });

    const unit = isCelsius ? "°C" : "°F";
    const iconCode = dayForecastData[0].weather[0].icon;
    const weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const maxTemperature = Math.max(
      ...dayForecastData.map((item) =>
        convertTemperature(item.main.temp_max, isCelsius)
      )
    );
    const minTemperature = Math.min(
      ...dayForecastData.map((item) =>
        convertTemperature(item.main.temp_min, isCelsius)
      )
    );

    return {
      date,
      dayOfWeek,
      unit,
      weatherIconUrl,
      maxTemp: maxTemperature,
      minTemp: minTemperature,
    };
  });

  return { forecast };
};
