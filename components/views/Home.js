import html from "html-literal";

import colorStatic from "../../assets/img/ColorStatic.gif";

export default state => html`
  <section id="home">
    <h3>
      The weather in ${state.weather.city} is ${state.weather.description}.
      Temperature is ${state.weather.temp}F, and it feels like
      ${state.weather.feelsLike}F.
    </h3>

    <p>Discover amazing artworks and talented artists from around the world.</p>
    <p>Connecting with other talented artist has never been easier</p>
  </section>
`;
