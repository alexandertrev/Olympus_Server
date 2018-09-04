const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register 
router.post('/register', (req, res, next) => {
    console.log(req.body)
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'user'
    });
    if (req.body.email == "admin@admin.com")
        newUser.role = "admin";

    console.log('Successful register attempt:----------------------------------------------- ');
    console.log(newUser);
    User.getUserByEmail(newUser.email, (err, user) => {
        if (err) throw err;
        if (user) {
            res.json({ success: false, error: 'Email already in use' });
        }
        else {
            User.addUser(newUser, (err, user) => {
                if (err) {
                    res.json({ success: false, error: 'Failed to register user' });
                }
                else {
                    res.json({ success: true, message: 'User registred' });
                }
            })
        }
    });
});

// Authenticate 
router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log("In authenticate function:" + email + ":" + password);

    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            console.log("wrong username")
            return res.json({ success: false, error: 'User not found' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 604800 // 1 week
                });
                console.log('Successful login attempt:----------------------------------------------- ');
                console.log(token);
                res.json({
                    success: true,
                    messages: ['You have been successfully logged in.'],
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                });
            }
            else {
                console.log("wrong password")
                return res.json({ success: false, error: 'Wrong password' });
            }
        });
    });
});

// Profile 
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

module.exports = router;