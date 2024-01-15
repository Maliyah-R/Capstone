import html from "html-literal";

import flyingDog from "../../assets/img/flyingDog.png";
import PanCakes from "../../assets/img/Pancakes.png";
import ppAnime from "../../assets/img/powerPuffAnime.png";
import wild from "../../assets/img/Wilderness.png";

export default () => html`
  <section id="browse-content">
    <h2>Browse Artist Content</h2>
    <p>Explore a diverse range of artistic styles and creations.</p>
    <div class="Gallery">
      <img src=${flyingDog} class="dog" />
      <img src=${PanCakes} class="Photo" />
      <img src=${ppAnime} class="Photo" />
      <img src=${wild} class="Photo" />
    </div>
  </section>
`;
