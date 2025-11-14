// select HTML elements
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// API URL
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=dfa384980bdf46d323a554ce93a400dc';

// function to display results in HTML
function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp.toFixed(1) }&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}

// async function to fetch API
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // test output
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log('Error:', error);
    }
}

// call the fetch function
apiFetch();
