// Thiranex Project: Live OpenWeather Integration Engine
const API_KEY = '853823cd0841b5702dd395c52c2ad31d'; 
const BASE_URL = 'https://openweathermap.org';

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');

    if (searchBtn && cityInput) {
        searchBtn.addEventListener('click', handleFetchAction);
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleFetchAction();
        });
    }
});

async function handleFetchAction() {
    const cityInput = document.getElementById('city-input');
    const weatherCard = document.getElementById('weather-result');
    const errorCard = document.getElementById('error-message');
    const city = cityInput.value.trim();

    // Reset components to hidden states
    weatherCard.classList.add('hidden');
    errorCard.classList.add('hidden');

    if (!city) {
        showDisplayError('Please input a city target location.');
        return;
    }

    try {
        // Asynchronous retrieval using the Fetch API framework
        const endpoint = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const response = await fetch(endpoint);

        // Strict API error validation protocols
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City location not identified.');
            } else {
                throw new Error(`Data exchange error (Status: ${response.status})`);
            }
        }

        // Parsing nested properties within JSON response structure
        const weatherData = await response.json();
        updateWeatherUI(weatherData);

    } catch (error) {
        showDisplayError(error.message || 'Network interface connectivity dropped.');
    }
}

function updateWeatherUI(data) {
    const weatherCard = document.getElementById('weather-result');
    
    // Accessing complex nested properties inside the object payload
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temp').textContent = Math.round(data.main.temp);
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind-speed').textContent = data.wind.speed;

    weatherCard.classList.remove('hidden');
}

function showDisplayError(text) {
    const errorCard = document.getElementById('error-message');
    errorCard.textContent = text;
    errorCard.classList.remove('hidden');
}
