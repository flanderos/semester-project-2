export async function updateUserCreditsFromAPI() {
  try {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("name");

    if (!token || !username) {
      console.error("Token or username not found in localStorage.");
      return;
    }

    const response = await fetch(
      `https://api.noroff.dev/api/v1/auction/profiles/${username}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.ok) {
      const profile = await response.json();
      const userCredits = profile.credits;

      const oldCredits = localStorage.getItem("userCredits");

      if (oldCredits !== userCredits.toString()) {
        localStorage.setItem("userCredits", userCredits);
        document.querySelector("#usercredits").textContent = `Credit: ${userCredits}`;
      }
    } else {
      console.error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating userCredits:", error);
  }
}

setInterval(updateUserCreditsFromAPI, 1000);
