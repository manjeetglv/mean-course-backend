const jwt = require('jsonwebtoken');

/**
 * This is a middleware to be inserted between all the requests that need to be authenticated.
 * I am using this in post, update and delete in postsRouts.js
 */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // jwt.verify verify the token and returns the decodedToken.
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = {email: decodedToken.email, userId: decodedToken.userId};
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "You are not authenticated user"});
    }
};