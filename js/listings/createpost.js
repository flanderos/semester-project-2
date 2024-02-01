import { validateForm } from "./validatepost.js";

export async function postItem() {
  // Hent token fra localStorage eller en annen kilde
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Ingen token funnet, kan ikke poste item");
    return;
  }

  const endDate = document.querySelector("#enddate");

  const itemData = {
    title: title.value,
    description: description.value,
    tags: tags.value.split(",").map((tag) => tag.trim()),
    media: image.value ? [image.value] : [],
    endsAt: endDate.value,
  };

  try {
    const response = await fetch(
      "https://api.noroff.dev/api/v1/auction/listings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inkluder token i header
        },
        body: JSON.stringify(itemData),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Item posted successfully:", responseData);
    // Suksessfull handling
  } catch (error) {
    console.error("Error posting item:", error);
    // Feilhåndtering
  }
}
