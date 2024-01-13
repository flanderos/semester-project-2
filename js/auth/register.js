export function registerUser() {
    const nameInput = document.getElementById('nameInput'); 
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const avatarInput = document.getElementById('avatarInput');

    const userData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        avatar: avatarInput.value 
    };

    fetch('https://api.noroff.dev/api/v1/auction/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Registration successful', data);
        window.location.href = "login.html";
    })
    .catch(error => {
        console.error('Error during registration:', error);
        //Add error message here
    });
}



 document.getElementById('registerButton').addEventListener('click', function(event) {
    event.preventDefault(); 
    registerUser();
 
});

//added comment for first push