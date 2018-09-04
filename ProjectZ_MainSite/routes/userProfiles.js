const express = require('express');
const router = express.Router();
const config = require('../config/database');
const UserProfile = require('../models/userProfile');

router.post('/getUserProfiles', (req, res, next) => {
    console.log('Get user profiles attempt:----------------------------------------------- ');

    UserProfile.getProfilesByEmail(req.body.email, (err, profiles) => {
        if (err) {
            console.log(err);
            res.json({ success: false, msg: "Error accured" });
        }
        else {
            res.json({ success: true, answer: profiles });
        }

    });
});

module.exports = router;