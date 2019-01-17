const express = require("express");

const router = express.Router();
const Post = require('../model/post.model');
const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

// Configure multer to store data.
const storage = multer.diskStorage({
    // destination is the function which will be executed whenever multer tries to save the file.
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if(isValid) {
            error = null;
        }
        cb(error, 'images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});


// POST
// Using the multer as a new middleware to extract the files.
// .single('image') means it will try to extract one file on image property of the request object.
router.post('', multer({storage: storage}).single('image'), (req, res, next) => {

    if(req.body._id === null){
        req.body._id = undefined;
    }
    const post = new Post(req.body);
    post.save().then((result) => {
        res.status(201).send(result);
    });
});

// GET - Single post
router.get('/:id', (req, res) => {
    Post.findById(req.params.id).then(post => {
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json("post not found");
        }
    });
});

// GET
router.get('',(req, res) => {
    Post.find()
    .then((documents => {
        // console.log('Documents: ', documents);
        res.status(200).json(documents);
    }));
    
});

// DELETE
router.delete('/:id',(req, res) => {
    console.log('Id: ',req.params.id);
    Post.deleteOne({_id: req.params.id}).then(result => {
        // console.log(result); 
        res.status(200).json({message: result});
    });
    
});

// UPDATE
router.put('/:id', (req, res, next) => {
    const postId = req.body._id;
    const post = req.body;

    Post.updateOne({_id: postId}, post).then( result => {
        // console.log(result);
        res.status(200).json(result);
    });
});


module.exports = router;