export function initMenu() {
    const menuButton = document.getElementById('menuButton');
    const navMenu = document.getElementById('navMenu');

    if (!menuButton || !navMenu) return;

    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        const isOpen = navMenu.classList.contains('show');
        menuButton.textContent = isOpen ? '✕' : '☰';
    });
}

export function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
    });

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

export function setFooterDates() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;
}
