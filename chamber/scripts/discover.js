import attractions from './discover.mjs';

// LocalStorage
function displayVisitMessage() {
    const messageElement = document.getElementById('messageText');
    const messageContainer = document.getElementById('visitMessage');
    const closeButton = document.getElementById('closeMessage');

    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    let message = '';

    if (!lastVisit) {
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const daysSinceLastVisit = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));

        if (daysSinceLastVisit < 1) {
            message = 'Back so soon! Awesome!';
        } else {
            const dayText = daysSinceLastVisit === 1 ? 'day' : 'days';
            message = `You last visited ${daysSinceLastVisit} ${dayText} ago.`;
        }
    }

    messageElement.textContent = message;
    messageContainer.classList.remove('hidden');

    localStorage.setItem('lastVisit', now.toString());

    closeButton.addEventListener('click', () => {
        messageContainer.classList.add('hidden');
    });
}

// Modals
function openModal(attraction) {
    const modal = document.getElementById('attractionModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalAddress = document.getElementById('modalAddress');
    const modalDescription = document.getElementById('modalDescription');

    modalTitle.textContent = attraction.name;
    modalImage.src = attraction.image;
    modalImage.alt = `${attraction.name} - ${attraction.address}`;
    modalAddress.textContent = attraction.address;

    let detailedInfo = `<p>${attraction.description}</p>`;

    if (attraction.hours) {
        detailedInfo += `<p><strong>Hours:</strong> ${attraction.hours}</p>`;
    }

    if (attraction.admission) {
        detailedInfo += `<p><strong>Admission:</strong> ${attraction.admission}</p>`;
    }

    if (attraction.highlights && attraction.highlights.length > 0) {
        detailedInfo += `<p><strong>Highlights:</strong></p><ul>`;
        attraction.highlights.forEach(highlight => {
            detailedInfo += `<li>${highlight}</li>`;
        });
        detailedInfo += `</ul>`;
    }

    if (attraction.phone) {
        detailedInfo += `<p><strong>Phone:</strong> <a href="tel:${attraction.phone}">${attraction.phone}</a></p>`;
    }

    if (attraction.website) {
        detailedInfo += `<p><strong>Website:</strong> <a href="https://${attraction.website}" target="_blank" rel="noopener">${attraction.website}</a></p>`;
    }

    modalDescription.innerHTML = detailedInfo;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    document.getElementById('modalClose').focus();
}

function closeModal() {
    const modal = document.getElementById('attractionModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function renderAttractions() {
    const grid = document.getElementById('attractionsGrid');

    attractions.forEach((attraction, index) => {
        const article = document.createElement('article');
        article.className = 'attraction-card';
        article.setAttribute('role', 'listitem');

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
        const button = article.querySelector('button');
        button.addEventListener('click', () => {
            openModal(attraction);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayVisitMessage();
    renderAttractions();

    const closeButton = document.getElementById('modalClose');
    closeButton.addEventListener('click', closeModal);

    const modal = document.getElementById('attractionModal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});