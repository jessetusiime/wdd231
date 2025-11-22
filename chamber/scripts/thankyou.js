document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const dataContainer = document.getElementById('submittedData');

    const membershipLevels = {
        'np': 'NP Membership (Non-Profit - Free)',
        'bronze': 'Bronze Membership',
        'silver': 'Silver Membership',
        'gold': 'Gold Membership'
    };

    const data = [
        { label: 'First Name', value: urlParams.get('firstName') },
        { label: 'Last Name', value: urlParams.get('lastName') },
        { label: 'Email Address', value: urlParams.get('email') },
        { label: 'Mobile Phone', value: urlParams.get('mobile') },
        { label: 'Business/Organization', value: urlParams.get('businessName') },
        { label: 'Membership Level', value: membershipLevels[urlParams.get('membershipLevel')] || urlParams.get('membershipLevel') },
        { label: 'Application Submitted', value: urlParams.get('timestamp') }
    ];

    data.forEach(item => {
        if (item.value) {
            const row = document.createElement('div');
            row.className = 'data-row';
            row.innerHTML = `
                <div class="data-label">${item.label}:</div>
                <div class="data-value">${item.value}</div>
            `;
            dataContainer.appendChild(row);
        }
    });

    if (urlParams.get('orgTitle')) {
        const row = document.createElement('div');
        row.className = 'data-row';
        row.innerHTML = `
            <div class="data-label">Organizational Title:</div>
            <div class="data-value">${urlParams.get('orgTitle')}</div>
        `;
        dataContainer.insertBefore(row, dataContainer.children[2]);
    }

    if (urlParams.get('businessDescription')) {
        const row = document.createElement('div');
        row.className = 'data-row';
        row.innerHTML = `
            <div class="data-label">Business Description:</div>
            <div class="data-value">${urlParams.get('businessDescription')}</div>
        `;
        dataContainer.appendChild(row);
    }
});
