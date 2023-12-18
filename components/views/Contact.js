import html from "html-literal";

export default () => html`
<body>
    <header>
        <h1>Contact Us</h1>
    </header>
    <nav>
    <a href="About.html">About Us</a>
    </nav>
    <section>
        <section class = "form"
        action="https://formspree.io/f/xpzvapaa"
        method="POST">
        <label>
            Your email:
            <input type="email" name="email">
        </label>
    </section>

    <section>
        <label>
            Your message:
            <textarea name="message"></textarea>
        </label>
        <!-- your other form fields go here -->
        <button type="submit">Send</button>
        </form>
    </section>


    <footer>
        Thank you for reaching out.
    </footer>
</body>
`;
