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
    req.body.imagePath = getImageUrl(req);
    if(req.body._id === null){
        req.body._id = undefined;
    }
    const post = new Post(req.body);
    post.save().then((createdPost) => {
        res.status(201).send(createdPost);
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


// GET - All posts 
router.get('',(req, res) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.currentPage;
    let fetchedPosts;


    const getPostsQuery = Post.find();
    if(pageSize && currentPage) {
        getPostsQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }

    // Query will not be executed untill then is called.
    getPostsQuery.then((documents => {
        this.fetchedPosts = documents;
        return Post.count();
        
    })).then(totalPosts => {
        res.status(200).json({
            posts: this.fetchedPosts,
            totalPosts: totalPosts 
        });
    });
    
});


// DELETE
router.delete('/:id',(req, res) => {
    Post.deleteOne({_id: req.params.id}).then(createdPost => {
        // console.log(createdPost); 
        res.status(200).json({message: createdPost});
    });
    
});

// UPDATE
router.put('/:id', multer({storage: storage}).single('image'), (req, res, next) => {
    const postId = req.params.id;
    const post = req.body;
    
    if(req.file){
        // console.log('------', post);
       post.imagePath =  getImageUrl(req);
    } 

    console.log('----Post Id ', postId);
    Post.updateOne({_id: postId}, post).then( createdPost => {
        // console.log(createdPost);
        res.status(200).json(createdPost);
    });
});


module.exports = router;

function getImageUrl(req) {
    const url = req.protocol + '://' + req.get('host');
    const finalUrl = url + '/images/' + req.file.filename;
    return finalUrl;
}
