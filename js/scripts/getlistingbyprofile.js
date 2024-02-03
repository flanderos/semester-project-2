const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjE3NSwibmFtZSI6IkFuZGVyczgiLCJlbWFpbCI6ImFuZGVyczhAbm9yb2ZmLm5vIiwiYXZhdGFyIjoiIiwiY3JlZGl0cyI6MTAwMCwid2lucyI6W10sImlhdCI6MTcwNTQzMzMwNn0.BXT1x1AwIiWOfF7g4MMrFsEXlJt_mIiDrl0a6qUeXEw";

export const getListingsByProfile = async () => {
  try {
    const userName = localStorage.getItem("name");
    if (!userName) {
      throw new Error("User name not found in localStorage");
    }

    const response = await fetch(
      `https://api.noroff.dev/api/v1/auction/profiles/${userName}/listings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

document.addEventListener("DOMContentLoaded", async function () {
  const userListings = document.querySelector("#userListings");

  try {
    const listingsData = await getListingsByProfile();

    listingsData.forEach((data) => {
      const card = document.createElement("div");
      card.className =
        "max-w-lg mx-auto bg-white rounded shadow-md overflow-hidden mb-5";

      if (data._count.bids <= 0) {
        card.style.boxShadow = "0 0 10px 5px rgba(255, 0, 0, 0.5)";
      } else if (data._count.bids > 0) {
        card.style.boxShadow = "0 0 10px 5px rgba(0, 255, 0, 0.5)";
      }

      card.style.transition = "box-shadow 0.3s ease-in-out";

      card.addEventListener("mouseenter", () => {
        card.style.boxShadow = "0 0 10px 5px rgba(0, 0, 0, 0.2)";
      });

      card.addEventListener("mouseleave", () => {
        if (data._count.bids <= 0) {
          card.style.boxShadow = "0 0 10px 5px rgba(255, 0, 0, 0.5)";
        } else if (data._count.bids > 0) {
          card.style.boxShadow = "0 0 10px 5px rgba(0, 255, 0, 0.5)";
        }
      });

      card.innerHTML = `
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">${data.title}</div>
          <p class="text-gray-700 text-base">${data.description}</p>
          <div class="mt-2">
            ${data.tags.map(
              (tag) => `
                <span
                  class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                >${tag}</span
                >
              `,
            )}
          </div>
          <div class ="">Bids: ${data._count.bids}</div>
        </div>
      `;
      userListings.appendChild(card);
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

getListingsByProfile();
