const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE3NSwibmFtZSI6IkFuZGVyczgiLCJlbWFpbCI6ImFuZGVyczhAbm9yb2ZmLm5vIiwiYXZhdGFyIjoiIiwiY3JlZGl0cyI6MTAwMCwid2lucyI6W10sImlhdCI6MTcwNTQzMzMwNn0.BXT1x1AwIiWOfF7g4MMrFsEXlJt_mIiDrl0a6qUeXEw";
const userName = "Anders8";

export const getListingsByProfile = async () => {
    const url = `https://api.noroff.dev/api/v1/auction/profiles/${userName}/listings`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const results = await response.json();
        
        for (let i = 0; i < results.length; i++) {
            const listing = results[i];
            console.log(listing.title); // Du kan gjøre hva du vil med hvert listing-objekt her
        }
    } catch (error) {
        console.error('Error fetching listings:', error);
    }
}

getListingsByProfile();