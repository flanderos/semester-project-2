export const listings = document.querySelector("#allthelistings");
let offset = 0;
export let activeResults = [];
let isFirstLoad = true;

export function getTimeLeft(endsAt) {
  const endDate = new Date(endsAt);
  const now = new Date();
  const timeLeft = endDate - now;
  return timeLeft > 0 ? timeLeft : 0;
}

export function formatTimeLeft(timeLeft) {
  if (timeLeft <= 0) {
    return "00:00:00";
  }
  const hours = Math.floor(timeLeft / 3600000);
  const minutes = Math.floor((timeLeft % 3600000) / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function addClickListeners() {
  activeResults.forEach((result) => {
    const postElement = document.getElementById(`post-${result.id}`);
    if (postElement) {
      postElement.addEventListener("click", () => {
        window.location.href = `specificpost.html?id=${result.id}`;
      });
    }
  });
}

export const renderPost = (result) => {
  const { title, created, tags, media, endsAt, id } = result;
  const mediaUrl = media[0] ? media[0] : "../../assets/placeholder.png";
  const timeLeft = getTimeLeft(endsAt);
  const timeLeftString = formatTimeLeft(timeLeft);

  const postElement = document.createElement("div");
  postElement.className = "flex justify-center align-center ml-1 mr-1 mb-1";
  postElement.id = `post-${id}`;

  postElement.innerHTML = `
  <div class="min-h-96 border border-black rounded p-5 bg-white shadow-lg hover:cursor-pointer" id="post-${id}">
  <div class="mb-5">
      <p class="text-lg" id="timeCreated">Created: ${created}</p>
      <p class="font-bold" id="title">${title}</p>
  </div>
  <div class="flex items-center justify-center mb-2"> <!-- Center vertically and horizontally -->
      <img class="w-60 h-60 object-cover" src="${mediaUrl}" onerror="this.onerror=null; this.src='./assets/placeholder.png';" alt="placeholder image" />
  </div>
  <div class="mt-2">
      <div class="text-s h-12" id="tags">${tags || ""}</div>
      <p>Time Left: <span id="time-left-${id}">${timeLeftString}</span></p>
  </div>
  <div class="mt-2">
      <button class="w-full bg-customBlue rounded shadow-lg hover:underline">More Info</button>
  </div>
</div>
  `;
  postElement.setAttribute("data-ends-at", endsAt);
  listings.appendChild(postElement);
};

export const renderListings = async () => {
  const loader = document.querySelector("#loader");
  if (!loader) {
    return; // Loader element not found, exit the function
  }
  loader.classList.remove("hidden");

  const limit = 40;
  const url = `https://api.noroff.dev/api/v1/auction/listings?sort=endsAt&sortOrder=asc&limit=${limit}&offset=${offset}&_active=true`;
  const response = await fetch(url);
  const newResults = await response.json();

  if (!listings) {
    return; // Listings element not found, exit the function
  }

  if (isFirstLoad) {
    listings.innerHTML = "";
    isFirstLoad = false;
  }

  activeResults = [...activeResults, ...newResults];

  newResults.forEach((result) => {
    renderPost(result);
  });

  loader.classList.add("hidden");

  addClickListeners();
};

const showMoreButton = document.querySelector("#showmorebutton");

const showMorePosts = () => {
  offset += 40;
  renderListings();
};

if (showMoreButton) {
  showMoreButton.addEventListener("click", showMorePosts);
}

renderListings();

function updateTimers() {
  activeResults.forEach((result) => {
    const timeLeft = getTimeLeft(result.endsAt);
    const timeLeftString = formatTimeLeft(timeLeft);
    const timerElement = document.getElementById(`time-left-${result.id}`);
    if (timerElement) {
      timerElement.textContent = timeLeftString;
    }
  });
}

setInterval(updateTimers, 1000);

//Sort post based on enddate

activeResults.sort((a, b) => {
  const endDateA = new Date(a.endsAt);
  const endDateB = new Date(b.endsAt);
  return endDateA - endDateB;
});
