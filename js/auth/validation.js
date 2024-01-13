export function validateForm(event) {
    if (event) {
      event.preventDefault();
      let isFormValid = true;

      const nameInput = document.querySelector("#nameInput");
      const nameError = document.querySelector("#nameError");
      const emailInput = document.querySelector("#emailInput");
      const emailError = document.querySelector("#emailError");
      const passwordInput = document.querySelector("#passwordInput");
      const passwordError = document.querySelector("#passwordError");
      const loginButton = document.querySelector("#loginButton");
      const registerButton = document.querySelector("#registerButton");
  
      // Validate name input
  
      if (nameInput.value.trim().length < 2) {
        nameError.classList.remove("hidden");
        isFormValid = false;
      } else {
        nameError.classList.add("hidden");
      }
  
      // Validate name format
  
      /* if (validateName(nameInput.value) === true) {
        nameError.classList.remove = "hidden";
      } else {
        nameError.classList.add = "hidden";
      }
   */
      // Validate email format
  
      if (!validateEmail(emailInput.value)) {
        emailError.classList.remove("hidden");
        isFormValid = false;
    } else {
        emailError.classList.add("hidden");
    }
  
      // Validate password length
  
      if (passwordInput.value.trim().length <= 6) {
        passwordError.classList.remove("hidden");
        isFormValid = false;
    } else {
        passwordError.classList.add("hidden");
    }
  
      // Validate all criteria before registering

      if (isFormValid) {
        registerUser();
      } else {
        console.log("Validering mislyktes. Vennligst fyll ut alle feltene riktig.");
      }
    }
  }

  
  validateForm();
  
  if (registerButton) {
    registerButton.addEventListener("click", validateForm);
  }

  if (loginButton) {
    loginButton.addEventListener("click", validateForm);
  }
  
  // Function to validate email format
  
  function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches && email.endsWith("@stud.noroff.no") || email.endsWith("noroff.no");
  }
  
  // Function to validate name format
  
  function validateName(nameInput) {
    const nameRegex = /^[A-Za-z\s]+$/;
    const patternMatchesName = nameRegex.test(nameInput);
    return patternMatchesName;
  }