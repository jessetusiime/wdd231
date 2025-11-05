// Get DOM elements
const directory = document.getElementById('directory');
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');
const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');
const darkModeToggle = document.getElementById('darkModeToggle');

// Fetch and display members
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error('Error fetching members:', error);
        directory.innerHTML = '<p>Error loading member directory. Please try again later.</p>';
    }
}

// Display members based on current view
function displayMembers(members) {
    directory.innerHTML = '';

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');

        // Get membership level badge
        const levelBadge = getMembershipBadge(member.membershipLevel);

        memberCard.innerHTML = `
      <div class="member-image">
        <img src="${member.image}" alt="${member.name}" loading="lazy">
        ${levelBadge}
      </div>
      <div class="member-info">
        <h3>${member.name}</h3>
        <p class="category">${member.category}</p>
        <p class="description">${member.description}</p>
        <p class="address">${member.address}</p>
        <p class="phone"> ${member.phone}</p>
        <p class="website"><a href="${member.website}" target="_blank">Visit Website</a></p>
      </div>
    `;

        directory.appendChild(memberCard);
    });
}

// Get membership level badge
function getMembershipBadge(level) {
    const badges = {
        1: '<span class="badge member">Member</span>',
        2: '<span class="badge silver">Silver</span>',
        3: '<span class="badge gold">Gold</span>'
    };
    return badges[level] || '';
}

// Toggle between grid and list view
gridViewBtn.addEventListener('click', () => {
    directory.classList.remove('list-view');
    directory.classList.add('grid-view');
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
});

listViewBtn.addEventListener('click', () => {
    directory.classList.remove('grid-view');
    directory.classList.add('list-view');
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
});

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

// Footer information
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Initialize
getMembers();