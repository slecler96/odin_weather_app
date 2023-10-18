import {
    getWeatherData,
    formatWeatherData,
} from './apiFunctions';

import {
    displayWeatherData,
    currentCountry,
    currentCity
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
    if (cityInput.value === "") return;
    forecastWeatherForCity(cityInput.value);
});

async function forecastWeatherForCity(city) {
    errorMessage.textContent = "";
    try {
      let weatherData = await getWeatherData(city);
      displayWeatherData(weatherData);
    } catch(err) {
      errorMessage.textContent = err.message;
    }
};

