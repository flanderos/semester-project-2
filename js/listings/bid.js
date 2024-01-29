import { updateUserCreditsFromAPI } from '../profile/updateUserCredits.js';

export const placeBid = () => {
    const amountInput = document.querySelector("#amountinput");
    const inputValue = amountInput.value;

    // Check if the input field is empty
    if (inputValue.trim() === "") {
        const bidButton = document.querySelector("#bidbutton");
        bidButton.style.transition = "background-color 0.5s"; // Add a transition
        bidButton.style.backgroundColor = "red";

        setTimeout(() => {
            bidButton.style.transition = "";
            bidButton.style.backgroundColor = ""; 
        }, 1000);
       
        return; 
    }

    if (!isNaN(inputValue)) {
        amountInput.value = "";
    } else {
        const bidButton = document.querySelector("#bidbutton");
        bidButton.style.transition = "background-color 0.5s"; // Add a transition
        bidButton.style.backgroundColor = "red";

        setTimeout(() => {
            bidButton.style.transition = "";
            bidButton.style.backgroundColor = ""; 
        }, 1000);

        amountInput.value = "";
    }

    // Check if the input value is a number
    if (!isNaN(inputValue)) {
        const bidAmount = parseFloat(inputValue);
        const urlParams = new URLSearchParams(window.location.search);
        const listingId = urlParams.get('id');

        if (!listingId) {
            
            return;
        }

        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
            
            return;
        }

        // Display the loader
        const loader = document.querySelector("#loader");
        loader.style.display = "block";

        // Prepare the bid data
        const bidData = {
            "amount": bidAmount
        };

        // Make the POST request to place the bid with the Authorization header
        fetch(`https://api.noroff.dev/api/v1/auction/listings/${listingId}/bids`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Include the Bearer token in the headers
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bidData),
        })
        .then(response => response.json())
        .then(data => {
            
            amountInput.value = "";
        
            // Hide the loader after 2.9 seconds
            setTimeout(() => {
                loader.style.display = "none";
            }, 2900);
        
            // Wait for 3 seconds before refreshing the page
            setTimeout(() => {
                window.location.reload(); // Refresh the page
            }, 3000);

            setTimeout(() => {
                updateUserCreditsFromAPI();
            }, 20000);
        })
        .catch(error => {
            console.error('Error placing bid:', error);
        
            // Hide the loader in case of an error
            loader.style.display = "none";
        });
    } else {
        

        const bidButton = document.querySelector("#bidbutton");
        bidButton.style.transition = "background-color 0.5s"; // Add a transition
        bidButton.style.backgroundColor = "red";

        setTimeout(() => {
            bidButton.style.transition = "";
            bidButton.style.backgroundColor = ""; 
        }, 1000);

        amountInput.value = "";
    }
}



document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function (event) {
        if (event.target && event.target.id === "bidbutton") {
            placeBid();
        }
    });
});
