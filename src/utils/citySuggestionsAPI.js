// fetch city suggestions for autocomplete feature
export const fetchCitySuggestions = async (query, API_KEY) => {
  if (!query.trim()) return [];

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/find?q=${encodeURIComponent(
        query
      )}&appid=${API_KEY}`
    );

    if (!response.ok) {
      console.error("Failed to fetch city suggestions", response.statusText);
      return [];
    }

    const data = await response.json();

    const filteredSuggestions = data.list?.filter((city) =>
      city.name.toLowerCase().startsWith(query.toLowerCase())
    );

    return filteredSuggestions || [];
  } catch (error) {
    console.error("Error fetching city suggestions", error);
    return [];
  }
};
