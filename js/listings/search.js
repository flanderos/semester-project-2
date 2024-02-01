import { activeResults } from "./card.js";
import { listings } from "./card.js";
import { addClickListeners } from "./card.js";
import { renderPost } from "./card.js";

// Check if you have a valid searchButton element
const searchButton = document.querySelector("#searchButton");

export const searchPostsByTitle = () => {
    const searchInput = document.querySelector("#searchInput");
    const searchTerm = searchInput.value.toLowerCase();

    const filteredResults = activeResults.filter(result =>
        result.title && result.title.toLowerCase().includes(searchTerm)
    );

    console.log(searchTerm);

    listings.innerHTML = ''; // Clear existing content
    filteredResults.forEach(result => {
        renderPost(result);
        console.log(result);
    });

    addClickListeners(); // Add click listeners to the new posts
};

if (searchButton) {
    searchButton.addEventListener("click", searchPostsByTitle);
}



