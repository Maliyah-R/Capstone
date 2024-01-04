import html from "html-literal";

export default state => html`
  <section id="home">
    <h1>Welcome to Artunia</h1>

    <img
      src="ColorStatic.gif"
      id="temporaryImage"
      alt="Colorful static image"
    />

    <h3>
      The weather in ${state.weather.city} is ${state.weather.description}.
      Temperature is ${state.weather.temp}F, and it feels like
      ${state.weather.feelsLike}F.
    </h3>

    <p>Discover amazing artworks and talented artists from around the world.</p>
    <p>Connecting with other talented artist has never been easier</p>
  </section>
`;
