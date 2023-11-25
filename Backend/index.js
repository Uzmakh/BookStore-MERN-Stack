require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const connectToMongodb = require("./connectDB");
const Book = require("./models/Book.models");

const app = express();

connectToMongodb();
// Middlewares
app.use(cors());
// Middleware to parse JSON data from requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// to display the images.thumbnails on browser
app.use("/uploads", express.static("uploads"));


const PORT = process.env.PORT || 8000;

// Images stored on our server, using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });



// creating a route (for selected category)
app.get("/api/books", async (req, res) => {
  try {
    const category = req.query.category;
    const filter = {};
    if (category) {
      filter.category = category;
    }
    const data = await Book.find(filter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." })
  }
})

// API-route to a singleBook details page,
app.get("/api/books/:slug", async (req, res) => {
  try {
    const slugParam = req.params.slug;
    const data = await Book.find({ slug: slugParam });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." })
  }
})

// to add a new book
app.post("/api/books", upload.single('thumbnail'), async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      slug: req.body.slug,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category,
      thumbnail: req.file.filename,
    });

    await newBook.save();
    res.status(201).json({ message: "Book created successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the book" });
  }
});


//  to update an existing book
app.put("/api/books", upload.single("thumbnail"), async (req, res) => {
  try {
    const bookId = req.body.bookId;

    const updateBook = {
      title: req.body.title,
      slug: req.body.slug,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category,
    };

    if (req.file) {
      updateBook.thumbnail = req.file.filename;
    }
    await Book.findByIdAndUpdate(bookId, updateBook);
    res.status(201).json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the book" });
  }
});

//  to delete an existing book
app.delete("/api/books/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    await Book.deleteOne({ _id: bookId });
    res.json("Book deleted!" + req.body.bookId);
  } catch (error) {
    res.json(error);
  }

});

app.listen(PORT, () => {
  console.log(`App is listening to port http://localhost:${PORT}`);
});
