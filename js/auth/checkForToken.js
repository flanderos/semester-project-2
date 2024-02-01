document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const currentPath = window.location.pathname;

  if (token && !currentPath.includes("login.html")) {
    window.location.href = "login.html"; // Omdirigerer kun hvis brukeren ikke allerede er på login-siden
  } else if (!token && !currentPath.includes("index.html")) {
    window.location.href = "index.html"; // Omdirigerer kun hvis brukeren ikke allerede er på index-siden
  }
});
