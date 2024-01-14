const listings = document.querySelector("#allthelistings");

export const renderListings = async () => {

    const url = "https://api.noroff.dev/api/v1/auction/listings"

            const response = await fetch(url);
            const results = await response.json();

            console.log(results)

    for (let i = 0; i < results.length; i++) {

        const title = results[i].title;
        const created = results[i].created;
        const tags = results[i].tags;
        const media = results[i].media[0] ? results[i].media[0] : "../../assets/placeholder.png";
        
        listings.innerHTML += `
        <div class="h-96 w-96 border border-black rounded p-5 mt-5 bg-white shadow-lg flex flex-col justify-between">
            <div class="flex flex-row justify-between mb-5">
                <p class="text-xl" id="title">${title}</p>
                <p class="text-xl" id="timeCreated">Created:${created}</p>
            </div>
            <p class="text-lg" id="tags">${tags}</p>
            <img class="h-72 w-72" src="${media}"onerror="this.onerror=null; this.src='../../assets/placeholder.png';" alt="placeholder image" />
            <p class="mt-5">Current Bid:</p>
            <p>Time Left:</p>
            <div class="flex justify-between mt-5">
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