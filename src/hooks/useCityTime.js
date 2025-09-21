import { useMemo } from "react";
import moment from "moment-timezone";
import { getTimeZoneNameFromOffset } from "../utils/utilsTimeZoneData";

// Return a static time snapshot when forecastData updates.
export const useCityTime = (forecastData) => {
  const cityTimezone = useMemo(() => {
    if (forecastData?.city?.timezone !== undefined) {
      const tz = getTimeZoneNameFromOffset(forecastData.city.timezone);
      if (tz) return tz;
    }
    return moment.tz.guess(); // fallback to local
  }, [forecastData]);

  const timeSnapshot = useMemo(() => {
    const localTime = moment().tz(cityTimezone);

    return {
      currentTime: localTime.format("HH:mm"),
      currentDayOfWeek: localTime.format("dddd"),
      currentDate: localTime.format("DD.MM.YYYY"),
    };
  }, [cityTimezone]);

  return timeSnapshot;
};
