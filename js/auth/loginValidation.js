import { loginUser } from "./login.js";

export function validateLoginForm(event) {
  if (event) {
    event.preventDefault();
    let isFormValid = true;

    const emailInput = document.querySelector("#emailInput");
    const emailError = document.querySelector("#emailError");
    const passwordInput = document.querySelector("#passwordInput");
    const passwordError = document.querySelector("#passwordError");

    // Valider e-postformat
    if (!validateEmail(emailInput.value)) {
      emailError.classList.remove("hidden");
      isFormValid = false;
    } else {
      emailError.classList.add("hidden");
    }

    // Valider passordlengde
    if (passwordInput.value.trim().length <= 6) {
      passwordError.classList.remove("hidden");
      isFormValid = false;
    } else {
      passwordError.classList.add("hidden");
    }

    // Kjør loginUser hvis valideringen er vellykket
    if (isFormValid) {
      loginUser(emailInput.value, passwordInput.value);
    } else {
      console.log(
        "Innlogging mislyktes. Vennligst fyll ut alle feltene riktig.",
      );
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
