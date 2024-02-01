import { activeResults } from "./card.js";
import { listings } from "./card.js";
import { addClickListeners } from "./card.js";
import { renderPost } from "./card.js";

const searchButton = document.querySelector("#searchButton");

export const searchPostsByTitle = () => {
    const searchInput = document.querySelector("#searchInput");
    const searchTerm = searchInput.value.toLowerCase();

    const filteredResults = activeResults.filter(result =>
        result.title && result.title.toLowerCase().includes(searchTerm)
    );

    console.log(searchTerm);

    listings.innerHTML = ''; 
    filteredResults.forEach(result => {
        renderPost(result);
    });

    addClickListeners(); 
};

searchInput.addEventListener("input", () => {
    console.log("Input event triggered");
    searchPostsByTitle();
});





