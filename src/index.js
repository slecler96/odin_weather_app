import {
    getWeatherData,
    formatWeatherData,
    currentCity,
    currentCountry
} from './apiFunctions';

import {
    displayWeatherData,
} from './domFunctions';

const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const defaultCity = "Paris";
const errorMessage = document.getElementById("error_message");

/**
 * By default, display weather in Paris
 */
forecastWeatherForCity(defaultCity)

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

async function forecastWeatherForCity(city) {
    try {
      let weatherData = await getWeatherData(city);
//      let formattedWeatherData = formatWeatherData(weatherData[0], weatherData[1], weatherData[2])
      console.log(currentCity)
      console.log(currentCountry)
      displayWeatherData(weatherData, currentCity, currentCountry);
    } catch(err) {
      errorMessage.textContent = err.message;
    }
}

