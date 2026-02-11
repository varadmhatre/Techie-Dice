// --- UPLOAD YOUR DEVICES HERE ---
const devices = [
    {
        name: "iPhone 15 Pro",
        description: "Aviation-grade titanium design with the A17 Pro chip for next-level performance.",
        image: "https://m.media-amazon.com/images/I/81SigFo7_L_._AC_UF1000,1000_QL80_.jpg",
        link: "https://amzn.to/EXAMPLE1"
    },
    {
        name: "Samsung Galaxy S24 Ultra",
        description: "The ultimate Android experience with Galaxy AI and a 200MP camera system.",
        image: "https://m.media-amazon.com/images/I/71WjsZ8n1lL._AC_SL1500_.jpg",
        link: "https://amzn.to/EXAMPLE2"
    },
    {
        name: "Google Pixel 8 Pro",
        description: "The most advanced Pixel yet, with a refined design and incredible photo editing.",
        image: "https://m.media-amazon.com/images/I/71v2jko97TL._AC_SL1500_.jpg",
        link: "https://amzn.to/EXAMPLE3"
    }
];

// Function to render phones to the UI
function loadPhones() {
    const grid = document.getElementById('phone-grid');
    
    devices.forEach(phone => {
        const card = document.createElement('div');
        card.className = 'phone-card';
        
        card.innerHTML = `
            <img src="${phone.image}" alt="${phone.name}">
            <h3>${phone.name}</h3>
            <p>${phone.description}</p>
            <a href="${phone.link}" target="_blank" class="buy-button">Buy on Amazon</a>
        `;
        
        grid.appendChild(card);
    });
}

// Run on page load
window.onload = loadPhones;