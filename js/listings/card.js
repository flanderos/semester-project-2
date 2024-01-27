const listings = document.querySelector("#allthelistings");

export const renderListings = async () => {

    const url = "https://api.noroff.dev/api/v1/auction/listings"

            const response = await fetch(url);
            const results = await response.json();

            console.log(results)

    for (let i = 0; i < results.length; i++) {

        results.sort((a, b) => new Date(b.created) - new Date(a.created));

        const title = results[i].title;
        const created = results[i].created;
        const tags = results[i].tags;
        const media = results[i].media[0] ? results[i].media[0] : "../../assets/placeholder.png";
        
        listings.innerHTML += `
        <div class="w-96 h-450 border border-black rounded p-5 mt-5 mr-5 ml-5 bg-white shadow-lg flex flex-col flex-1 justify-between max-w-[calc(100%/2)] hover:cursor-pointer">
            <div class="flex flex-col justify-between mb-5">
            <p class="text-lg" id="timeCreated">Created: ${created}</p>
                <p class="font-bold" id="title">${title}</p>
            </div>
            <div class="flex-grow">
                <img class="w-60 h-60 object-cover" src="${media}" onerror="this.onerror=null; this.src='../../assets/placeholder.png';" alt="placeholder image" />
            </div>
            <div>
                <p class="text-s" id="tags">${tags || ""}</p>
                <p class="mt-1" text-s>Current Bid:</p>
                <p>Time Left:</p>
            </div>
            <div class="flex justify-between mt-2">
                <div class="flex flex-row gap-2">
                <button class="w-36 bg-customBlue rounded shadow-lg hover:underline font-inder">BID</button>
                <input type="number" class="rounded w-28 shadow-lg border" />
            </div>
            <button class="w-36 bg-customBlue rounded shadow-lg hover:underline font-inder">Buy Now</button>
            </div>
        </div>`;
}
}
renderListings()