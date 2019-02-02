const Post = require('../model/post.model');



/**
 * Get Single post 
 */
 exports.getSinglePost = (req, res) => {
    Post.findById(req.params.id).then(post => {
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json("post not found");
        }
    });
};

/**
 * Get all posts
 */
exports.getAllPosts = (req, res) => {
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
    
};

/**
 * Add a post
 */
exports.addPost = (req, res, next) => {
    req.body.imagePath = getImageUrl(req);
    if(req.body._id === null){
        req.body._id = undefined;
    }
    // console.log(req.userData);
    // req.userData to req.body so that we can directly assign req.body to Post()
    req.body.creator = req.userData.userId;
    const post = new Post(req.body);
    post.save().then((createdPost) => {
        res.status(201).json(createdPost);
    }).catch(error => {
        res.status(500).json({
            message: "Creating a post failed"
        })
    });
};

/**
 * Upadate a post.
 */
exports.updatePost = (req, res, next) => {
    const postId = req.params.id;
    const post = req.body;
    
    if(req.file){
       post.imagePath =  getImageUrl(req);
    } 

    // Add creator in query to restrict unauthorized user from modifying data
    Post.updateOne({_id: postId, creator: req.userData.userId}, post).then( result => {
        if (result.n > 0) {
            res.status(200).json({message: 'Updated Successfully'});
        } else {
            res.status(401).json({message: 'Not Authorized'});
        }
    }).catch (error => {
        res.status(500).json({
            message: "Could not update the post"
        });
    });
    
};

/**
 * Delete a post
 */
exports.deletePost = (req, res) => {

    // Add creator in query to restrict unauthorized user from deleting data
    Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
       
        if (result.n > 0) {
            res.status(200).json({message: 'Updated Successfully'});
        } else {
            res.status(401).json({message: 'Not Authorized'});
        }
    }).catch (error => {
        res.status(500).json({
            message: "Could not delete the post"
        });
    });
};

function getImageUrl(req) {
    const url = req.protocol + '://' + req.get('host');
    const finalUrl = url + '/images/' + req.file.filename;
    return finalUrl;
}

