export const logoutButton = document.querySelector("#logOutButton");

export const logOut = () => {
  localStorage.clear();
  window.location.href = "login.html";
};

if (logoutButton) {
  logoutButton.addEventListener("click", logOut);
}
