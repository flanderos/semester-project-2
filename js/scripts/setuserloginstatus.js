export const userIsLoggedIn = () => {
  localStorage.setItem("userIsLoggedIn", true);
};

export const userIsLoggedOut = () => {
  localStorage.setItem("userIsLoggedIn", false);
};
