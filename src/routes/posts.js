const express = require("express");

const router = express.Router();
const Post = require('../model/post.model');

// POST
router.post('', (req, res, next) => {

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