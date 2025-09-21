export const formatCityName = (cityName) => {
  if (typeof cityName !== "string") {
    console.warn("formatCityName: expected string but got", cityName);
    return "";
  }

  return cityName
    .trim()
    .split(/\s+/) // split on one or more spaces to avoid empty parts
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
