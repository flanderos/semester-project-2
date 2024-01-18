const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE3NSwibmFtZSI6IkFuZGVyczgiLCJlbWFpbCI6ImFuZGVyczhAbm9yb2ZmLm5vIiwiYXZhdGFyIjoiIiwiY3JlZGl0cyI6MTAwMCwid2lucyI6W10sImlhdCI6MTcwNTQzMzMwNn0.BXT1x1AwIiWOfF7g4MMrFsEXlJt_mIiDrl0a6qUeXEw";
const userName = "Espen";

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
        console.log(results);
    } catch (error) {
        console.error('Error fetching listings:', error);
    }
}

getListingsByProfile();