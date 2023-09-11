/**
 * Main
 */
const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");


const cityDisplay = document.getElementById("city_display");
const currentConditionImg = document.getElementById("current_weather_img");
const currentHumidity = document.getElementById("current_humidity");
const currentWind = document.getElementById("current_wind");
const currentTemp = document.getElementById("current_temp");
const currentDate = document.getElementById("current_date");
const currentConditionIcon = document.getElementById("current_weather_img");

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const date = new Date();
const day = days[date.getDay()];

let currentLocation = "Paris"

defaultForecast()

/**
 * By default, display weather in Paris
 */

async function defaultForecast(){
    let weatherData = await processWeatherData("Paris")
    console.log('WEATHER '+weatherData.day0)
    displayWeatherData(weatherData,currentLocation)
}





searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

searchBtn.addEventListener("click", async () => {
  if (cityInput.value === "") return;
  try {
    let weatherData = await processWeatherData(cityInput.value);
    console.log(weatherData.day0.humidity)
    displayWeatherData(weatherData, currentLocation);
  } catch(err) {
    console.log('There was an error: ',err);
  }

});

/**
 * 
 * DOM manipulation functions 
 *  
 */

function displayWeatherData (weatherData, currentLocation) {
    displayCurrentWeatherData(weatherData, currentLocation);
}


function displayCurrentWeatherData(weatherData, currentLocation){
    currentDate.textContent = `${day} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    cityDisplay.textContent = currentLocation;
    currentHumidity.textContent = `Humidity: ${weatherData.day0.humidity}%`;
    console.log('humid '+weatherData.day0.humidity)
    currentWind.textContent = `Wind: ${weatherData.day0.windSpeed} km/h, ${weatherData.day0.windDir}`;
    currentConditionIcon.src = `https:${weatherData.day0.conditionIcon}`;
    currentTemp.textContent = weatherData.day0.temp
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

        return weatherData
    } catch (err) {
        throw err;
    }
};

//const weatherData = getWeatherFromAPI('Paris')



async function processWeatherData(city) {
    const weatherData = await getWeatherFromAPI(city)
//    localTime = processLocalTimeData(weatherData)
    currentLocation = weatherData.location.name
    currentDayWeather = processCurrentDayData(weatherData.current)
    oneDayForecast = currentDayWeatherFactory(weatherData.forecast.forecastday[1])
    twoDayForecast = currentDayWeatherFactory(weatherData.forecast.forecastday[2])
    console.log(currentDayWeather.condition)
    return {day0: currentDayWeather, day1: oneDayForecast, day2: twoDayForecast}
}


function processCurrentDayData(weatherCurrentDay) {
    temp = weatherCurrentDay.temp_c;
    condition = weatherCurrentDay.condition.text;
    conditionIcon = weatherCurrentDay.condition.icon;
    windSpeed = weatherCurrentDay.wind_kph;
    windDir = weatherCurrentDay.wind_dir;
    precip = weatherCurrentDay.precip_mm;
    humidity = weatherCurrentDay.humidity;
    currentDayWeather = currentDayWeatherFactory(temp, condition, conditionIcon, windSpeed, windDir, precip, humidity);
    return currentDayWeather
}


function processForecastData(weatherForecast) {
    maxTemp = weatherForecast.maxtemp_c;
    minTemp = weatherForecast.mintemp_c;
    condition = weatherForecast.condition.text;
    conditionIcon = weatherForecast.condition.icon;
    maxWindSpeed = weatherForecast.maxwind_kph;
    totalPrecip = weatherForecast.totalprecip_mm;
    avgHumid = weatherForecast.avghumidity;
    sunrise = weatherForecast.sunrise;
    sunset = weatherForecast.sunset;
    forecastedWeather = futureDayWeatherFactory(minTemp, maxTemp, condition, conditionIcon, maxWindSpeed, totalPrecip, avgHumid, sunrise, sunset);
    return forecastedWeather
}

const currentDayWeatherFactory = (temp, condition, conditionIcon, windSpeed, windDir, precip, humidity) => {
    return { temp, condition, conditionIcon, windSpeed, windDir, precip, humidity };
  };

const futureDayWeatherFactory = (minTemp, maxTemp, condition, conditionIcon, maxWindSpeed, totalPrecip, avgHumid, sunrise, sunset) => {
    return {minTemp, maxTemp, condition, conditionIcon, maxWindSpeed, totalPrecip, avgHumid, sunrise, sunset}
}