const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('First middleware');
    next();
});

app.use((req, res) => {
    res.send('Hello from express!');
});

// Exporting the app, and then import in server.js
// After that I will make this app the listner of the apps
module.exports = app;