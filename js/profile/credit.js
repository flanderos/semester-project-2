export function fetchCredits() {
    const credits = localStorage.getItem("credits");
    const showCredits = document.querySelector("#usercredits");
    showCredits.innerHTML += credits;
}

fetchCredits();


