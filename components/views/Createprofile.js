import html from "html-literal";

export default () => html`
  <section>
    <h1>Create Artist Profile</h1>
    <form id="createProfileForm" enctype="multipart/form-data">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          cols="50"
          maxlength="500"
          placeholder="Describe yourself or your art"
        ></textarea>
        <span id="charCount" style="float: right; font-size: small;"
          >500 characters remaining</span
        >
      </div>

      <div>
        <label for="image">Artwork Image:</label>
        <input type="file" id="image" name="image" accept="image/*" required />
      </div>
      <button type="submit">Share Artwork</button>
    </form>
  </section>
`;
