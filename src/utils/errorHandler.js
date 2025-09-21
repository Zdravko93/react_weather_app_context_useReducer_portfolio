export const getFriendlyError = (error) => {
  if (!error) return "Unknown error occurred.";

  const msg = error.message || String(error);

  if (msg.includes("City not found")) {
    return "City not found. Please try a valid city.";
  }

  if (msg.includes("Geolocation")) {
    return "Unable to access your location.";
  }

  return "Something went wrong. Please try again.";
};
