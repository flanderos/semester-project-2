const loginButton = document.querySelector("#loginButton");

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

      console.log("Login successful");
      window.location.href = "auction.html";
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
