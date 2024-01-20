import { Router } from "express";
import Artist from "../models/Artist.js";

const router = Router();

router.post("/", async (request, response) => {
  try {
    const newArtist = new Artist(request.body);

    const data = await newArtist.save();

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    if ("name" in error && error.name === "ValidationError")
      return response.status(400).json(error.errors);

    return response.status(500).json(error.errors);
  }
});

// Get all Artist route
router.get("/", async (request, response) => {
  try {
    // Store the query params into a JavaScript Object
    const query = request.query; // Defaults to an empty object {}

    const data = await Artist.find(query);

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// Get a single Artist by ID
router.get("/:id", async (request, response) => {
  try {
    const data = await Artist.findById(request.params.id);

    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);

    return response.status(500).json(error.errors);
  }
});

// // Delete a pizza by ID
// router.delete("/:id", async (request, response) => {
//   try {
//     const data = await Artist.findByIdAndRemove(request.params.id, {});

//     response.json(data);
//   } catch (error) {
//     // Output error to the console incase it fails to send in response
//     console.log(error);

//     return response.status(500).json(error.errors);
//   }
// });

export default router;
