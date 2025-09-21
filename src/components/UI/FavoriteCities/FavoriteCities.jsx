import classes from "./FavoriteCities.module.css";

import Card from "../Card";
import Button from "../Button";
import FavoriteCity from "./FavoriteCity";

import { formatCityName } from "../../../utils/utilsFormatCity";
import { useFavorites } from "../../../hooks/useFavorites";
import { useWeatherContext } from "../../../context/WeatherContext"; // context hook

export default function FavoriteCities() {
  // Here I am also extractin weatherData to check if there is actual weather data for searched city
  // if not, searched query is not valid
  const { city, weatherData, favoriteCities } = useWeatherContext().state;
  const { handleAddToFavorites } = useFavorites();

  const normalizedCity = city?.trim().toLowerCase(); // make it lower cased for comparison
  // check if searched city is already on the favorites list
  const isOnFavoritesList = favoriteCities.some(
    (favCity) => favCity.toLowerCase() === normalizedCity
  );

  // Conditionally render 'Add to Favorites' button
  const showAddToFavorites = city && weatherData && !isOnFavoritesList;

  return (
    <Card WRAPPER="section" className={classes["favorite-cities-wrapper"]}>
      <h3>Favorite Cities</h3>
      <ul>
        {favoriteCities.length > 0 ? (
          favoriteCities.map((city, index) => (
            <FavoriteCity key={index} city={city} />
          ))
        ) : (
          <p className={classes["no-favorite-cities"]}>
            No favorite cities added yet.
          </p>
        )}
      </ul>
      {/* Conditionally render Add to Favorites button */}
      {showAddToFavorites && (
        <Button
          className="add-to-favorites-btn"
          callback={() => handleAddToFavorites(city)}
        >
          Add {formatCityName(city)} to Favorites
        </Button>
      )}
    </Card>
  );
}
