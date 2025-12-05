import { setupHamburgerMenu, updateFooter } from './common.mjs';

async function loadFeaturedVehicles() {
    const featuredGrid = document.getElementById('featuredGrid');

    if (!featuredGrid) return;

    try {
        const response = await fetch('data/cars.json');

        if (!response.ok) {
            throw new Error('Failed to load vehicle data');
        }

        const cars = await response.json();

        const featuredCars = cars.slice(0, 4);

        featuredGrid.innerHTML = '';

        featuredCars.forEach(car => {
            const card = createCarCard(car);
            featuredGrid.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading featured vehicles:', error);
        featuredGrid.innerHTML = '<p class="error">Unable to load featured vehicles. Please try again later.</p>';
    }
}

function createCarCard(car) {
    const card = document.createElement('div');
    card.className = 'car-card';

    card.innerHTML = `
        <img src="${car.image}" alt="${car.brand} ${car.model}" loading="lazy">
        <div class="car-info">
            <h3>${car.brand} ${car.model}</h3>
            <div class="car-specs">
                <span> ${car.year}</span>
                <span> ${car.horsepower} HP</span>
                <span> ${car.engine}</span>
            </div>
            <a href="models.html" class="view-details">View All Models</a>
        </div>
    `;

    return card;
}

function initializeHomePage() {
    loadFeaturedVehicles();
}

if (window.location.pathname.includes('index.html') ||
    window.location.pathname.endsWith('/')) {
    document.addEventListener('DOMContentLoaded', initializeHomePage);
}

export { createCarCard };