const API_KEY = localStorage.getItem("OWM_API_KEY");
const DOM = {
    inputBox: document.getElementsByTagName("input")[0],
    queryBtn: document.getElementsByTagName("button")[0],
    outputContent:document.getElementById("output-content"),
    tempTxt: document.getElementById("temp-txt"),
    cityNameTxt: document.getElementById("city-name-txt"),
    weatherDescTxt: document.getElementById("weather-desc-txt"),
    feelTempTxt: document.getElementById("feel-temp-txt"),
    humidityTxt: document.getElementById("humidity-txt"),
    windSpeedTxt: document.getElementById("wind-speed-txt"),
    fetchTimeTxt: document.getElementById("fetch-time-txt"),
    failMsg: document.getElementById("fail-msg")
};


async function getWeatherData(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    if(!response.ok) {
        throw new Error("Data fetching went worng!");
    }
    const weatherData = await response.json();
    const dt = new Date();

    const filteredWeatherData = {
        fetchTime: `${dt.getDate()}/${dt.getMonth()}/${dt.getFullYear()} ${dt.getHours()}:${dt.getMinutes()}`,
        cityName: weatherData.name,
        weatherDesc: weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1),
        currTemp: Math.round(weatherData.main.temp),
        feelTemp: Math.round(weatherData.main.feels_like) + " °C",
        humidity: weatherData.main.humidity + "%",
        windSpeed: weatherData.wind.speed + " Km/h"
    };

    return filteredWeatherData;
}

function displayWeatherData(weatherData) {
    DOM.tempTxt.textContent = weatherData.currTemp;
    DOM.cityNameTxt.textContent = weatherData.cityName;
    DOM.weatherDescTxt.textContent = weatherData.weatherDesc;
    DOM.feelTempTxt.textContent = weatherData.feelTemp;
    DOM.humidityTxt.textContent = weatherData.humidity;
    DOM.windSpeedTxt.textContent = weatherData.windSpeed;
    DOM.fetchTimeTxt.textContent = weatherData.fetchTime;

    DOM.failMsg.classList.replace("flex", "hidden");
    DOM.outputContent.classList.replace("hidden", "flex");
}

async function showOutput() {
    const cityQuery = DOM.inputBox.value.trim();
    DOM.inputBox.value = "";

    if (!cityQuery) {
        DOM.outputContent.classList.replace("flex", "hidden");
        DOM.failMsg.classList.replace("flex", "hidden");

        return;
    }

    try {
        const output = await getWeatherData(cityQuery);

        displayWeatherData(output);
    } catch (err) {
        DOM.outputContent.classList.replace("flex", "hidden");
        DOM.failMsg.classList.replace("hidden", "flex");

        console.error(err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    DOM.queryBtn.addEventListener("click", showOutput);

    DOM.queryBtn.addEventListener("keypress", (event) => {
        if (event.key === "Enter") { showOutput(); };
    });
});
