import html from "html-literal";

export default () => html`
  <section>
    <h1>Create Artist Profile</h1>
    <form id="createProfileForm">
      <div>
        <label for="medium">Medium:</label>
        <select name="medium" id="medium">
          <option value="">Choose Medium</option>
          <option value="Digital">Digital</option>
          <option value="Fiber">Fiber</option>
          <option value="Drawing">Drawing</option>
          <option value="Music">Music</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          id="otherField"
          name="otherField"
          style="display: none;"
          placeholder="Please specify"
        />
      </div>
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" />
      </div>
      <div>
        <label for="experience">Experience:</label>
        <textarea
          type="text"
          id="experience"
          name="experience"
          rows="5"
          cols="30"
          maxlength="300"
          placeholder="Tell the World About your Artistic Journey(300 Character Limit)"
        ></textarea>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          cols="50"
          maxlength="500"
          placeholder="Describe yourself or your art(500 Character Limit)"
        ></textarea>
        <span id="charCount"><br /></span>
      </div>
      <button type="submit">Share Artwork</button>
    </form>
  </section>
`;
