export async function updateUserCreditsFromAPI() {
  try {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("name"); // Hent brukernavnet fra localStorage

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
      const userCredits = profile.credits; // Hent kreditinformasjonen fra profilen

      // Oppdater userCredits i localStorage
      localStorage.setItem("userCredits", userCredits);

      // Utfør den ønskede handlingen, for eksempel å refreshe siden
      window.location.reload();
    } else {
      console.error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating userCredits:", error);
  }
}
