import html from "html-literal";

import flyingDog from "../../assets/img/flyingDog.png";

export default () => html`
  <section id="browse-content">
    <h2>Browse Artist Content</h2>
    <p>Explore a diverse range of artistic styles and creations.</p>
    <div id="Gallery">
      <img src=${flyingDog} />
    </div>
  </section>
`;
