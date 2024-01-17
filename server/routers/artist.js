import { Router } from "express";
import multer from "multer";
import Artist from "../models/Artist.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Create Artist route
router.post("/", upload.single("image"), async (request, response) => {
  try {
    // Combining form data and image data
    const artistData = {
      ...request.body,
      image: {
        data: request.file.buffer,
        contentType: request.file.mimetype
      }
    };

    const newArtist = new Artist(artistData);
    await newArtist.save();
    response.status(201).json(newArtist);
  } catch (error) {
    console.log(error);
    if ("name" in error && error.name === "ValidationError") {
      return response.status(400).json(error.errors);
    }
    return response.status(500).json({ message: "Server error", error });
  }
});

// router.post("/", async (request, response) => {
//   try {
//     const newArtist = new Artist(request.body);

//     const data = await newArtist.save();

//     response.json(data);
//   } catch (error) {
//     // Output error to the console incase it fails to send in response
//     console.log(error);

//     if ("name" in error && error.name === "ValidationError")
//       return response.status(400).json(error.errors);

//     return response.status(500).json(error.errors);
//   }
// });

// router.post("/signup", async (req, res) => {
//   try {
//     const newArtist = await Artist.create(req.body);
//     res.status(201).json(newArtist);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// Get all Art route
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

// Get a single Art by ID
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
