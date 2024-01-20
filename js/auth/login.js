const loginButton = document.querySelector('#loginButton');

export function loginUser(email, password) {
    fetch('https://api.noroff.dev/api/v1/auction/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        const token = data.accessToken; 
        localStorage.setItem('token', token);
        console.log('Login successful');
        window.location.href = 'auction.html'; 
        console.log(data)
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

if (loginButton) {
    loginButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        const emailInput = document.getElementById('emailInput');
        const passwordInput = document.getElementById('passwordInput');
        loginUser(emailInput.value, passwordInput.value); 
    });
}