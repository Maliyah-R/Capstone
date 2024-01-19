import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

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

  if (state.view === "Browse") {
    // Fetch artist data from the server
    axios
      .get("/api/artists")
      .then(response => {
        const artists = response.data;
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

          // Append the artist div to the container
          container.appendChild(artistDiv);
        });
      })
      .catch(error => {
        console.error("Error fetching artists:", error);
      });
  }

  if (state.view === "CreateProfile") {
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();

      const inputList = event.target.elements;
      console.log("Input Element List", inputList);

      const requestData = {
        medium: inputList.medium.value,
        username: inputList.username.value,
        email: inputList.email.value,
        experience: inputList.experience.value,
        description: inputList.description.value
      };
      console.log("Request Body", requestData);

      axios
        .post(`${process.env.ARTIST_API_URL}/artists`, requestData)
        .then(response => {
          store.Artist.artists.push(response.data);
          router.navigate("/Browse");
        })
        .catch(error => {
          console.log("Error creating artist profile:", error);
        });
    });
  }
}

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
