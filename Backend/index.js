const express = require("express");
const connectDB = require("./connectDB");
const cors = require("cors");
require("dotenv").config();


const app = express();
connectDB();
// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON data from requests
app.use(express.json());


const PORT = process.env.PORT || 3000;


// default route
app.get('/', (req, res) => {
    res.send("Welcome To MERN Stack Tutorial");
});


app.listen(PORT, () => {
    console.log(`App is listening to port http://localhost:${PORT}`);
});
