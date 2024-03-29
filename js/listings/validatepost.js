import { postItem } from "./createpost.js";

const title = document.querySelector("#title");
const price = document.querySelector("#price");
const tags = document.querySelector("#tags");

const description = document.querySelector("#description");

const submitButton = document.querySelector("#submitbutton");
const titleError = document.querySelector("#titleerror");
const priceError = document.querySelector("#priceerror");
const tagsError = document.querySelector("#tagserror");

const descriptionError = document.querySelector("#descriptionerror");

document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  const minDate = now.toISOString().slice(0, 16);
  const maxDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16);

  const enddateInput = document.getElementById("enddate");
  if (enddateInput) {
    enddateInput.min = minDate;
    enddateInput.max = maxDate;
  }
});

export function validateForm(event) {
  if (event) {
    event.preventDefault();
    let isFormValid = true;

    // Validate name input

    if (title.value.trim().length < 2 || title.value.trim().length > 20) {
      titleError.classList.remove("hidden");
      isFormValid = false;
    } else {
      titleError.classList.add("hidden");
    }

    if (tags.value.trim().length < 2 || tags.value.trim().length > 20) {
      tagsError.classList.remove("hidden");
      isFormValid = false;
    } else {
      tagsError.classList.add("hidden");
    }

    if (description.value.trim().length > 30) {
      descriptionError.classList.remove("hidden");
      isFormValid = false;
    } else {
      descriptionError.classList.add("hidden");
    }

    // Validate all criteria before registering

    if (isFormValid) {
      postItem();
      window.location.href = "auction.html";
      alert("posted successfully");
    } else {
      console.log("Validation failed");
    }
  }
}

validateForm();

if (submitButton) {
  submitButton.addEventListener("click", validateForm);
}

submitButton.addEventListener("click", validateForm);
