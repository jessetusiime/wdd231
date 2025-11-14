export async function displaySpotlights() {
    const spotlightCards = document.getElementById('spotlightCards');

    try {
        const response = await fetch('data/members.json');
        const data = await response.json();

        const qualified = data.members.filter(m =>
            m.membershipLevel === 2 || m.membershipLevel === 3
        );

        const count = Math.random() < 0.5 ? 2 : 3;
        const selected = getRandomMembers(qualified, count);

        spotlightCards.innerHTML = '';
        selected.forEach(member => {
            spotlightCards.appendChild(createSpotlightCard(member));
        });

    } catch (err) {
        console.error('Error fetching members:', err);
        spotlightCards.innerHTML = '<p style="text-align:center;padding:2rem;">Unable to load member spotlights</p>';
    }
}

function getRandomMembers(arr, count) {
    return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
}

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
