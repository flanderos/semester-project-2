const title = document.querySelector("#title");
const price = document.querySelector("#price")
const tags = document.querySelector("#tags")
const image = document.querySelector("#image")
const description = document.querySelector("#description")
const endDate = document.querySelector("#enddate");
const submitButton = document.querySelector("#submitbutton")

export const listItem = (event) => {
    event.preventDefault(); 
    console.log(title.value);
    console.log(price.value);
    console.log(tags.value);
    console.log(image.value);
    console.log(description.value);
    console.log(endDate.value);
}

submitButton.addEventListener("click", listItem);