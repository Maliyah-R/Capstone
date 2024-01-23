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
  <section id="artist">
    ${state.artists
      .map(artist => {
        return `<h1>${artist.username}</h1><br>${artist.medium}<br><h6>${artist.experience}</h6><br>${artist.description}<br>`;
      })
      .join("")}
  </section>
`;
