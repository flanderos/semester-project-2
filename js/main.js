import { registerUser } from "./auth/register.js";
import { loginUser } from "./auth/login.js";
import { validateForm } from "./auth/validation.js";

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (token) {
        window.location.href = "login.html"; //redirect user to login.html if localstorage contains token
    } else {
        window.location.href = "register.html"; 
    }
});