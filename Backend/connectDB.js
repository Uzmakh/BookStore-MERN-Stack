const mongoose = require("mongoose");
const { config } = require("dotenv");

config(); // Load environment variables from .env file

// copy the connection string from mongodb compass
const MONGODB_URI ="mongodb://127.0.0.1:27017/libraryManagementSystem";

// js promises
// promise => the value, that we don't know for  now, but we will know it in future
const connectToMongodb = () => {
    mongoose
        .connect(MONGODB_URI)
        // if promises fulfills
        .then(() => {
            console.log(`Connected to MongoDB at ${MONGODB_URI}`);
        })
        // if denies
        .catch((error) => {
            console.error(
                `Error connecting to MongoDB at ${MONGODB_URI}:`,
                error
            );
        });
};
module.exports = connectToMongodb;