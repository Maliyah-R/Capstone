import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
// import html from "html-literal";

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
  ${Header(state)}
  ${Nav(store.Links)}
  ${Main(state)}
  ${Footer()}
  `;
  router.updatePageLinks();
  afterRender(state);
}

function afterRender(state) {
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });

  if (state.view === "Createprofile") {
    setupCreateProfileForm();
  }
  if (state.view === "Browse") {
    loadArtists();
    displayArtists();
  }
}

function setupCreateProfileForm() {
  const form = document.getElementById("createProfileForm");
  if (form) {
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const formData = new FormData(this);

      axios
        .post("/api/artist/create", formData)
        .then(response => {
          console.log("Profile created:", response.data);
          router.navigate("/Createprofile");
          // Handle success, such as redirecting to another view
        })
        .catch(error => {
          console.error("Error creating profile:", error);
          // Handle error
        });
    });
  }
}

function loadArtists() {
  axios
    .get("/api/artists")
    .then(response => {
      const artists = response.data;
      const container = document.getElementById("artistsContainer");
      container.innerHTML = artists
        .map(
          artist => `
        <div class="artist">
          <h3>${artist.username}</h3>
          <p>${artist.medium}</p>
          <p>${artist.email}</p>
          <img src="data:${artist.image.contentType};base64,${btoa(
            String.fromCharCode(...new Uint8Array(artist.image.data))
          )}" />
        </div>
      `
        )
        .join("");
    })
    .catch(error => console.error("Error fetching artists:", error));
}

// function loadArtists() {
//   axios
//     .get("/api/artists")
//     .then(response => {
//       const artists = response.data;
//       displayArtists(artists);
//     })
//     .catch(error => {
//       console.error("Error fetching artists:", error);
//       // Handle the error appropriately
//     });
// }

function displayArtists(artists) {
  const container = document.getElementById("artistsContainer");
  container.innerHTML = ""; // Clear existing content

  artists.forEach(artist => {
    // Create artist div
    const artistDiv = document.createElement("div");
    artistDiv.className = "artist";

    // Add username
    const username = document.createElement("h3");
    username.textContent = artist.username;
    artistDiv.appendChild(username);

    // Add medium
    const medium = document.createElement("p");
    medium.textContent = `Medium: ${artist.medium}`;
    artistDiv.appendChild(medium);

    // Add email
    const email = document.createElement("p");
    email.textContent = `Email: ${artist.email}`;
    artistDiv.appendChild(email);

    // Add description
    const description = document.createElement("p");
    description.textContent = `Description: ${artist.description}`;
    artistDiv.appendChild(description);

    // Add image if available
    if (artist.image) {
      const image = document.createElement("img");
      image.src = artist.image;
      image.alt = `${artist.username}'s artwork`;
      artistDiv.appendChild(image);
    }

    // Append the artist div to the container
    container.appendChild(artistDiv);
  });
}

// function displayArtists(artists) {
//   const container = document.getElementById("artistsContainer"); // this container exists Browse view HTML
//   const artistsHtml = artists
//     .map(
//       artist => html`
//         <div class="artist">
//           <h3>${artist.username}</h3>
//           <p>Medium: ${artist.medium}</p>
//           <p>Email: ${artist.email}</p>
//           <p>Description: ${artist.description}</p>
//           ${artist.image
//             ? `<img src="${artist.image}" alt="${artist.username}'s artwork">`
//             : ""}
//         </div>
//       `
//     )
//     .join("");

//   container.innerHTML = artistsHtml;
// }

router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";
    // Add a switch case statement to handle multiple routes
    switch (view) {
      // New Case for the Home View
      case "Home":
        axios
          // Get request to retrieve the current weather data using the API key and providing a city name
          .get(
            `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=st%20louis`
          )
          .then(response => {
            // Convert Kelvin to Fahrenheit since OpenWeatherMap does provide otherwise
            const kelvinToFahrenheit = kelvinTemp =>
              Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);
            // Create an object to be stored in the Home state from the response
            store.Home.weather = {
              city: response.data.name,
              temp: kelvinToFahrenheit(response.data.main.temp),
              feelsLike: kelvinToFahrenheit(response.data.main.feels_like),
              description: response.data.weather[0].main
            };
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
        break;
      default:
        done();
    }
    params => {
      const view =
        params && params.data && params.data.view
          ? capitalize(params.data.view)
          : "Home";

      render(store[view]);
    };
  }
});

router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      if (view in store) {
        render(store[view]);
      } else {
        render(store.Viewnotfound);
        console.log(`View ${view} not defined`);
      }
    }
  })
  .resolve();
