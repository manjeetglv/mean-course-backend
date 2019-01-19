const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const postRoutes = require('./routes/postsRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connnect to DB
mongoose.connect('mongodb+srv://mongodb:kEcgSRxg0puyBsRz@meancourse-app-6a2je.mongodb.net/mean-course-db?retryWrites=true', { useNewUrlParser: true })
.then(() => {
    console.log('Connected to MongoDB');
}).catch(() => {
    console.log('Connection Failed');
});


// Body parser;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('images')));

function allowCrossDomain() {
    return function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    };
}

app.use(allowCrossDomain());
// app.use(postRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);



// Exporting the app, and then import in server.js
// After that I will make this app the listner of the apps
module.exports = app;
