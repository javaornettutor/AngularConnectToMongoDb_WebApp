const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
var DBName = "BookStore";
// MongoDB connection
mongoose.connect("mongodb://localhost:27017/" + DBName, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Example Schema and Model
const ItemSchema = new mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
  genre: [],
  rating: Number,
});

const Item = mongoose.model("Book", ItemSchema);

// Routes
app.get("/books", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/addBook", async (req, res) => {
  const newItem = new Item(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete Post by Title API
app.delete("/deleteBook", async (req, res) => {
  const { title } = req.query; // Get title from query string

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const postsCollection = db.collection("books");

    const result = await postsCollection.deleteOne({ title });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
