export function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

export function updateFooter() {
    const currentYear = new Date().getFullYear();
    const currentYearElement = document.getElementById('currentyear');
    const lastModifiedElement = document.getElementById('lastModified');

    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }

    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupHamburgerMenu();
    updateFooter();
});