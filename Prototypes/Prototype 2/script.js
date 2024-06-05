const form = document.getElementById('food-form');
const listingsDiv = document.getElementById('food-listings');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const quantity = document.getElementById('quantity').value;
    const location = document.getElementById('location').value;

    // Send a POST request to the backend to add the food listing
    fetch('/add-food-listing', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, quantity, location })
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        // Display the new food listing
        const listingHTML = `
            <div class="food-listing">
                <h2>${name}</h2>
                <p>${description}</p>
                <p>Quantity: ${quantity}</p>
                <p>Location: ${location}</p>
            </div>
        `;
        listingsDiv.innerHTML += listingHTML;
    })
    .catch((error) => {
        console.error(error);
    });
});