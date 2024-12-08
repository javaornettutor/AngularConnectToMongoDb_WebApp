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
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
  genre: [],
  rating: Number,
});

const Item = mongoose.model("Book", bookSchema);

// Routes
app.get("/books", async (req, res) => {
  console.log("get books");
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/addBook", async (req, res) => {
  const newItem = new Item(req.body);
  console.log("add a book");
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete Post by Title API
app.delete("/deleteBook/:title", async (req, res) => {
  const deleteTitleText = req.params.title.trim();
  console.log("test me delete", deleteTitleText);
  try {
    console.log("in try");
    const book = await Item.find({ title: deleteTitleText });

    console.log("after result");
    if (book.length === 0) 
    {
      console.log("Book not found");
      res.status(404).json({ message: "Book not found" });
    }
    else
    {
      const postsCollection = db.collection("books");
      const deleteResult = await postsCollection.deleteMany({
        title: deleteTitleText,
      });
      res.status(200).json({ message: "Book deleted successfully" });
      console.log("Book deleted successfully'");
    }
  } catch (error) {
    console.log("error");
    res.status(500).json({ message: "Server error", error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
