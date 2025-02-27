import { activeResults, listings, renderPost, addClickListeners } from "./card.js";

const searchInput = document.querySelector("#searchInput");

// ✅ Debounce-funksjon for å optimalisere søk
function debounce(func, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}

// ✅ Hovedfunksjon for å søke i titler
export const searchPostsByTitle = () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) {
        // Hvis søkefeltet er tomt, vis alle resultater igjen
        renderAllPosts();
        return;
    }

    const filteredResults = activeResults.filter(result =>
        result.title?.toLowerCase().includes(searchTerm)
    );

    listings.innerHTML = ''; // Tøm eksisterende kort

    // ✅ Bruk requestAnimationFrame for smidig rendering
    requestAnimationFrame(() => {
        filteredResults.forEach(renderPost);
        addClickListeners();
    });
};

// ✅ Funksjon for å vise alle poster (brukes når søket er tomt)
const renderAllPosts = () => {
    listings.innerHTML = '';
    requestAnimationFrame(() => {
        activeResults.forEach(renderPost);
        addClickListeners();
    });
};

// ✅ Bruk debounce for å forhindre spam-kjøring av søk
const debouncedSearch = debounce(searchPostsByTitle, 300);

// ✅ Event listener for søkefeltet (bruker debounce)
searchInput.addEventListener("input", debouncedSearch);
