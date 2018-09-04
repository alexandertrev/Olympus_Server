const express = require('express');
const router = express.Router();
const config = require('../config/database');
const SensorRecord = require('../models/sensorRecord');

//// Add SensorRecord 
//router.post('/add', (req, res, next) => {
//    console.log('Add record attempt:----------------------------------------------- ');
//    console.log('Is doors open:' + req.body.doors)
//    let newSensorRecord = new SensorRecord({
//        date: Date.now(),
//        water_level: req.body.water_lvl,
//        moist: req.body.moist,
//        heat: req.body.heat,
//        sun: req.body.light,
//        doors: req.body.doors,
//        mac: req.body.mac,
//    });

//    SensorRecord.addSensorRecord(newSensorRecord, (err, sensorRecord) => {
//        if (err) {
//            console.log(err);
//            res.json({ success: false, msg: err });
//        }
//        else {
//            console.log("success");
//            res.json({ success: true, message: 'SensorRecord been added' });
//        }
//    });
//});

//router.post('/getLastSensorRecord', (req, res, next) => {
//    console.log('getLastSensorRecord attempt:----------------------------------------------- ');
//    SensorRecord.getLastSensorRecord(req.body.mac, (err, result) => {
//        if (err) {
//            res.json({ success: false, msg: err });
//        }
//        else {
//            res.json({ success: true, answer: result });
//        }
//    });
//});

router.post('/getAllSensorRecord', (req, res, next) => {
    console.log('getAllSensorRecord attempt:----------------------------------------------- ');

    SensorRecord.getAllSensorRecord(req.body.mac, (err, result) => {
        if (err) {
            res.json({ success: false, msg: err });
        }
        else {
            res.json({ success: true, answer: result });
        }
    });
});

module.exports = router;