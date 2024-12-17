// API Key for OpenWeatherMap
const apiKey = 'your_api_key_here';

// Fetch weather data based on user-input location
document.getElementById('fetch-weather-btn').addEventListener('click', getWeatherByCity);

// Fetch weather data based on user's geolocation
document.getElementById('get-location-btn').addEventListener('click', getWeatherByLocation);

// Function to get weather by city name
function getWeatherByCity() {
    const city = document.getElementById('city-input').value;
    
    if (city.trim() === '') {
        alert('Please enter a city');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found!');
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// Function to get weather based on user's current location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data);
                })
                .catch(error => console.error('Error fetching weather data:', error));
        }, () => {
            alert('Geolocation failed. Please enter a city manually.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Function to display weather data on the page
function displayWeather(data) {
    document.getElementById('location').textContent = `Location: ${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windspeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}
