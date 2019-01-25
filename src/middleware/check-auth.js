const jwt = require('jsonwebtoken');

/**
 * This is a middleware to be inserted between all the requests that need to be authenticated.
 * I am using this in post, update and delete in postsRouts.js
 */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'secret_this_should_be_longer');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message: error.message});
    }
};