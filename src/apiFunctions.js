const APIKEY = "f5ca21dce1af448a972120856230809"

// global variables (city and country)
let currentCity = ""
let currentCountry = ""


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
 * Return an array with objects containing raw real-time and forecasted weather data
 */
async function getWeatherData(city) {
    const weatherData = await getWeatherFromAPI(city)
    currentCity = weatherData.location.name
    currentCountry = weatherData.location.country
    let formattedWeatherData = formatWeatherData(weatherData.current, weatherData.forecast.forecastday[1].day, weatherData.forecast.forecastday[2].day)
    return formattedWeatherData
};


/**
 * 
 * Return an array with objects containing formatted real-time and forecasted weather data (contains only the weather data displayed in the app)
 */
function formatWeatherData(currentDayData, oneDayForecastData, twoDayForecasData) {
    const currentDayWeather = formatCurrentDayData(currentDayData)
    const oneDayForecast = formatForecastData(oneDayForecastData)
    const twoDayForecast = formatForecastData(twoDayForecasData)
    return [currentDayWeather, oneDayForecast, twoDayForecast]   
};

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
};

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
};


export {
    getWeatherData,
    formatWeatherData,
    currentCity,
    currentCountry
};