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
  const mediaUrl = media && media.length > 0 ? media[0] : "../../assets/placeholder.png";
  const timeLeftString = formatTimeLeft(getTimeLeft(endsAt));

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { 
        year: "numeric", 
        month: "long", 
        day: "numeric", 
        hour: "2-digit", 
        minute: "2-digit"
    });
  }
  
  const formattedCreated = formatDate(created);

  const postHTML = `
    <div id="post-${id}" class="border border-black rounded p-5 bg-white shadow-lg hover:cursor-pointer flex flex-col h-full">
      <div class="mb-5">
        <p class="text-lg">Created: ${formattedCreated}</p>
        <p class="font-bold">${title}</p>
      </div>
      <div class="flex items-center justify-center mb-2"> 
        <img class="w-full h-60 object-cover" src="${mediaUrl}" onerror="this.onerror=null; this.src='./assets/placeholder.png';" alt="${title}">
      </div>
      <div class="mt-2">
        <div class="text-s h-12 overflow-hidden">${tags || ""}</div>
        <p>Time Left: <span id="time-left-${id}">${timeLeftString}</span></p>
      </div>
      <div class="mt-auto">
        <button class="w-full bg-customBlue text-white rounded shadow-lg hover:underline p-2">More Info</button>
      </div>
    </div>
  `;

  return postHTML;
};

export const renderListings = async () => {
  const loader = document.querySelector("#loader");
  if (loader) {
    loader.classList.remove("hidden");
  }

  const limit = 40;
  const url = `https://api.noroff.dev/api/v1/auction/listings?sort=endsAt&sortOrder=asc&limit=${limit}&offset=${offset}&_active=true`;
  
  try {
    const response = await fetch(url);
    const newResults = await response.json();

    if (!listings) {
      if (loader) {
        loader.classList.add("hidden");
      }
      return;
    }

    const existingIds = new Set(activeResults.map(item => item.id));
    const uniqueNewResults = newResults.filter(item => !existingIds.has(item.id));
    
    activeResults = [...activeResults, ...uniqueNewResults];

    activeResults.sort((a, b) => {
      const endDateA = new Date(a.endsAt);
      const endDateB = new Date(b.endsAt);
      return endDateA - endDateB;
    });

    if (isFirstLoad) {
      listings.innerHTML = '';
      isFirstLoad = false;
    } else {
      listings.innerHTML = '';
    }

    activeResults.forEach((result) => {
      const cardHTML = renderPost(result);
      listings.insertAdjacentHTML("beforeend", cardHTML);
    });
    
    if (loader) {
      loader.classList.add("hidden");
    }
    
    addClickListeners();
    
  } catch (error) {
    if (loader) {
      loader.classList.add("hidden");
    }
  }
};

const showMoreButton = document.querySelector("#showmorebutton");

const showMorePosts = () => {
  offset += 40;
  renderListings();
};

if (showMoreButton) {
  showMoreButton.addEventListener("click", showMorePosts);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderListings);
} else {
  renderListings();
}

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

function forceGrid() {
  const gridContainer = document.querySelector("#allthelistings");
  if (gridContainer) {
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = "repeat(auto-fill, minmax(250px, 1fr))";
    gridContainer.style.gap = "1.5rem";
  }
}

forceGrid();