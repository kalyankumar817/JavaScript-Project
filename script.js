document.getElementById('searchbtn').addEventListener('click', async function() {
    let query = document.getElementById('inputvalue').value;
    console.log(query);
    const req = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const res = await req.json();
    console.log(res);

    // Clear previous results
    document.getElementById('results').innerHTML = '';

    // Loop through the results and create cards
    res.forEach(show => {
        const showData = show.show; // Access the show object
        const card = document.createElement('div');
        card.className = 'card m-2';
        card.style.width = '18rem'; // Set a fixed width for the card

        // Add content to the card
        card.innerHTML = `
            <img src="${showData.image ? showData.image.medium : 'https://via.placeholder.com/150'}" class="card-img-top" alt="${showData.name}">
            <div class="card-body">
                <h5 class="card-title">${showData.name}</h5>
                <p class="card-text">${showData.summary ? showData.summary.replace(/<[^>]+>/g, '') : 'No description available.'}</p>
                <p class="card-text"><small class="text-muted">Rating: ${showData.rating ? showData.rating.average : 'N/A'}</small></p>
                <p class="card-text"><small class="text-muted">Genres: ${showData.genres.length > 0 ? showData.genres.join(', ') : 'N/A'}</small></p>
                <button class="favorite-btn" title="Add to Favorites">⭐</button>
            </div>
        `;
        // Add favorite functionality
        card.querySelector('.favorite-btn').addEventListener('click', () => {
            addToFavorites(showData);
        });

        // Append the card to the results container
        document.getElementById('results').appendChild(card);
        
    });
});

// Function to add the movie to localStorage
function addToFavorites(show) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the movie is already in the favorites
    if (!favorites.some(fav => fav.id === show.id)) {
        favorites.push(show);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${show.name} has been added to your favorites!`);
    } else {
        alert(`${show.name} is already in your favorites!`);
    }
}
