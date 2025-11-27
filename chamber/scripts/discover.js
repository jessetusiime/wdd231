// Import attractions data
import attractions from './discover.mjs';

// Visit Message Logic using LocalStorage
function displayVisitMessage() {
    const messageElement = document.getElementById('messageText');
    const messageContainer = document.getElementById('visitMessage');
    const closeButton = document.getElementById('closeMessage');

    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    let message = '';

    if (!lastVisit) {
        // First visit
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const daysSinceLastVisit = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));

        if (daysSinceLastVisit < 1) {
            // Less than a day
            message = 'Back so soon! Awesome!';
        } else {
            // More than a day
            const dayText = daysSinceLastVisit === 1 ? 'day' : 'days';
            message = `You last visited ${daysSinceLastVisit} ${dayText} ago.`;
        }
    }

    // Display the message
    messageElement.textContent = message;
    messageContainer.classList.remove('hidden');

    // Store current visit time
    localStorage.setItem('lastVisit', now.toString());

    // Close button functionality
    closeButton.addEventListener('click', () => {
        messageContainer.classList.add('hidden');
    });
}

// Render Attraction Cards
function renderAttractions() {
    const grid = document.getElementById('attractionsGrid');

    attractions.forEach((attraction, index) => {
        // Create article element for each card
        const article = document.createElement('article');
        article.className = 'attraction-card';
        article.setAttribute('role', 'listitem');

        // Build the card HTML
        article.innerHTML = `
            <h2>${attraction.name}</h2>
            <figure>
                <img 
                    src="${attraction.image}" 
                    alt="${attraction.name} - ${attraction.address}"
                    loading="lazy"
                    width="300"
                    height="200"
                >
            </figure>
            <address>${attraction.address}</address>
            <p>${attraction.description}</p>
            <button aria-label="Learn more about ${attraction.name}">Learn more</button>
        `;

        grid.appendChild(article);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayVisitMessage();
    renderAttractions();
});