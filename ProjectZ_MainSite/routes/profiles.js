const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Profile = require('../models/profile');

// Add profile 
router.post('/add', (req, res, next) => {
    console.log('Add profile attempt:----------------------------------------------- ');

    let newProfile = new Profile({
        profileName: req.body.name,
        addedBy: req.body.email,
        plant: req.body.plant,
        sunNeeds: req.body.sunNeeds,
        heatMin: req.body.heatMin,
        heatMax: req.body.heatMax,
        moistMin: req.body.moistMin,
        moistMax: req.body.moistMax,
    });


    Profile.addProfile(newProfile, (err, profile) => {
        if (err) {
            console.log("-------------------Err-------------------")
            console.log(err);
            console.log("-------------------Err-------------------")

            res.json({ success: false, msg: err });
        }
        else {
            console.log("success");       
            res.json({ success: true, message: 'Profile been added' });
        }
    });
});

router.post('/getSystemProfile', (req, res, next) => {
    console.log('getSystemProfile attempt:----------------------------------------------- ');
    Profile.getSystemProfile(req.body.plantName, (err, result) => {
        if (err) {
            res.json({ success: false, msg: err });
        }
        else {
            res.json({ success: true, answer: result });
        }
    });
});

router.post('/getProfilesByEmail', (req, res, next) => {
    console.log('Get profiles by email attempt:----------------------------------------------- ');
    Profile.getProfilesByEmail(req.body.email, (err, result) => {
        if (err) {
            res.json({ success: false, msg: err });
        }
        else {
            res.json({ success: true, answer: result });
        }
    });
});

module.exports = router;