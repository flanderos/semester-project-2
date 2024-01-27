const listings = document.querySelector("#allthelistings");
const loader = document.querySelector("#loader");

function getTimeLeft(endsAt) {
    const endDate = new Date(endsAt);
    const now = new Date();
    return endDate - now;
}

function formatTimeLeft(timeLeft) {
    const hours = Math.floor(timeLeft / 3600000);
    const minutes = Math.floor((timeLeft % 3600000) / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    return `${hours}:${minutes}:${seconds}`;
}

// Funksjon for å legge til hendelseslyttere på postelementene
function addClickListeners(activeResults) {
    activeResults.forEach((result) => {
        const postElement = document.getElementById(`post-${result.id}`);
        postElement.addEventListener('click', () => {
            window.location.href = `specificpost.html?id=${result.id}`;
        });
    });
}

export const renderPost = (result, i) => {
    const { title, created, tags, media, endsAt, id } = result;
    const mediaUrl = media[0] ? media[0] : "../../assets/placeholder.png";
    const timeLeft = getTimeLeft(endsAt);
    const timeLeftString = formatTimeLeft(timeLeft);

    const postElement = document.createElement('div');
    postElement.className = "w-96 h-450 border border-black rounded p-5 mt-5 mr-5 ml-5 bg-white shadow-lg flex flex-col flex-1 justify-between max-w-[calc(100%/2)] hover:cursor-pointer";
    postElement.id = `post-${id}`;

    postElement.innerHTML = `
        <div class="flex flex-col justify-between mb-5">
            <p class="text-lg" id="timeCreated">Created: ${created}</p>
            <p class="font-bold" id="title">${title}</p>
        </div>
        <div class="flex-grow">
            <img class="w-60 h-60 object-cover" src="${mediaUrl}" onerror="this.onerror=null; this.src='../../assets/placeholder.png';" alt="placeholder image" />
        </div>
        <div>
            <p class="text-s" id="tags">${tags || ""}</p>
            <p class="mt-1" text-s>Current Bid:</p>
            <p>Time Left: <span id="time-left-${i}">${timeLeftString}</span></p>
        </div>
        <div class="flex justify-between mt-2">
            <button class="w-36 bg-customBlue rounded shadow-lg hover:underline font-inder">BID</button>
            <input type="number" class="rounded w-28 shadow-lg border" />
            <button class="w-36 bg-customBlue rounded shadow-lg hover:underline font-inder">Buy Now</button>
        </div>
    `;

    listings.appendChild(postElement);
};

export const renderListings = async () => {
    loader.classList.remove('hidden'); // Show loader
    const limit = 40
    const url = `https://api.noroff.dev/api/v1/auction/listings?sort=endsAt&limit=${limit}`;
    const response = await fetch(url);
    const results = await response.json();

    console.log(results)

    // Removes finished posts
    const currentDate = new Date();
    const activeResults = results.filter(result => {
        const endDate = new Date(result.endsAt);
        return endDate > currentDate;
    });

    listings.innerHTML = '';

    activeResults.sort((a, b) => getTimeLeft(a.endsAt) - getTimeLeft(b.endsAt));

    activeResults.forEach((result, i) => {
        renderPost(result, i);
    });

    loader.classList.add('hidden');

    addClickListeners(activeResults);

    // Update counter every second
    setInterval(() => {
        activeResults.forEach((result, i) => {
            const endsAt = result.endsAt;
            const timeLeft = getTimeLeft(endsAt);
            const timeLeftString = formatTimeLeft(timeLeft);
            document.getElementById(`time-left-${i}`).textContent = timeLeftString;
        });
    }, 1000);
}

renderListings();


