// DOM Elements
const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');
const darkModeToggle = document.getElementById('darkModeToggle');
const spotlightCards = document.getElementById('spotlightCards');

// OpenWeatherMap API Configuration
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
const KAMPALA_LAT = 0.3476;
const KAMPALA_LON = 32.5825;

// Mobile menu toggle
menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    const isOpen = navMenu.classList.contains('show');
    menuButton.textContent = isOpen ? '✕' : '☰';
});

// Dark mode toggle
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Set current year and last modified date
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Fetch Weather Data
async function getWeather() {
    try {
        // Current weather - using imperial units for Fahrenheit
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${KAMPALA_LAT}&lon=${KAMPALA_LON}&units=imperial&appid=${API_KEY}`
        );
        const currentData = await currentResponse.json();
        displayCurrentWeather(currentData);

        // 5-day forecast (we'll extract 3 days) - using imperial units
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${KAMPALA_LAT}&lon=${KAMPALA_LON}&units=imperial&appid=${API_KEY}`
        );
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('currentTemp').textContent = 'Weather unavailable';
        document.getElementById('weatherDesc').textContent = 'Unable to load weather data';
        document.getElementById('forecastCards').innerHTML = '<p style="text-align: center; padding: 1rem;">Forecast unavailable</p>';
    }
}

// Display current weather
function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const high = Math.round(data.main.temp_max);
    const low = Math.round(data.main.temp_min);
    const humidity = data.main.humidity;

    // Convert Unix timestamps to readable time
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    document.getElementById('currentTemp').textContent = `${temp}°F`;
    document.getElementById('weatherDesc').textContent = description;
    document.getElementById('weatherIcon').textContent = getWeatherEmoji(icon);
    document.getElementById('weatherHigh').textContent = `High: ${high}°`;
    document.getElementById('weatherLow').textContent = `Low: ${low}°`;
    document.getElementById('weatherHumidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('weatherSunrise').textContent = `Sunrise: ${sunrise}`;
    document.getElementById('weatherSunset').textContent = `Sunset: ${sunset}`;
}

// Display 3-day forecast
function displayForecast(data) {
    const forecastCards = document.getElementById('forecastCards');
    forecastCards.innerHTML = '';

    // Get forecasts for next 3 days at noon (12:00:00)
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    // Create array with "Today", "Wednesday", "Thursday" etc.
    const today = new Date();
    const dayLabels = ['Today'];

    for (let i = 1; i < 3; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        dayLabels.push(futureDate.toLocaleDateString('en-US', { weekday: 'long' }));
    }

    dailyForecasts.forEach((day, index) => {
        const temp = Math.round(day.main.temp);
        const dayLabel = dayLabels[index];

        const card = document.createElement('div');
        card.classList.add('forecast-card');
        card.innerHTML = `
            <div class="day-name">${dayLabel}:</div>
            <div class="temp">${temp}°F</div>
        `;
        forecastCards.appendChild(card);
    });
}

// Get weather emoji based on icon code
function getWeatherEmoji(iconCode) {
    const iconMap = {
        '01d': '☀️', '01n': '🌙',
        '02d': '⛅', '02n': '☁️',
        '03d': '☁️', '03n': '☁️',
        '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️',
        '10d': '🌦️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️',
        '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌤️';
}

// Fetch members and display random spotlights
async function displaySpotlights() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();

        // Filter for Gold (3) and Silver (2) members only
        const qualifiedMembers = data.members.filter(member =>
            member.membershipLevel === 2 || member.membershipLevel === 3
        );

        // Randomly select 2-3 members
        const numberOfSpotlights = Math.random() < 0.5 ? 2 : 3;
        const selectedMembers = getRandomMembers(qualifiedMembers, numberOfSpotlights);

        // Display spotlight cards
        spotlightCards.innerHTML = '';
        selectedMembers.forEach(member => {
            const card = createSpotlightCard(member);
            spotlightCards.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching members:', error);
        spotlightCards.innerHTML = '<p style="text-align: center; padding: 2rem;">Unable to load member spotlights</p>';
    }
}

// Get random members from array
function getRandomMembers(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Create spotlight card
function createSpotlightCard(member) {
    const card = document.createElement('div');
    const levelClass = member.membershipLevel === 3 ? 'gold' : 'silver';
    const levelText = member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member';

    card.classList.add('spotlight-card', levelClass);
    card.innerHTML = `
        <div class="spotlight-header">
            <div class="spotlight-logo">
                <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            </div>
            <h3>${member.name}</h3>
            <span class="membership-badge">${levelText}</span>
        </div>
        <div class="spotlight-body">
            <p><strong>Category:</strong> ${member.category}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p class="website"><strong>Website:</strong> <a href="${member.website}" target="_blank">Visit Site</a></p>
        </div>
    `;
    return card;
}

// Initialize page
getWeather();
displaySpotlights();