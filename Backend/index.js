import express from "express";
import { PORT, MONGODB_URI } from "./config.js";
import mongoose from 'mongoose';

const app = express();

// MongoDB connection
import { connect } from 'mongodb';
connect(MONGODB_URI)

    .then(client => {
        console.log('Connected to MongoDB');
        const db = client.db();
        // Access your database using client.db()

        // ... Rest of your code here
    });

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome To MERN Stack Tutorial');
});

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });