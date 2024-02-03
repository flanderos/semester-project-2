const userIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const elementsNoShow = document.querySelectorAll(".noshow");
const logoutButton = document.querySelector("#logOutButton");

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
