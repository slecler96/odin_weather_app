/**
 * Main
 */
const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

searchBtn.addEventListener("click", async () => {
  if (cityInput.value === "") return;
  try {
    let weatherData = await processWeatherData(cityInput.value);
    console.log(weatherData.day0.humidity)
    displayWeatherData(weatherData);
  } catch(err) {
    console.log('There was an error: ',err);
  }

});

/**
 * 
 * DOM manipulation functions 
 *  
 */

function displayWeatherData (weatherData) {

    console.log(weatherData.day0.temp)
}

/**
 * 
 * API functions 
 *  
 */
async function getWeatherFromAPI(city) {
    try {
        const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=f5ca21dce1af448a972120856230809&q='
        +city+'&days=3&aqi=no&alerts=no', {mode: 'cors'})
        if (!response.ok) {
            throw new Error(`City ${city} not found. Please pass a valid US Zipcode, UK Postcode, Canada Postalcode, 
            IP address, Latitude/Longitude (decimal degree) or city name`)
        } 
        
        const weatherData = await response.json();
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const d = new Date();
        let day = days[d.getDay()];
        console.log(day) 
        return weatherData
    } catch (err) {
        throw err;
    }
};

//const weatherData = getWeatherFromAPI('Paris')



async function processWeatherData(city) {
    const weatherData = await getWeatherFromAPI(city)
//    localTime = processLocalTimeData(weatherData)
    currentDayWeather = processCurrentDayData(weatherData.current)
    oneDayForecast = currentDayWeatherFactory(weatherData.forecast.forecastday[1])
    twoDayForecast = currentDayWeatherFactory(weatherData.forecast.forecastday[2])
    console.log(currentDayWeather.condition)
    return {day0: currentDayWeather, day1: oneDayForecast, day2: twoDayForecast}
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