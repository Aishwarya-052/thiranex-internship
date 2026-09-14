const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY_HERE'; 
const BASE_URL = 'https://openweathermap.org';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherDisplay = document.getElementById('weather-display');
const errorDisplay = document.getElementById('error-display');

const cityNameEl = document.getElementById('city-name');
const tempEl = document.getElementById('temp');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');

if (searchBtn && cityInput) {
    searchBtn.addEventListener('click', () => handleSearch());
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
}

function handleSearch() {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
}

async function getWeatherData(city) {
    errorDisplay.style.display = 'none';
    weatherDisplay.classList.remove('active');

    try {
        const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Check spelling!');
            } else {
                throw new Error('Network issue encountered.');
            }
        }

        const data = await response.json();
        renderWeather(data);

    } catch (error) {
        errorDisplay.textContent = error.message;
        errorDisplay.style.display = 'block';
    }
}

function renderWeather(data) {
    cityNameEl.textContent = data.name;
    tempEl.textContent = Math.round(data.main.temp);
    humidityEl.textContent = data.main.humidity;
    windEl.textContent = data.wind.speed;

    weatherDisplay.classList.add('active');
}
