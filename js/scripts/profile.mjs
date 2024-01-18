///auction/profiles/<name>/listings

export const getListingsByProfile = async () => {
    const url = "https://api.noroff.dev/api/v1/auction/profiles/<name>/listings"

    const response = await fetch(url);
    const results = await response.json();

    console.log(results)
}