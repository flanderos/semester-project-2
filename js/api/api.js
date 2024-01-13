const url = "https://api.noroff.dev/api/v1/auction/listings";

export async function getListings() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const results = await response.json();
        for (let i = 0; i < results.length; i++) {
            console.log(results[i])
        }
    } catch (error) {
        console.log('Error fetching listings:', error);
    }
}

getListings();