import { validateForm } from "./validation.js";

export function registerUser() {
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");
  const avatarInput = document.getElementById("avatarInput");
  const errorFromApi = document.querySelector("#error");

  const userData = {
    name: nameInput.value.trim().replace(/\s+/g, "_"),
    email: emailInput.value,
    password: passwordInput.value,
    avatar: avatarInput.value,
  };

  console.log(userData.name);

  fetch("https://api.noroff.dev/api/v1/auction/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Registration successful", data);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("userAvatar", data.avatar);
      localStorage.setItem("userCredits", data.credits);
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Error during registration:", error);
      errorFromApi.classList.remove("hidden");
    });
}

document
  .getElementById("registerButton")
  .addEventListener("click", validateForm);

//added comment for first push
