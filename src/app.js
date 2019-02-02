const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const postRoutes = require('./routes/postsRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connnect to DB
mongoose.connect('mongodb+srv://mongodb:' + process.env.MONGO_ATLAS_PW + '@meancourse-app-6a2je.mongodb.net/mean-course-db?retryWrites=true', { useNewUrlParser: true })
.then(() => {
    console.log('Connected to MongoDB');
}).catch(() => {
    console.log('Connection Failed');
});


// Body parser;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join(__dirname, 'images')));
// Add the dist folder content using ng build --prod command. And then uncomment the follwing line for interated app deployment.
// app.use(express.static(path.join(__dirname, 'angular')));

function allowCrossDomain() {
    return function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
        next();
    };
}

app.use(allowCrossDomain());
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

// Add the dist folder content using ng build --prod command. And then uncomment the follwing line for interated app deployment.
// app.use((req, res, next) => {
//     const indexFile = path.join(__dirname, 'angular', 'index.html');
//     console.log('Index file Path ', req.originalUrl);
//     res.sendFile(indexFile);
// });



// Exporting the app, and then import in server.js
// After that I will make this app the listner of the apps
module.exports = app;
