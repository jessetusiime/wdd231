import { setupHamburgerMenu, updateFooter } from './common.mjs';

let allCars = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentFilter = 'all';
let showingFavorites = false;

async function loadVehicles() {
    const modelsGrid = document.getElementById('modelsGrid');

    try {
        const response = await fetch('data/cars.json');

        if (!response.ok) {
            throw new Error('Failed to load vehicle data');
        }

        allCars = await response.json();
        displayVehicles(allCars);
        updateFavoriteCount();

    } catch (error) {
        console.error('Error loading vehicles:', error);
        if (modelsGrid) {
            modelsGrid.innerHTML = '<p class="error">Unable to load vehicles. Please try again later.</p>';
        }
    }
}

function displayVehicles(cars) {
    const modelsGrid = document.getElementById('modelsGrid');
    if (!modelsGrid) return;

    modelsGrid.innerHTML = '';

    if (cars.length === 0) {
        modelsGrid.innerHTML = '<p class="no-results">No vehicles found matching your criteria.</p>';
        return;
    }

    cars.forEach(car => {
        const card = createModelCard(car);
        modelsGrid.appendChild(card);
    });
}

function createModelCard(car) {
    const card = document.createElement('div');
    card.className = 'model-card';
    card.dataset.bodyType = car.bodyType;
    card.dataset.engine = car.engine;

    const isFavorite = favorites.includes(car.id);

    card.innerHTML = `
        <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${car.id}" aria-label="Add to favorites">
            ${isFavorite ? '❤️' : '🤍'}
        </button>
        <img src="${car.image}" alt="${car.brand} ${car.model}" loading="lazy">
        <div class="model-info">
            <h3>${car.brand} ${car.model}</h3>
            <div class="model-specs">
                <div class="spec-item">
                    <span class="spec-label">Year:</span> ${car.year}
                </div>
                <div class="spec-item">
                    <span class="spec-label">HP:</span> ${car.horsepower}
                </div>
                <div class="spec-item">
                    <span class="spec-label">Engine:</span> ${car.engine}
                </div>
                <div class="spec-item">
                    <span class="spec-label">Type:</span> ${car.bodyType}
                </div>
            </div>
            <button class="view-details-btn" data-id="${car.id}">View Details</button>
        </div>
    `;

    const favoriteBtn = card.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', () => toggleFavorite(car.id));

    const detailsBtn = card.querySelector('.view-details-btn');
    detailsBtn.addEventListener('click', () => openModal(car.id));

    return card;
}

function toggleFavorite(carId) {
    const index = favorites.indexOf(carId);

    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(carId);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteCount();

    const btn = document.querySelector(`.favorite-btn[data-id="${carId}"]`);
    if (btn) {
        const isFavorite = favorites.includes(carId);
        btn.classList.toggle('active', isFavorite);
        btn.textContent = isFavorite ? '❤️' : '🤍';
    }

    if (showingFavorites) {
        filterVehicles('favorites');
    }
}

function updateFavoriteCount() {
    const countElement = document.getElementById('favoriteCount');
    if (countElement) {
        countElement.textContent = favorites.length;
    }
}

function filterVehicles(filter) {
    currentFilter = filter;
    let filteredCars = [];

    if (filter === 'all') {
        filteredCars = allCars;
    } else if (filter === 'favorites') {
        filteredCars = allCars.filter(car => favorites.includes(car.id));
    } else if (filter === 'Electric') {
        filteredCars = allCars.filter(car => car.engine.toLowerCase().includes('electric'));
    } else {
        filteredCars = allCars.filter(car => car.bodyType === filter);
    }

    displayVehicles(filteredCars);
}

function openModal(carId) {
    const car = allCars.find(c => c.id === carId);
    if (!car) return;

    const modal = document.getElementById('carModal');
    const modalBody = document.getElementById('modalBody');

    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <img src="${car.image}" alt="${car.brand} ${car.model}" class="modal-image">
        <h2 class="modal-title">${car.brand} ${car.model}</h2>
        
        <div class="modal-specs">
            <div class="modal-spec-item">
                <span class="modal-spec-label">Year</span>
                <span class="modal-spec-value">${car.year}</span>
            </div>
            <div class="modal-spec-item">
                <span class="modal-spec-label">Engine</span>
                <span class="modal-spec-value">${car.engine}</span>
            </div>
            <div class="modal-spec-item">
                <span class="modal-spec-label">Horsepower</span>
                <span class="modal-spec-value">${car.horsepower} HP</span>
            </div>
            <div class="modal-spec-item">
                <span class="modal-spec-label">Body Type</span>
                <span class="modal-spec-value">${car.bodyType}</span>
            </div>
        </div>
        
        <p class="modal-description">${car.description}</p>
        
        <div class="modal-features">
            <h3>Key Features</h3>
            <div class="features-list">
                ${car.features.map(feature => `<div class="feature-item">${feature}</div>`).join('')}
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const closeBtn = document.getElementById('modalClose');
    if (closeBtn) {
        closeBtn.focus();
    }
}

function closeModal() {
    const modal = document.getElementById('carModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function setupModalListeners() {
    const modalClose = document.getElementById('modalClose');
    const modal = document.getElementById('carModal');

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'carModal') {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function setupFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showingFavorites = false;
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            filterVehicles(filter);
        });
    });

    const showFavoritesBtn = document.getElementById('showFavorites');
    if (showFavoritesBtn) {
        showFavoritesBtn.addEventListener('click', () => {
            showingFavorites = !showingFavorites;

            if (showingFavorites) {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                filterVehicles('favorites');
            } else {
                const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
                if (allFilterBtn) {
                    allFilterBtn.classList.add('active');
                }
                filterVehicles('all');
            }
        });
    }
}

function initializeModelsPage() {
    
    setupModalListeners();
    setupFilterButtons();
    loadVehicles();
}

if (window.location.pathname.includes('models.html')) {
    document.addEventListener('DOMContentLoaded', initializeModelsPage);
}