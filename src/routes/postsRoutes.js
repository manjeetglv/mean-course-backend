const express = require("express");
const checkAuth = require('../middleware/check-auth');

const router = express.Router();
const postsController = require('../controllers/postsController');
const extractFile = require('../middleware/filedata-multer');




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
router.post('', checkAuth, extractFile, postsController.addPost);

/**
 * UPDATE
 */ 
router.put( '/:id', checkAuth, extractFile, postsController.updatePost);

/**
 * DELETE
 */ 
router.delete('/:id', checkAuth, postsController.deletePost);


module.exports = router;