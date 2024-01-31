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
        <div class="h-auto w-[80vw] mt-8 flex justify-center items-center mb-12" id="profileCard">
            <div class="w-full max-w-[600px] border border-black rounded p-5 bg-white shadow-lg flex flex-col">
                <div class="flex flex-1 flex-col justify-center items-center">
                <button id="editAvatarButton" class="bg-blue-200 text-black py-2 px-4 mb-5 rounded shadow-md transition duration-300 ease-in-out">Edit avatar</button>
                <input type="text" class="border border-black rounded-md px-4 py-2 mb-5 focus:outline-none focus:ring focus:border-blue-500 shadow-md" id="editAvatarInput" placeholder="Enter url">
                    <div id="avatar" class="mb-4">
                        <img class="w-48 h-48 object-cover rounded-full border border-black shadow-lg" src="${userAvatar || './assets/defaultavatar.png'}" alt="User Avatar"/>
                    </div>
                    <div id="profileInfo" class="flex flex-1 flex-col justify-center items-center text-center">
                        <p class="text-lg" id="username"> ${userName}</p>
                        <p class="text-sm" id="userEmail">Email: ${userEmail}</p>
                        <p class="text-sm mb-4" id="credit">Credits: ${userCredits}</p>
                    </div>
                </div>
                <div id="userListings" class="mt-4">
                    <h4 class="font-bold text-center">Listed Items</h4>
                    <ul id="listedItems" class="list-inside list-disc pl-4 text-sm text-center">
                        <!-- Dynamically generated listings will go here -->
                    </ul>
                </div>
                <div class="flex justify-center mt-4">
                    <!-- Other buttons and content can go here -->
                </div>
            </div>
        </div>`;

        const editAvatarButton = document.querySelector("#editAvatarButton");
        const editAvatarInputField = document.querySelector("#editAvatarInput");
        if (editAvatarButton) {
            editAvatarButton.addEventListener("click", () => editAvatar(editAvatarInputField));
        } else {
            console.error("editAvatarButton not found");
        }

    } catch (error) {
        console.error('Error fetching profile:', error);
        return;
    }

    // Fetch listings for the profile
    const userListings = await getListingsByProfile();

    
};

renderProfileCard();

export const editAvatar = async () => {
    const userName = localStorage.getItem("name");
    const token = localStorage.getItem("token");
    const editAvatarInputField = document.querySelector("#editAvatarInput");

    if (!editAvatarInputField) {
        console.error("editAvatarInputField not found");
        return;
    }

    const avatarUrl = editAvatarInputField.value;
    if (!avatarUrl) {
        
        editAvatarButton.classList.add("bg-red-500");

        
        setTimeout(() => {
            editAvatarButton.classList.remove("bg-red-500"); 
        }, 250);

        return;
    }

    try {
        const response = await fetch(`https://api.noroff.dev/api/v1/auction/profiles/${userName}/media`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ avatar: avatarUrl })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Avatar Updated:', responseData);
        
        
        editAvatarInputField.value = "";

        // refresh page
        setTimeout(() => {
            location.reload();
        }, 1000);

    } catch (error) {
        console.error('Error updating avatar:', error);
    }
};


