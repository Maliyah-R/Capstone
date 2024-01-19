import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Artist from "./routers/artist.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

mongoose.connect(process.env.MONGODB, {
  // Configuration options to remove deprecation warnings, just include them to remove clutter
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

const PORT = process.env.PORT || 4040;

// CORS Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

// Logging Middleware
const logging = (request, response, next) => {
  console.log(
    `${request.method} ${request.url} ${new Date().toLocaleString("en-us")}`
  );
  next();
};

app.use(cors);
app.use(express.json());
app.use(logging);
app.use("/api/artists", Artist);

// NOTE: MIDDLEWARE GOES BEFORE THE CREATION OF THE ROUTES

// Artist Profile Routes

// Add Route for Creating Artist Profiles

app.post("/api/artist/create", upload.single("image"), async (req, res) => {
  try {
    const artistData = {
      username: req.body.username,
      medium: req.body.medium,
      email: req.body.email,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    };

    // Mongoose model for Artist
    const newArtist = new Artist(artistData);
    await newArtist.save();
    res.status(201).send("Artist profile created successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating artist profile.");
  }
});

// app.post("/api/artist/create", upload.single("image"), async (req, res) => {
//   try {
//     //  req.body contains other artist data like username, medium, etc.
//     const artistData = req.body;

//     // req.file is the file uploaded via Multer, stored in memory
//     if (req.file) {
//       const file = req.file.buffer; // Buffer containing file data

//       // Create a new Artist document including the file data
//       const newArtist = new Artist({
//         ...artistData,
//         fileData: file // Storing the file as a binary field
//       });

//       await newArtist.save(); // Save the artist document to MongoDB

//       res.status(201).json({ message: "Artist profile created successfully" });
//     } else {
//       res.status(400).json({ message: "No file uploaded" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error creating artist profile", error });
//   }
// try {
//   // Process the file or upload it to cloud storage, etc.
//   // For example, upload to cloud storage and get the URL

//   const imageUrl = await uploadToCloud(req.file); // Hypothetical function

//   const artistData = {
//     ...req.body,
//     image: imageUrl // URL from cloud storage
//   };

//   const newArtist = new Artist(artistData);
//   await newArtist.save();
//   res.status(201).json(newArtist);
// } catch (error) {
//   res.status(400).json({ message: "Error saving artist profile", error });
// }
// try {
//   const newArtist = new Artist(req.body);
//   await newArtist.save();
//   res.status(201).json({
//     message: "Artist profile created successfully",
//     artist: newArtist
//   });
// } catch (error) {
//   res.status(400).json({ message: "Error saving artist profile", error });
// }

// Add Route for Retrieving Artist Profiles
app.get("/browse", async (req, res) => {
  try {
    const artists = await Artist.find({}); // Fetch data using Mongoose
    res.render("browse", { artists }); // Render the EJS template with data
  } catch (error) {
    res.status(500).send("Error occurred");
  }
});
// app.get("/api/artist/browse", upload.single("image"), async (req, res) => {
//   try {
//     const artists = await Artist.find({});
//     res.json(artists);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving artists", error });
//   }
// });

// Request handlers go here
app.get("/status", (request, response) => {
  response.send(JSON.stringify({ message: "Service healthy" }));
});
// Handle the request with HTTP GET method with query parameters and a url parameter
app.get("/weather/:city", (request, response) => {
  // Express adds a "params" Object to requests that has an matches parameter created using the colon syntax
  const city = request.params.city;

  // Set defaults values for the query string parameters
  let cloudy = "clear";
  let rainy = false;
  let lowTemp = 32;
  // check if the request.query.cloudy attribute exists
  if ("cloudy" in request.query) {
    // If so update the variable with the query string value
    cloudy = request.query.cloudy;
  }
  if ("rainy" in request.query && request.query.rainy === "true") {
    rainy = request.query.rainy;
  }
  if ("lowtemp" in request.query) {
    lowTemp = Number(request.query.lowtemp);
  }

  // Generate a random number to use as the temperature
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
  const min = 70;
  const max = 90;
  const temp = Math.floor(Math.random() * (max - min + 1) + min);
  // handle GET request for weather with an route parameter of "city"
  response.json({
    text: `The weather in ${city} is ${temp} degrees today.`,
    cloudy: cloudy,
    // When the key and value variable are named the same you can omit the value variable
    rainy,
    temp: {
      current: temp,
      low: lowTemp
    },
    city
  });
});

app.listen(PORT, () => console.log("Listening on port 4040"));
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
