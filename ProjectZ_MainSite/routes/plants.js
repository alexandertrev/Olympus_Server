const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Plant = require('../models/plant');
const Profile = require('../models/profile');

// Add plant 
router.post('/add', (req, res, next) => {
    console.log('Add plant attempt:----------------------------------------------- ');

    let newPlant = new Plant({
        plantName: req.body.name,
        plantFamily: req.body.plantFamily,
        pic: req.body.pic,
        info: req.body.info
    });

    
    Plant.addPlant(newPlant, (err, plant) => {
        if (err) {
            console.log("-------------------Err-------------------")
            console.log(err);
            console.log("-------------------Err-------------------") 

            res.json({ success: false, msg: err });
        }
        else {
            console.log("success")

            let newProfile = new Profile({
                profileName: req.body.name,
                plant: plant._id,
                addedBy: "system",
                sunNeeds: req.body.sunNeeds,
                heatMin: req.body.heatMin,
                heatMax: req.body.heatMax,
                moistMin: req.body.moistMin,
                moistMax: req.body.moistMax,
            });

            Profile.addProfile(newProfile, (err, profile) => {
                if (err) {
                    res.json({ success: false, msg: err });
                }
                else {
                    res.json({ success: true, message: 'Plant been added' });
                }
            })
        }
    });
});

router.get('/get', (req, res, next) => {
    console.log('Get all plants attempt:----------------------------------------------- ');
    Plant.getAllPlants((err, result) => {
        if (err) {
            res.json({ success: false, msg: err });
        }
        else {
            res.json({ success: true, answer: result });
        }
    });
});

router.post('/getPlantsByFamily', (req, res, next) => {
    console.log('Get by family name attempt:----------------------------------------------- ');
    familyName = req.body.familyName;

    Plant.getPlantsByName(familyName, (err, result) => {
        if (err) {
            res.json({ success: false, msg: err });
        }
        else {
            res.json({ success: true, answer: result });
        }
    });
});
module.exports = router;