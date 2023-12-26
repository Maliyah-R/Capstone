import html from "html-literal";

export default links => html`
  <nav>
    <i class="fas fa-bars"></i>
    <ul class="hidden--mobile nav-links">
      ${links
        .map(
          link =>
            `<li><a href="/${link.title}" title="${link.title}" data-navigo>${link.text}</a></li>`
        )
        .join("")}
    </ul>
  </nav>
`;

// export default () => html`
//   <nav>
//     <ul>
//       <li><a href="#home" href="index.html">Home</a></li>
//       <li><a href="Create.html">Create Profile</a></li>
//       <li><a href="#browse-content">Browse Content</a></li>
//       <li><a href="#events">Events</a></li>
//     </ul>
//   </nav>
// `;
