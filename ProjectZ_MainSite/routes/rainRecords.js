const express = require('express');
const router = express.Router();
const config = require('../config/database');
const RainRecord = require('../models/rainRecord');

// Add RainRecord 
router.post('/add', (req, res, next) => {
    console.log('Add record attempt:----------------------------------------------- ');

    let newRainRecord = new RainRecord({
        Date: req.body.date,
        start: req.body.start,
        end: req.body.end,
        mac: req.body.mac,
    });


    RainRecord.addRainRecord(newRainRecord, (err, rainRecord) => {
        if (err) {
            console.log("-------------------Err-------------------")
            console.log(err);
            console.log("-------------------Err-------------------")

            res.json({ success: false, msg: err });
        }
        else {
            console.log("success");
            res.json({ success: true, message: 'RainRecord been added' });
        }
    });
});

router.post('/getLastRainRecord', (req, res, next) => {
    console.log('getLastRainRecord attempt:----------------------------------------------- ');
    SensorSecord.getLastRainRecord(req.body.mac, (err, result) => {
        if (err) {
            res.json({ success: false, msg: err });
        }
        else {
            res.json({ success: true, answer: result });
        }
    });
});

module.exports = router;