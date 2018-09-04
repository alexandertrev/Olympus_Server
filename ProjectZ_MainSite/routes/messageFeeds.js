const express = require('express');
const router = express.Router();
const config = require('../config/database');
const MessageFeed = require('../models/messageFeed');
const Device = require('../models/device');
const UserDevice = require('../models/userDevice');

// Add message feed 
router.post('/add', (req, res, next) => {
    console.log('Add record attempt:----------------------------------------------- ');

    Device.getDeviceByMac(req.body.mac, (err, device) => {
        if (err) throw err
        UserDevice.getByDeviceId(device._id, (err, userDevice) => {
            if (err) throw err
            let newMessageFeed = new MessageFeed({
                device: device._id,
                email: userDevice.linkedTo,
                date: Date.now(),
                mac: req.body.mac,
                message: req.body.message
            });
            MessageFeed.addMessageFeed(newMessageFeed, (err, message) => {
                if (err) {
                    console.log(err);
                    res.json({ success: false, msg: err });
                }
                else {
                    console.log("success");
                    res.json({ success: true, message: 'Message has been added' });
                }
            });
        });
    });
});

router.post('/getMessagesByEmail', (req, res, next) => {
    console.log('Get messages by email attempt:----------------------------------------------- ');

    MessageFeed.getMessagesByEmail(req.body.email, (err, result) => {
        if (err) {
            res.json({ success: false, msg: err });
        }
        else {
            res.json({ success: true, answer: result });
        }
    });
});

module.exports = router;