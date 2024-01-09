import html from "html-literal";

import ColorStatic from "../../assets/img/ColorStatic.gif";

export default state => html`
  <section id="home">
    <h1>Welcome to Artunia</h1>
    <img src=${ColorStatic} alt="ColorfulStatic" id="ColorfulStatic" />

    <h3>
      The weather in ${state.weather.city} is ${state.weather.description}.
      Temperature is ${state.weather.temp}F, and it feels like
      ${state.weather.feelsLike}F.
    </h3>

    <p>Discover amazing artworks and talented artists from around the world.</p>
    <p>Connecting with other talented artist has never been easier</p>
  </section>
`;
