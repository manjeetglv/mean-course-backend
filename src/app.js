const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');

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


// Exporting the app, and then import in server.js
// After that I will make this app the listner of the apps
module.exports = app;
