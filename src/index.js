// Pense à rajouter un fichier .gitignore pour éviter de mettre le dossier dist dans ton repo

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

// On a toujours des problèmes de race condition si on clique plein de fois, ça peut être pas mal de se demander comment tu pourrais résoudre cela !
  searchBtn.addEventListener("click", async () => {
      errorMessage.textContent = "";
      if (cityInput.value === "") return;
      forecastWeatherForCity(cityInput.value)
  });

  // Uh uh c'est difficile à lire avec les indentations qui sont pas au même niveau (regarde où est le { et le } pour cette fonction
  // Je sais pas si ils en parlent dans Odin mais tu pourrais regarder ce qu'est un linter pour t'aider à garder un formattage sympa
  // Tu utilises quoi comme éditeur de code ?
  async function forecastWeatherForCity(city) {
    try {
      let weatherData = await getWeatherData(city);
      // Tu devrais plutôt faire directement ton formatWeatherData dans ton getWeatherData
      // C'est une bonne pratique : la couche qui te permet d'interagir avec l'extérieur te renvoie un format unifié
      // Si un jour tu changes d'API, tu n'auras qu'à changer la fonction getWeatherData pour te renvoyer le même format unifié et ce sera bon
      let formattedWeatherData = formatWeatherData(weatherData[0], weatherData[1], weatherData[2])
      console.log(currentCity)
      console.log(currentCountry)
      displayWeatherData(formattedWeatherData, currentCity, currentCountry);
    } catch(err) {
        // Si tu veux t'y retrouver, je te conseilles de faire le cleanup de errorMessage et le set de errorMessage au "même niveau" :
        // donc soit tu fait le errorMessage.textContent = "" au début de cette fonction
        // soit tu remontes le try / catch dans ton event listener
      errorMessage.textContent = err.message;
    }
}

