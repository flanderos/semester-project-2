import { validateForm } from "./validatepost.js";

export async function postItem() {
  // get token from localstorage
  const token = localStorage.getItem("token");

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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("Item posted successfully:", responseData);
  } catch (error) {
    console.error("Error posting item:", error);
  }
}
