import html from "html-literal";

// import colorStatic from "../../assets/img/ColorStatic.gif";

export default state => html`
  <section id="home">
    <header>
      The weather in ${state.weather.city} is ${state.weather.description}.
      Temperature is ${state.weather.temp}F, and it feels like
      ${state.weather.feelsLike}F.
    </header>

    <section id="introduction">
      <h2>Discover. Connect. Create.</h2>
      <p>
        Welcome to Artunia, the ultimate platform for artists of all genres to
        find, connect, and collaborate. Whether you're a painter, sculptor,
        digital artist, or anything in between, Artunia is your space to explore
        and expand your artistic horizons.
      </p>
    </section>

    <section id="find-your-match">
      <h3>Find Your Artistic Match</h3>
      <p>
        Our unique matching system helps you discover artists who share your
        style, interests, and creative goals. Browse profiles, view portfolios,
        and connect with artists who resonate with your artistic vision.
      </p>
    </section>

    <section id="collaborate">
      <h3>Collaborate and Grow</h3>
      <p>
        Collaboration is at the heart of Artunia. Engage in exciting projects,
        share ideas, and work together to create something truly remarkable.
        With Artunia, no artist is an island.
      </p>
    </section>

    <section id="showcase">
      <h3>Showcase Your Work</h3>
      <p>
        Create your personal portfolio and showcase your artwork to a community
        that appreciates and understands your passion. Receive feedback, gain
        exposure, and find inspiration in the works of fellow artists.
      </p>
    </section>

    <section id="community">
      <h3>Join a Community of Creators</h3>
      <p>
        Artunia is more than just a platform; it's a community. Participate in
        discussions, attend virtual workshops, and connect with peers from
        around the world. Here, you're part of a global network of creativity
        and innovation.
      </p>
    </section>

    <section id="resources">
      <h3>Stay Inspired and Informed</h3>
      <p>
        With Artunia, inspiration is always at your fingertips. Access a wealth
        of resources, tutorials, and articles to keep your creative juices
        flowing. Stay informed about the latest trends, techniques, and
        opportunities in the art world.
      </p>
    </section>
  </section>
`;
