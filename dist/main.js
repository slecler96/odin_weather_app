/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apiFunctions.js":
/*!*****************************!*\
  !*** ./src/apiFunctions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formatWeatherData: () => (/* binding */ formatWeatherData),\n/* harmony export */   getWeatherData: () => (/* binding */ getWeatherData)\n/* harmony export */ });\nconst APIKEY = \"f5ca21dce1af448a972120856230809\"\n\n\n\n\n/**\n * \n * Fetch the weather data in the  chosen city API WeatherAPI\n * If the request fails, throw an error\n */\nasync function getWeatherFromAPI(city) {\n    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=\n    ${city}&days=3&aqi=no&alerts=no`, {mode: 'cors'})\n    if (!response.ok) {\n        throw new Error(`City \"${city}\" not found. Please pass a valid city name US Zipcode, UK Postcode, Canada Postalcode, \n        IP address or Latitude/Longitude (decimal degree).`)\n    } \n    return response.json();\n};\n\n\n\n/**\n * \n * Return an array with objects containing raw real-time and forecasted weather data\n */\nasync function getWeatherData(city) {\n    const weatherData = await getWeatherFromAPI(city)\n//    currentCity = weatherData.location.name\n//    currentCountry = weatherData.location.country\n    let formattedWeatherData = formatWeatherData(weatherData.location.country, weatherData.location.name, weatherData.current, weatherData.forecast.forecastday[1].day, weatherData.forecast.forecastday[2].day)\n    return formattedWeatherData\n};\n\n\n/**\n * \n * Return an array with objects containing formatted real-time and forecasted weather data (contains only the weather data displayed in the app)\n */\nfunction formatWeatherData(currentCountry, currentCity, currentDayData, oneDayForecastData, twoDayForecasData) {\n    const currentDayWeather = formatCurrentDayData(currentDayData)\n    const oneDayForecast = formatForecastData(oneDayForecastData)\n    const twoDayForecast = formatForecastData(twoDayForecasData)\n    return [currentCountry, currentCity, currentDayWeather, oneDayForecast, twoDayForecast]   \n};\n\n/**\n * \n * Return an object containing the real-time weather data\n */\nfunction formatCurrentDayData(weatherCurrentDay) {\n    return {\n        temp: weatherCurrentDay.temp_c,\n        condition: weatherCurrentDay.condition.text,\n        conditionIcon: weatherCurrentDay.condition.icon,\n        windSpeed: weatherCurrentDay.wind_kph,\n        windDir: weatherCurrentDay.wind_dir,\n        precip: weatherCurrentDay.precip_mm,\n        humidity: weatherCurrentDay.humidity,\n    }\n};\n\n/**\n * \n * Return an object containing the forecasted weather data\n */\nfunction formatForecastData(weatherForecast) {\n    return {\n        minTemp: weatherForecast.mintemp_c,\n        maxTemp: weatherForecast.maxtemp_c,\n        condition: weatherForecast.condition.text,\n        conditionIcon: weatherForecast.condition.icon,\n        maxWindSpeed: weatherForecast.maxwind_kph,\n        totalPrecip: weatherForecast.totalprecip_mm,\n        avgHumid: weatherForecast.avghumidity,\n        sunrise: weatherForecast.sunrise,\n        sunset: weatherForecast.sunset,\n    }\n};\n\n\n\n\n//# sourceURL=webpack://odin_weather_app_webpack/./src/apiFunctions.js?");

/***/ }),

