import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import RegistrationModel from './submission.js';
import dotenv from "dotenv";

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json());

dotenv.config({ path: './.env' });

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.psph3.mongodb.net/registration?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB Atlas', err);
    });

app.post('/api/register', async (req, res) => {
    console.log('Received registration data:', req.body); // Log received data
    try {
        const registration = new RegistrationModel(req.body);
        await registration.save();
        res.status(201).send('Registration successful');
    } catch (error) {
        console.error('Error saving registration:', error);
        res.status(400).send('Registration failed');
    }
});

function runServer() {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

export default runServer;
