const currentDayWeatherFactory = (temp, condition, windSpeed, windDir, precip, humidty) => {
    return { temp, condition, windSpeed, windDir, precipitation, humidty };
  };

const futureDayWeatherFactory = (minTemp, maxTemp, condition, maxWindSpeed, totalPrecip, avgHumid, sunrise, sunset) => {
    return {minTemp, maxTemp, condition, maxWindSpeed, totalPrecip, avgHumid, sunrise, sunset}
}

class currentDayWeather{
    constructor(temp, condition, windSpeed, windDir, precip, humidty) {
      this.temp = temp;
      this.condition = condition;
      this.windSpeed = windSpeed;
      this.windDir = windDir;
      this.precip = precip;
      this.humidty = humidty;
    }
}

class forecastedWeather {
    constructor(minTemp, maxTemp, condition, maxWindSpeed, totalPrecip, avgHumid, sunrise, sunset) {
      this.minTemp = minTemp;
      this.maxTemp = maxTemp;
      this.condition = condition;
      this.maxWindSpeed = maxWindSpeed;
      this.totalPrecip = totalPrecip;
      this.avgHumid = avgHumid;
      this.sunrise = sunrise;
      this.sunset = sunset;
    }
}