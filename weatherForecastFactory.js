const currentDayWeatherFactory = (temp, condition, windSpeed, windDir, precip, humidty) => {
    return { temp, condition, windSpeed, windDir, precipitation, humidty };
  };

const futureDayWeatherFactory = (minTemp, maxTemp, condition, maxWindSpeed, totalPrecip, avgHumid, sunrise, sunset) => {
    return {minTemp, maxTemp, condition, maxWindSpeed, totalPrecip, avgHumid, sunrise, sunset}
}

export {
    currentDayWeatherFactory,
    futureDayWeatherFactory
  };