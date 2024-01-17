import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },
  medium: {
    type: String,
    required: true,
    enum: ["Music", "Digital", "Fiber", "Drawing", "Other"]
  },
  email: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9.]+@[a-zA-Z0-9.]*$/
  },
  // description: {
  //   type: String,
  //   required: true,
  //   validate: /^[A-Za-z0-9 ]*$/
  // },
  // experience: {
  //   type: String,
  //   required: false,
  //   validate: /^[A-Za-z0-9 ]*$/
  // },
  image: {
    type: String,
    required: true
  }
  //,
  // toppings: [String],
  // order: { type: mongoose.Schema.Types.ObjectId, ref: "Connect" }
});

const artistProfile = mongoose.model("Artist", artistSchema);

export default artistProfile;
