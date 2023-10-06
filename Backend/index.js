const express = require("express");
const connectDB = require("./connectDB");
const cors = require("cors");
require("dotenv").config();
const Book = require("./models/Books");

const app = express();
connectDB();
// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON data from requests
app.use(express.json());
app.use("/uploads", express.static("uploads"));


const PORT = process.env.PORT || 3000;


// default route
app.get('/', (req, res) => {
    res.send("Welcome To MERN Stack Project");
});
// creating a route
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


app.get('*', (req, res) => {
    res.sendStatus("404");
});


app.listen(PORT, () => {
    console.log(`App is listening to port http://localhost:${PORT}`);
});
