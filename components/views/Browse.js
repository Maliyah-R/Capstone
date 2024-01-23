import html from "html-literal";

import Digital from "../../assets/img/DigitalArt.png";
import DrawnArt from "../../assets/img/DrawnArt.png";
import Fiber from "../../assets/img/FiberArt.png";
import Music from "../../assets/img/MusicArt.png";

export default state => html`
  <section id="browse">
    <h2>Browse Artist Content</h2>
    <p>Explore a diverse range of artistic styles and creations.</p>
    <div id="artistsContainer"></div>
  </section>
  ${state.artists}
  ${state.artists
    .map(artist => {
      return `<tr><td>${artist.username}</td><td>${artist.medium}</td><td>${
        artist.experience
      }</td><td>${artist.description.join(" & ")}</td><td>${
        artist.email
      }</td></tr>`;
    })
    .join("")}
`;
