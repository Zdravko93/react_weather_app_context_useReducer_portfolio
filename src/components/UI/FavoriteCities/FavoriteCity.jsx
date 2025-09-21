import React from "react";

import favoritesIcon from "../../../assets/star.png";

import Image from "../Image";
import Button from "../Button";

import { useCitySearch } from "../../../hooks/useCitySearch";
import { useFavorites } from "../../../hooks/useFavorites";

const FavoriteCity = React.memo(function FavoriteCity({ city }) {
  const { handleCityForecast } = useCitySearch();
  const { handleRemoveFromFavorites } = useFavorites();

  return (
    <li>
      <span>
        <Image imgSrc={favoritesIcon} altText="" />
        {city
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ")}
      </span>

      <div>
        <Button callback={() => handleRemoveFromFavorites(city)}>Remove</Button>
        <Button callback={() => handleCityForecast(city)}>Forecast</Button>
      </div>
    </li>
  );
});

export default FavoriteCity;