/***/ "./src/domFunctions.js":
/*!*****************************!*\
  !*** ./src/domFunctions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   displayWeatherData: () => (/* binding */ displayWeatherData)\n/* harmony export */ });\n// only 2 forecast days available in the free subscription to WeatherAPI\nconst forecastLimit = 2\nconst cityDisplay = document.getElementById(\"city_display\");\nconst currentConditionImg = document.getElementById(\"current_weather_img\");\nconst currentHumidity = document.getElementById(\"current_humidity\");\nconst currentWind = document.getElementById(\"current_wind\");\nconst currentTemp = document.getElementById(\"current_temp\");\nconst currentDate = document.getElementById(\"current_date\");\nconst currentConditionIcon = document.getElementById(\"current_weather_img\");\n\nconst days = [\"Sunday\", \"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\"];\nconst date = new Date();\nconst day = days[date.getDay()];\n\n// global variables (city and country)\nlet currentCity = \"\"\nlet currentCountry = \"\"\n\nfunction displayWeatherData (weatherData) {\n    currentCountry = weatherData[0];\n    currentCity = weatherData[1];\n    displayCurrentWeatherData(weatherData.slice(2), currentCity, currentCountry);\n    displayForecastedWeatherData(weatherData.slice(2));\n};\n\n/**\n * \n * Display the real-time weather data in the selected city\n * \n */\nfunction displayCurrentWeatherData(weatherData, currentCity, currentCountry){\n    currentDate.textContent = `${day} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;\n    cityDisplay.textContent = `${currentCity}, ${currentCountry}`;\n    currentHumidity.textContent = `Humidity: ${weatherData[0].humidity}%`;\n    currentWind.textContent = `Wind: ${weatherData[0].windSpeed} km/h, ${weatherData[0].windDir}`;\n    currentConditionIcon.src = `https:${weatherData[0].conditionIcon}`;\n    currentTemp.textContent = `${weatherData[0].temp} °C`\n};\n\n/**\n * \n * Display the 2-days forecast in the selected city (the free version of weatherAPI allows only 2 days forecast)\n * \n */\nfunction displayForecastedWeatherData(weatherData){\n    for (let i = 1; i <= forecastLimit; i++) { \n        let forecastedWeatherData = weatherData[i];\n        let day = document.getElementById(\"day\"+i+\"_date\");\n        let forecastedConditionImg = document.getElementById(\"day\"+i+\"_weather_img\");\n        let forecastedMinTemp =  document.getElementById(\"day\"+i+\"_min_temp\");\n        let forecastedMaxTemp =  document.getElementById(\"day\"+i+\"_max_temp\");\n        let forecastedWind =  document.getElementById(\"day\"+i+\"_wind\");\n        let forecastedHumidity = document.getElementById(\"day\"+i+\"_humidity\");\n\n        day.textContent = days[date.getDay() <= 5  ? date.getDay()+i : 0+(i-1)];\n        forecastedConditionImg.src = `https:${forecastedWeatherData.conditionIcon}`;\n        forecastedMinTemp.textContent = `${forecastedWeatherData.minTemp} °C`;\n        forecastedMaxTemp.textContent = `${forecastedWeatherData.maxTemp} °C`;\n        forecastedWind.textContent  = `Wind: ${forecastedWeatherData.maxWindSpeed} km/h`;\n        forecastedHumidity.textContent = `Humidity: ${forecastedWeatherData.avgHumid}%`;\n    }\n};\n\n\n\n//# sourceURL=webpack://odin_weather_app_webpack/./src/domFunctions.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _apiFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiFunctions */ \"./src/apiFunctions.js\");\n/* harmony import */ var _domFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domFunctions */ \"./src/domFunctions.js\");\n\n\n\n\nconst searchForm = document.getElementById(\"searchForm\");\nconst cityInput = document.getElementById(\"cityInput\");\nconst searchBtn = document.getElementById(\"searchBtn\");\nconst defaultCity = \"Paris\";\nconst errorMessage = document.getElementById(\"error_message\");\n\n\n\n/**\n * By default, display weather in Paris\n */\nforecastWeatherForCity(defaultCity)\n\n/**\n * Display the weather data in the city entered by the user in the search form\n * If the city is not found by the API, display an error message\n */\nsearchForm.addEventListener(\"submit\", (e) => {\n    e.preventDefault();\n});\n  \nsearchBtn.addEventListener(\"click\", async () => {\n    errorMessage.textContent = \"\";\n    if (cityInput.value === \"\") return;\n    try {\n      forecastWeatherForCity(cityInput.value) \n    } catch(err) {\n      errorMessage.textContent = err.message;\n    }  \n});\n\nasync function forecastWeatherForCity(city) {\n      let weatherData = await (0,_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)(city);\n      (0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.displayWeatherData)(weatherData, currentCity, currentCountry);\n};\n\n\n\n//# sourceURL=webpack://odin_weather_app_webpack/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;