/**
 * Main
 */

const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const errorMessage = document.getElementById("error_message");
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
const defaultCity = "Paris";

const APIKEY = "f5ca21dce1af448a972120856230809"

// only 2 forecast days available in the free subscription to WeatherAPI
const forecastLimit = 2

// global variables (city and country)
let currentCity = ""
let currentCountry = ""


/**
 * By default, display weather in Paris
 */
forecastWeatherForCity(defaultCity)


async function forecastWeatherForCity(city) {
    try {
      let weatherData = await getWeatherData(city);
      displayWeatherData(weatherData, currentCity, currentCountry);
    } catch(err) {
      errorMessage.textContent = err.message;
    }
}


/**
 * Display the weather data in the city entered by the user in the search form
 * If the city is not found by the API, display an error message
 */
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

searchBtn.addEventListener("click", async () => {
    errorMessage.textContent = "";
    if (cityInput.value === "") return;
    forecastWeatherForCity(cityInput.value) 
});

/**
 * 
 * DOM manipulation functions 
 *  
 */

function displayWeatherData (weatherData, currentCity) {
    displayCurrentWeatherData(weatherData, currentCity, currentCountry);
    displayForecastedWeatherData(weatherData);
}

/**
 * 
 * Display the real-time weather data in the selected city
 * 
 */
function displayCurrentWeatherData(weatherData, currentCity, currentCountry){
    currentDate.textContent = `${day} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    cityDisplay.textContent = `${currentCity}, ${currentCountry}`;
    currentHumidity.textContent = `Humidity: ${weatherData[0].humidity}%`;
    currentWind.textContent = `Wind: ${weatherData[0].windSpeed} km/h, ${weatherData[0].windDir}`;
    currentConditionIcon.src = `https:${weatherData[0].conditionIcon}`;
    currentTemp.textContent = `${weatherData[0].temp} °C`
}

/**
 * 
 * Display the 2-days forecast in the selected city
 * 
 */
function displayForecastedWeatherData(weatherData, currentCity, currentCountry){
    for (i = 1; i <= forecastLimit; i++) { 
        let forecastedWeatherData = weatherData[i];
        let day = document.getElementById("day"+i+"_date");
        let forecastedConditionImg = document.getElementById("day"+i+"_weather_img");
        let forecastedMinTemp =  document.getElementById("day"+i+"_min_temp");
        let forecastedMaxTemp =  document.getElementById("day"+i+"_max_temp");
        let forecastedWind =  document.getElementById("day"+i+"_wind");
        let forecastedHumidity = document.getElementById("day"+i+"_humidity");

        day.textContent = days[date.getDay() <= 5  ? date.getDay()+i : 0+(i-1)];
        forecastedConditionImg.src = `https:${forecastedWeatherData.conditionIcon}`;
        forecastedMinTemp.textContent = `${forecastedWeatherData.minTemp} °C`;
        forecastedMaxTemp.textContent = `${forecastedWeatherData.maxTemp} °C`;
        forecastedWind.textContent  = `Wind: ${forecastedWeatherData.maxWindSpeed} km/h`;
        forecastedHumidity.textContent = `Humidity: ${forecastedWeatherData.avgHumid}%`;
    }
}


/**
 * 
 * API functions 
 *  
 */


/**
 * 
 * Fetch the weather data in the  chosen city API WeatherAPI
 * If the request fails, throw an error
 */
async function getWeatherFromAPI(city) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=
    ${city}&days=3&aqi=no&alerts=no`, {mode: 'cors'})
    if (!response.ok) {
        throw new Error(`City "${city}" not found. Please pass a valid city name US Zipcode, UK Postcode, Canada Postalcode, 
        IP address or Latitude/Longitude (decimal degree).`)
    } 
    return response.json();
};



/**
 * 
 * Return an array with objects containing real-time and forecasted weather data
 */
async function getWeatherData(city) {
    const weatherData = await getWeatherFromAPI(city)
    currentCity = weatherData.location.name
    currentCountry = weatherData.location.country
    currentDayWeather = formatCurrentDayData(weatherData.current)

    oneDayForecast = formatForecastData(weatherData.forecast.forecastday[1].day)
    twoDayForecast = formatForecastData(weatherData.forecast.forecastday[2].day)
    return [currentDayWeather, oneDayForecast, twoDayForecast]
}

/**
 * 
 * Return an object containing the real-time weather data
 */
function formatCurrentDayData(weatherCurrentDay) {
    return {
        temp: weatherCurrentDay.temp_c,
        condition: weatherCurrentDay.condition.text,
        conditionIcon: weatherCurrentDay.condition.icon,
        windSpeed: weatherCurrentDay.wind_kph,
        windDir: weatherCurrentDay.wind_dir,
        precip: weatherCurrentDay.precip_mm,
        humidity: weatherCurrentDay.humidity,
    }
}

/**
 * 
 * Return an object containing the forecasted weather data
 */
function formatForecastData(weatherForecast) {
    return {
        minTemp: weatherForecast.mintemp_c,
        maxTemp: weatherForecast.maxtemp_c,
        condition: weatherForecast.condition.text,
        conditionIcon: weatherForecast.condition.icon,
        maxWindSpeed: weatherForecast.maxwind_kph,
        totalPrecip: weatherForecast.totalprecip_mm,
        avgHumid: weatherForecast.avghumidity,
        sunrise: weatherForecast.sunrise,
        sunset: weatherForecast.sunset,
    }
}


