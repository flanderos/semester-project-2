import { loginUser } from "./login.js";

export function validateLoginForm(event) {
  if (event) {
    event.preventDefault();
    let isFormValid = true;

    const emailInput = document.querySelector("#emailInput");
    const emailError = document.querySelector("#emailError");
    const passwordInput = document.querySelector("#passwordInput");
    const passwordError = document.querySelector("#passwordError");

    // validate email
    if (!validateEmail(emailInput.value)) {
      emailError.classList.remove("hidden");
      isFormValid = false;
    } else {
      emailError.classList.add("hidden");
    }

    // validate password
    if (passwordInput.value.trim().length <= 6) {
      passwordError.classList.remove("hidden");
      isFormValid = false;
    } else {
      passwordError.classList.add("hidden");
    }

    // run login if form is valid
    if (isFormValid) {
      loginUser(emailInput.value, passwordInput.value);
    } else {
    }
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return (
    (patternMatches && email.endsWith("@stud.noroff.no")) ||
    email.endsWith("noroff.no")
  );
}

const loginButton = document.getElementById("loginButton");

if (loginButton) {
  loginButton.addEventListener("click", validateLoginForm);
}
