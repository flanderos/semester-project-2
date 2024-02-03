const loginError = document.querySelector("#loginError");

export function loginUser(email, password) {
  fetch("https://api.noroff.dev/api/v1/auction/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then((data) => {
      const token = data.accessToken;
      const credits = data.credits;
      const name = data.name;

      localStorage.setItem("token", token);
      localStorage.setItem("userCredits", credits);
      localStorage.setItem("name", name);
      localStorage.setItem("isLoggedIn", true);

      console.log("Login successful");
      loginError.classList.add("hidden");
      window.location.href = "auction.html";
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      loginError.classList.remove("hidden");
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("emailInput");
  const savedEmail = localStorage.getItem("userEmail");

  if (emailInput && savedEmail) {
    emailInput.value = savedEmail;
  }
});
