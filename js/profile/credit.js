const displayCredit = document.querySelector("#usercredit");

import { renderProfileCard } from "./localstorageprofiledata.js";

// Hent token fra localStorage
const token = localStorage.getItem("token");

// Funksjon for å hente din egen brukerprofil
export const fetchCredits = async () => {
    try {
        const response = await fetch('https://api.noroff.dev/api/v1/auction/profiles/me', {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const profileData = await response.json();

        console.log(profileData);

        const userCredits = profileData.credits;

        displayCredit.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
        
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 7.5l3 4.5m0 0l3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      Credit:${userCredits};
    </div>`
        
        localStorage.setItem("userCredits", userCredits);

    } catch (error) {
        console.error('Error fetching profile:', error);
    }
};

// Kall fetchUserCredits for å hente dine egne kreditter
fetchCredits();
