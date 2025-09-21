import humidityNormalImg from "../assets/humidity-normal.png";
import humidityAverageImg from "../assets/humidity-average.png";
import humidityHighImg from "../assets/humidity-high.png";

export const getHumidityMark = (humidityPercentage) => {
  let mark;
  let description;

  if (humidityPercentage <= 25) {
    description = "Normal";
    mark = humidityNormalImg;
  } else if (humidityPercentage <= 56) {
    description = "Average";
    mark = humidityAverageImg;
  } else {
    description = "High";
    mark = humidityHighImg;
  }

  return { mark, description };
};
