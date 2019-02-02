const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/user.model');

exports.createUser = (req, res, next) => {
    // hash function takes the value you want to encrypt.
    // and the next parameter takes how deep encryption you want. Greater the number deeper is the encryption.
    // 10 is good enough.
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });

        console.log(user);
        user.save()
        .then(result => {
            res.status(201).json({
                message: 'User created',
                result: result
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                    message: "Invalid authentication credentials"
            });
        });
    });
};

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user) {
            throw Error('User Not Found');
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);

    }).then(result => {
        if(!result) {
            throw Error('User password is invalid');
        }
        // If User is Valid create a login token and send back the token to front end.
        const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, process.env.JWT_KEY, {expiresIn: '1h'});

            res.status(200).json({
                token: token,
                userId: fetchedUser._id,
                expiresIn: 1 * 60 * 60 * 1000
            });
    }).catch(err => {
        console.log(err);
        return res.status(401).json({
            message: err.message
        });
    });
};

