const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Body parser;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

function allowCrossDomain() {
    return function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    };
}

app.use(allowCrossDomain());

app.post("/api/posts", (req, res, next) => {
    console.log(req.body);
    res.status(201).send();
})
app.get('/api/posts',(req, res) => {
    const posts = [
        {
            id: "id1",
            title: "First server-side post",
            content: "This is comming from server"
        },
        {
            id: "id2",
            title: "Second server-side post",
            content: "This is comming from server"
        },
        {
            id: "id3",
            title: "Third server-side post",
            content: "This is comming from server"
        },
        {
            id: "id4",
            title: "Fourth server-side post",
            content: "This is comming from server"
        },
        {
            id: "id5",
            title: "Fifth server-side post",
            content: "This is comming from server"
        }
    ];

    res.status(200).json(posts);
});

// Exporting the app, and then import in server.js
// After that I will make this app the listner of the apps
module.exports = app;

