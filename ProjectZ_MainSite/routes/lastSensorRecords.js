const express = require('express');
const router = express.Router();
const config = require('../config/database');
const LastSensorRecord = require('../models/lastSensorRecord');
const SensorRecord = require('../models/sensorRecord');

// Add LastSensorRecord 
router.post('/add', (req, res, next) => {
    console.log('Add last record attempt:----------------------------------------------- ');

    let newSensorRecord = new SensorRecord({
        date: Date.now(),
        water_level: req.body.water_lvl,
        moist: req.body.moist,
        heat: req.body.heat,
        sun: req.body.light,
        doors: req.body.doors,
        lamp: req.body.lamp,
        mac: req.body.mac,
    });

    let newLastSensorRecord = new LastSensorRecord({
        date: Date.now(),
        water_level: req.body.water_lvl,
        moist: req.body.moist,
        heat: req.body.heat,
        sun: req.body.light,
        doors: req.body.doors,
        lamp: req.body.lamp,
        mac: req.body.mac,
    });

    if (req.body.whole_hour) {
        console.log('Timed save, saving sensor record...')
        SensorRecord.addSensorRecord(newSensorRecord, (err, sensorRecord) => {
            if (err) {
                console.log(err);
            }
        });
    }

    LastSensorRecord.addLastSensorRecord(newLastSensorRecord, (err, sensorRecord) => {
        if (err) {
            console.log(err);
            res.json({ success: false, msg: err });
        }
        else {
            console.log("Last sensors record added successfuly");
            res.json({ success: true, message: 'SensorRecord been added' });
        }
    });
});

router.post('/getLastSensorRecord', (req, res, next) => {
    console.log('getLastSensorRecord attempt:----------------------------------------------- ');

    LastSensorRecord.getLastSensorRecord(req.body.mac, (err, result) => {
        if (err) {
            res.json({ success: false, msg: err });
        }
        else {
            res.json({ success: true, answer: result });
        }
    });
});

module.exports = router;