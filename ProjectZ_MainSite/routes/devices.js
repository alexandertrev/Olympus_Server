const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Device = require('../models/device');
const UserDevice = require('../models/userDevice');

router.post('/add', (req, res, next) => {
    console.log('Add device attempt:----------------------------------------------- ');

    let newDevice = new Device({
        mac: req.body.mac,
        info: req.body.info,
    });
    Device.addDevice(newDevice, (err, device) => {
        if (err) {
            console.log("-------------------ERR-------------------")
            console.log(err);
            console.log("-------------------ERR-------------------")
            res.json({ success: false, msg: err });
        }
        else {
            console.log("success")
            res.json({ success: true, message: 'Device been added' });
        }
    });
});

router.post('/remove', (req, res, next) => {
    console.log('Remove device attempt:----------------------------------------------- ');
    Device.getDeviceByMac(req.body.mac, (err, device) => {
        console.log(device)
        UserDevice.unlink(device._id, (err, success) => {
            console.log(success);
            if (err) throw err
            else {
                Device.removeDevice(req.body.mac, (err, device) => {
                    if (err) {
                        console.log("-------------------ERR-------------------")
                        console.log(err);
                        console.log("-------------------ERR-------------------")
                        res.json({ success: false, msg: err });
                    }
                    else {
                        console.log(device)
                        res.json({ success: true, message: 'Device been removed' });
                    }
                });
            }
        });
    })
});
router.get('/get', (req, res, next) => {

    console.log('Get all devices attempt:----------------------------------------------- ');

    Device.getAllDevices((err, result) => {
        if (err) {
            res.json({ success: false, msg: err });
        }
        else {
            //console.log(result);
            res.json({ success: true, answer: result });
        }
    });
});
module.exports = router;