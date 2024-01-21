import { getListingsByProfile } from "../scripts/getlistingbyprofile.js";

export const renderProfileCard = async () => {  
        let userID = localStorage.getItem("userId");
        let userEmail = localStorage.getItem("userEmail");
        let userCredits = localStorage.getItem("userCredits");
        let userName = localStorage.getItem("userName");
        let userAvatar = localStorage.getItem("userAvatar");

        const token = localStorage.getItem("token"); 

        if (!userEmail || !userCredits || !userName || !userAvatar) {
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
                userEmail = profileData.email;
                userCredits = profileData.credits;
                userName = profileData.name;
                userAvatar = profileData.avatar;
    
                localStorage.setItem("userEmail", userEmail);
                localStorage.setItem("userCredits", userCredits);
                localStorage.setItem("userName", userName);
                localStorage.setItem("userAvatar", userAvatar);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }

        const profileCard = document.querySelector("#profileInfo");

        const credit = document.querySelector("#credit");
        const name = document.querySelector("#username");
        const avatar = document.querySelector("#avatar");
        const changeAvatarButton = document.querySelector("#changeavatar");
        const email = document.querySelector("#userEmail");
        const listItemButton = document.querySelector("#listitembutton");
        const listOfListedItems = document.querySelector("#userListings");

        const userListings = await getListingsByProfile();

        profileCard.innerHTML = `<div
        class="bg-white w-[600px] mt-10 border border-black rounded flex flex-row h-[580px] shadow-xl p-5"
      >
        <div id="profileInfo" class="flex flex-1 flex-col justify-between">
          <div>
            <button
              class="bg-customBlue w-48 flex justify-around h-10 items-center font-inder mb-4 rounded drop-shadow-xl"
              href="auction.html"
            >
              <svg
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
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
              Back to Auction
            </button>
            <div id="credit">Credits: ${userCredits}</div>
            <div id="username">Username: ${userName}</div>
            <div id="userEmail" class="mb-8">Email:${userEmail}</div>
            <div id="avatar">
            <img
              class="w-48 rounded mb-4 border border-black"
              src="${userAvatar || 'assets/DALL·E 2023-11-22 21.07.31 - Refine the caricature of the person to closely resemble the features in the uploaded image. The caricature should capture the unique attributes of the.png'}"
              alt="User Avatar"
            />
          </div>
            <button
              id="changeAvatar"
              class="bg-customBlue w-36 flex justify-around h-8 items-center font-inder mb-8 drop-shadow-xl"
            >
              <svg
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
  
              Change avatar
            </button>
            <button
              class="bg-customGreen w-48 flex justify-around h-10 items-center font-inder mt-20 rounded drop-shadow-xl"
            >
              <svg
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
                  d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                />
              </svg>
  
              List item
            </button>
          </div>
        </div>
        <div id="userListings">
          <h4>Listet items</h4>
          <ul id="listedItems>
          </ul>
        </div>
      </div>`
    };



    renderProfileCard()
