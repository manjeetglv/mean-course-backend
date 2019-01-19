const express = require("express");
const bcrypt = require('bcrypt');

const User = require('../model/user.model');
const router = express.Router();

router.post('/signup', (req, res, next) => {
    // hash function takes the value you want to encrypt.
    // and the next parameter takes how deep encryption you want. Greater the number deeper is the encryption.
    // 10 is good enough.
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: req.body.pasword
        });

        user.save()
        .then(result => {
            res.status(201).json({
                message: 'User created',
                result: result
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        })
    });
});

module.exports = router;