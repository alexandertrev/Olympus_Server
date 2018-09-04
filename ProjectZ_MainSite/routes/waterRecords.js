const express = require('express');
const router = express.Router();
const config = require('../config/database');
const WaterRecord = require('../models/waterRecord');

// Add WaterRecord 
router.post('/add', (req, res, next) => {
    console.log('Add water record attempt:----------------------------------------------- ');

    let newWaterRecord = new WaterRecord({
        Date: Date.now(),
        amount: req.body.amount,
        mac: req.body.mac,
    });

    WaterRecord.addWaterRecord(newWaterRecord, (err, waterRecord) => {
        if (err) {
            console.log(err);
            res.json({ success: false, msg: err });
        }
        else {
            console.log("success");
            res.json({ success: true, message: 'WaterRecord been added' });
        }
    });
});

router.post('/getLastWaterRecord', (req, res, next) => {
    console.log('getLastWaterRecord attempt:----------------------------------------------- ');
    WaterRecord.getLastWaterRecord(req.body.mac, (err, result) => {
        if (err) {
            res.json({ success: false, msg: err });
        }
        else {
            res.json({ success: true, answer: result });
        }
    });
});

router.post('/getAllSensorRecord', (req, res, next) => {
    console.log('getAllSensorRecord attempt:----------------------------------------------- ');

    WaterRecord.getAllSensorRecord(req.body.mac, (err, result) => {
        if (err) {
            res.json({ success: false, msg: err });
        }
        else {
            res.json({ success: true, answer: result });
        }
    });
});

module.exports = router;