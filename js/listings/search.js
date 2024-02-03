import { activeResults } from "./card.js";
import { listings } from "./card.js";
import { addClickListeners } from "./card.js";
import { renderPost } from "./card.js";

export const searchPostsByTitle = () => {
  const searchInput = document.querySelector("#searchInput");
  const searchTerm = searchInput.value.toLowerCase();

  const filteredResults = activeResults.filter(
    (result) => result.title && result.title.toLowerCase().includes(searchTerm),
  );

  listings.innerHTML = "";
  filteredResults.forEach((result) => {
    renderPost(result);
  });

  addClickListeners();
};

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchPostsByTitle();
    });
  }
});
