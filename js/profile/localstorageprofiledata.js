import { getListingsByProfile } from "../scripts/getlistingbyprofile.js";

export const renderProfileCard = async () => {
    let userName = localStorage.getItem("name");  
    let token = localStorage.getItem("token");  

    try {
        const response = await fetch(`https://api.noroff.dev/api/v1/auction/profiles/${userName}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const profileData = await response.json();
        console.log(profileData);

        // Use let for local variables, not the userName from localStorage
        let userEmail = profileData.email;
        let userCredits = profileData.credits;
        let userAvatar = profileData.avatar;

        // Update localStorage with new data
        localStorage.setItem("userName", userName); 
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("userCredits", userCredits);
        localStorage.setItem("userAvatar", userAvatar);

        const profileCard = document.querySelector("#profileInfo");

        
        profileCard.innerHTML = `
            <div class="bg-white w-[600px] mt-10 border border-black rounded flex flex-row h-[580px] shadow-xl p-5">
                <div id="profileInfo" class="flex flex-1 flex-col justify-between">
                    <div>
                        <!-- Your HTML content here -->
                        <div id="credit">Credits: ${userCredits}</div>
                        <div id="username">Username: ${userName}</div>
                        <div id="userEmail" class="mb-8">Email: ${userEmail}</div>
                        <div id="avatar">
                            <img class="w-48 rounded mb-4 border border-black" src="${userAvatar || './assets/defaultavatar.png'}" alt="User Avatar"/>
                        </div>
                        <!-- Other buttons and content -->
                    </div>
                </div>
                <div id="userListings">
                    <h4>Listet items</h4>
                    <ul id="listedItems">
                        <!-- Dynamically generated listings will go here -->
                    </ul>
                </div>
            </div>`;

    } catch (error) {
        console.error('Error fetching profile:', error);
        return;
    }

    // Fetch listings for the profile
    const userListings = await getListingsByProfile();

    
};

renderProfileCard();


