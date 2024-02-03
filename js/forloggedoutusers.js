const userIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const elementsNoShow = document.querySelectorAll(".noshow");
const logoutButton = document.querySelector("#logOutButton");
const userCredits = document.querySelector("#usercredits");
const createNewListing = document.querySelector("#createnewlistingbutton");

elementsNoShow.forEach((element) => {
  if (userIsLoggedIn) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
});

if (userIsLoggedIn) {
  logoutButton.textContent = "Log Out";
} else {
  logoutButton.textContent = "To Login";
}

if (userIsLoggedIn) {
  userCredits.classList.remove("hidden");
} else {
  userCredits.classList.add("hidden");
}

if (userIsLoggedIn) {
  createNewListing.classList.remove("hidden");
} else {
  createNewListing.classList.add("hidden");
}
