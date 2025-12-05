function setupCharacterCounter() {
    const messageField = document.getElementById('message');
    const charCount = document.querySelector('.char-count');

    if (messageField && charCount) {
        messageField.addEventListener('input', () => {
            const length = messageField.value.length;
            charCount.textContent = `${length} / 1000 characters`;

            if (length > 900) {
                charCount.style.color = '#e74c3c';
            } else {
                charCount.style.color = '#999';
            }
        });
    }
}

function setupFormValidation() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            if (!fullName || !email || !subject || !message) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return false;
            }

            const fullNameValue = fullName.value.trim();
            const emailValue = email.value.trim();
            const subjectValue = subject.value;
            const messageValue = message.value.trim();

            if (!fullNameValue || !emailValue || !subjectValue || !messageValue) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailValue)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return false;
            }

            console.log('Form submitted successfully');
        });
    }
}

function initializeContactPage() {
    setupCharacterCounter();
    setupFormValidation();
}

if (window.location.pathname.includes('contact.html')) {
    document.addEventListener('DOMContentLoaded', initializeContactPage);
}