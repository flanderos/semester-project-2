export function fetchCredits() {
    const credits = localStorage.getItem("userCredits");
    const showCredits = document.querySelector("#usercredits");
    showCredits.innerHTML += credits;
}

fetchCredits();


