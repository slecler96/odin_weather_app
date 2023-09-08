
async function getWeatherFromAPI(city) {
    try {
        const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=f5ca21dce1af448a972120856230809&q='
        +city+'&days=3&aqi=no&alerts=no', {mode: 'cors'})
        const weatherData = await response.json();
//        console.log(weatherData) 
        return weatherData
    } catch (err) {
        console.log('There was an error', err);
    }
};

const weatherData = getWeatherFromAPI('Paris')

processWeatherData('Paris') 

async function processWeatherData(city) {
    const weatherData = await getWeatherFromAPI(city)
    
    currentDayWeather = processCurrentDayData(weatherData.current)
    oneDayForecast = currentDayWeatherFactory(weatherData.forecast.forecastday[1])
    twoDayForecast = currentDayWeatherFactory(weatherData.forecast.forecastday[2])
    console.log(currentDayWeather.condition)


}


function processCurrentDayData(weatherCurrentDay) {
    temp = weatherCurrentDay.temp_c;
    condition = weatherCurrentDay.condition.text;
    windSpeed = weatherCurrentDay.windSpeed;
    windDir = weatherCurrentDay.windDir;
    precip = weatherCurrentDay.precip;
    humidity = weatherCurrentDay.humidity;
    currentDayWeather = currentDayWeatherFactory(temp, condition, windSpeed, windDir, precip, humidity);
    return currentDayWeather
}


function processForecastData(weatherForecast) {
    maxTemp = weatherForecast.maxtemp_c;
    minTemp = weatherForecast.mintemp_c;
    condition = weatherForecast.condition.text;
    maxWindSpeed = weatherForecast.maxwind_kph;
    totalPrecip = weatherForecast.totalprecip_mm;
    avgHumid = weatherForecast.avghumidity;
    sunrise = weatherForecast.sunrise;
    sunset = weatherForecast.sunset;
    forecastedWeather = futureDayWeatherFactory(minTemp, maxTemp, condition, maxWindSpeed, totalPrecip, avgHumid, sunrise, sunset);
    return forecastedWeather
}

const currentDayWeatherFactory = (temp, condition, windSpeed, windDir, precip, humidity) => {
    return { temp, condition, windSpeed, windDir, precip, humidity };
  };

const futureDayWeatherFactory = (minTemp, maxTemp, condition, maxWindSpeed, totalPrecip, avgHumid, sunrise, sunset) => {
    return {minTemp, maxTemp, condition, maxWindSpeed, totalPrecip, avgHumid, sunrise, sunset}
}