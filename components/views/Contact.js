import html from "html-literal";
// import logo from "../../assets/img/ArtuniaLogo.png";

export default () => html`
  <body>
    <section class="form">
      <form action="https://formspree.io/f/xpzvapaa" method="POST">
        <label>
          Your email:
          <input type="email" name="email" />
        </label>

        <label>
          Your message:
          <textarea name="message"></textarea>
        </label>

        <!-- your other form fields go here -->
        <button type="submit">Send</button>
      </form>
    </section>
    <!-- <img id="logo" src=${logo} /> -->

    <footer>
      Thank you for reaching out.
    </footer>
  </body>
`;
