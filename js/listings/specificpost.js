import { renderPost } from "./card.js";
import { getTimeLeft, formatTimeLeft } from "./card.js";

export function getSpecificPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!postId) {
    return; // If postId is not present in the URL, exit the function.
  }

  const thePost = document.querySelector("#thepost");
  const loader = document.querySelector("#loader");

  loader.style.display = "block";

  // Fetch API data for the specific post
  fetch(
    `https://api.noroff.dev/api/v1/auction/listings/${postId}?_seller&_bids=true`,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Render data
      const { created, title, media, tags, endsAt, description, bids } = data; // Use data from the API response
      const mediaUrl = media[0] ? media[0] : "./assets/placeholder.png";
      const timeLeft = getTimeLeft(endsAt);
      const timeLeftString = formatTimeLeft(timeLeft);

      const bidsList = document.createElement("ul");

      bids.forEach((bid) => {
        const bidItem = document.createElement("li");
        bidItem.textContent = `Amount: ${bid.amount}, Name: ${bid.bidderName}`;
        bidsList.appendChild(bidItem);
      });

      loader.style.display = "none";

      // Find the last bid
      const lastBid = bids[bids.length - 1];

      thePost.innerHTML = `<div class="h-2/3 w-11/12 sm:w-[500px] mt-8 flex justify-center items-center mb-12 mx-auto"" data-id=${postId} id="thepost">
                <div class="w-full h-[70%] border border-black rounded p-5 bg-white shadow-lg flex flex-col justify-between">
                    <div class="flex flex-col justify-between mb-5">
                        <p class="text-lg" id="timeCreated">Created: ${created}</p>
                        <p class="text-lg font-bold" id="title">${title}</p>
                        <p class="text-sm">${description}</p>
                    </div>
                    <div class="flex-grow">
                        <img class="w-11/12 h-2/3 object-cover" src="${mediaUrl}" onerror="this.onerror=null; this.src='./assets/placeholder.png';" alt="placeholder image" />
                    </div>
                    <div>
                        <p class="text-s" id="tags">${tags || "tags"}</p>
                        <p class="mt-1" text-s>Bids:</p>
                        <ul class="list-inside list-disc pl-4 text-sm text-green-700">
                            ${bidsList.outerHTML}
                        </ul>
                        <p class="font-bold">Current Bid: ${
                          lastBid ? lastBid.amount + " " + "Coins" : "N/A"
                        }</p>
                        <p class="">Time Left: <span id="time-left">${timeLeftString}</span></p>
                        
                    </div>
                    <div class="flex justify-start mt-14">
                        <button class="w-36 bg-green-300 rounded shadow-lg hover:underline font-inder noshow" id="bidbutton">BID</button>
                        <input type="text" class="rounded w-28 shadow-lg border noshow" id="amountinput" />
                    </div>
                </div>
            </div>`;

      const timeLeftElement = document.getElementById("time-left");
      setInterval(() => {
        const timeLeft = getTimeLeft(endsAt);
        const timeLeftString = formatTimeLeft(timeLeft);
        timeLeftElement.textContent = timeLeftString;
      }, 1000);
    })
    .catch((error) => {
      console.error("Error fetching specific post data:", error);
    });
}

// Call the function to fetch details about the specific post
getSpecificPost();
