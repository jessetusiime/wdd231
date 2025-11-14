const API_KEY = 'dfa384980bdf46d323a554ce93a400dc';
const KAMPALA_LAT = 0.34;
const KAMPALA_LON = 32.58;

export async function getWeather() {
    try {
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${KAMPALA_LAT}&lon=${KAMPALA_LON}&units=imperial&appid=${API_KEY}`
        );
        const currentData = await currentResponse.json();
        displayCurrentWeather(currentData);

        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${KAMPALA_LAT}&lon=${KAMPALA_LON}&units=imperial&appid=${API_KEY}`
        );
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);

    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('currentTemp').textContent = 'Weather unavailable';
        document.getElementById('weatherDesc').textContent = 'Unable to load weather data';
        document.getElementById('forecastCards').innerHTML = '<p style="text-align:center;padding:1rem;">Forecast unavailable</p>';
    }
}

function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const high = Math.round(data.main.temp_max);
    const low = Math.round(data.main.temp_min);
    const humidity = data.main.humidity;

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    document.getElementById('currentTemp').textContent = `${temp}°F`;
    document.getElementById('weatherDesc').textContent = description;
    document.getElementById('weatherIcon').textContent = getWeatherEmoji(icon);
    document.getElementById('weatherHigh').textContent = `High: ${high}°`;
    document.getElementById('weatherLow').textContent = `Low: ${low}°`;
    document.getElementById('weatherHumidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('weatherSunrise').textContent = `Sunrise: ${sunrise}`;
    document.getElementById('weatherSunset').textContent = `Sunset: ${sunset}`;
}

function displayForecast(data) {
    const container = document.getElementById('forecastCards');
    container.innerHTML = '';

    const daily = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    const labels = ['Today'];
    const today = new Date();

    for (let i = 1; i < 3; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        labels.push(d.toLocaleDateString('en-US', { weekday: 'long' }));
    }

    daily.forEach((day, index) => {
        const t = Math.round(day.main.temp);

        const card = document.createElement('div');
        card.classList.add('forecast-card');
        card.innerHTML = `
            <div class="day-name">${labels[index]}:</div>
            <div class="temp">${t}°F</div>
        `;
        container.appendChild(card);
    });
}

function getWeatherEmoji(code) {
    const icons = {
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
    return icons[code] || '🌤️';
}
