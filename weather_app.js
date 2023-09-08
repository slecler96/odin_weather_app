import {currentDayWeatherFactory, futureDayWeatherFactory} from './weatherForecastFactory';

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


async function processWeatherData(city) {
    const weatherData = await getWeatherFromAPI(city)
    console.log(weatherData.location);
    currentDayWeather = processCurrentDayData(weatherData.current)
    temp = weatherData.current.temp_c
    condition = weatherData.current.condition
    windSpeed = weatherData.current.windSpeed
    windDir = weatherData.current.windDir
    precip = weatherData.current.precip
    humidity = weatherData.current.humidty

    currentDayWeather = currentDayWeatherFactory(temp, condition, windSpeed, windDir, precip, humidty)
}


function processCurrentDayData(weatherCurrentDay) {
    temp = weatherData.current.temp_c
    condition = weatherData.current.condition
    windSpeed = weatherData.current.windSpeed
    windDir = weatherData.current.windDir
    precip = weatherData.current.precip
    humidity = weatherData.current.humidty
    console.log(humidity)
    currentDayWeather = currentDayWeatherFactory(temp, condition, windSpeed, windDir, precip, humidty)
    return currentDayWeather
}

console.log(processWeatherData('paris'))