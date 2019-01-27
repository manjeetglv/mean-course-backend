const express = require("express");
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();
const postsController = require('../controllers/postsController');



const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

/** 
 *  Configure multer to store data.
 */
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

/**
 * GET - Single post
 */
router.get('/:id', postsController.getSinglePost);


/**
 *  GET - All posts 
 */ 
router.get('', postsController.getAllPosts);


/**
 *  POST
 *  Using the multer as a new middleware to extract the files.
 *  .single('image') means it will try to extract one file on image property of the request object.
 */
router.post(
    '',
    checkAuth, 
    multer({storage: storage}).single('image'), 
    postsController.addPost);


/**
 * UPDATE
 */ 
router.put( '/:id', checkAuth, multer({storage: storage}).single('image'), 
    postsController.updatePost);

/**
 * DELETE
 */ 
router.delete('/:id', checkAuth, postsController.deletePost);


module.exports = router;