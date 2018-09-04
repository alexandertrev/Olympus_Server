const express = require('express');
const router = express.Router();
const config = require('../config/database');
const WaterSession = require('../models/waterSession');

// Add WaterRecord 
router.post('/start', (req, res, next) => {
    console.log('Start water session attempt:----------------------------------------------- ');

    let newSession = new WaterSession({
        date: Date.now(),
        mac: req.body.mac,
    });
    WaterSession.isWaterSessionInProgress(req.body.mac, (answer) => {
        if (answer) {
            res.json({ success: false, message: 'Scheduled Watering session already in progress, please wait.' });
        }
        else {
            WaterSession.startSession(newSession, (err, session) => {
                if (err) throw err
                res.json({ success: true, message: 'Water session started' });
            });
        }
    });
});

router.post('/end', (req, res, next) => {
    console.log('End water session attempt:----------------------------------------------- ');

    WaterSession.endSession(req.body.mac, (err, success) => {
        if (err) {
            console.log(err)
            res.json({ success: false, message: 'Error occurred!' })
        }
        res.json({ success: true, message: 'Water session ended'})
    })
});

module.exports = router;