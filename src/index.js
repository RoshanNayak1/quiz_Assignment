require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const quizRoutes = require('./routes/quizRoutes');

const rateLimit = require('express-rate-limit');




const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use('/quizzes', quizRoutes);

mongoose.connect('mongodb+srv://roshan:roshan@cluster0.yz8is3g.mongodb.net/quizs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Database connection error:', err);
});


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// At the end of your index.js
const cronJob = require('./utils/cronJobs');
cronJob.start();
