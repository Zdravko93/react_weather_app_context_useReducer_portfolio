export const kelvinToCelsius = (kelvin) => kelvin - 273.15;
export const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

export const convertTemperature = (temp, isCelsius) => {
  const celsius = kelvinToCelsius(temp);
  return isCelsius
    ? Math.round(celsius)
    : Math.round(celsiusToFahrenheit(celsius));
};
