const express = require('express');
const router = express.Router();
const config = require('../config/database');
const UserDevice = require('../models/userDevice');
const Device = require('../models/device');
const DeviceCommand = require('../models/deviceCommand');
const RainRecord = require('../models/rainRecord');
const SensorRecord = require('../models/sensorRecord');
const LastSensorRecord = require('../models/lastSensorRecord');
const WaterRecord = require('../models/waterRecord');
const UserProfile = require('../models/userProfile');

router.post('/link', (req, res, next) => {
    console.log('Link device attempt:----------------------------------------------- ');
    var linkAccepted = req.body.link;
    var email = req.body.email;
    var mac = req.body.mac;
    var initFlag = true;

    Device.getDeviceByMac(mac, (err, device) => {
        if (err) throw err
        if (device) {
            let newUserDevice = new UserDevice({
                device: device._id,
                linkedTo: email,
                date: Date.now(),
                firstConfig: false,
                fix_doors: false,
                fix_lamp: false,
                fix_pump: false
            });
            UserDevice.getByDeviceId(device._id, (err, linkedDevice) => {
                if (err) throw err

                if (linkedDevice && linkAccepted == false) {
                    initFlag = false;

                    if (linkedDevice.linkedTo == req.body.email)
                        res.json({ success: false, type: "link", msg: "your" });
                    else
                        res.json({ success: false, type: "link", msg: "other" });
                }
                else if (linkedDevice && linkAccepted == true) {
                    UserDevice.unlink(device._id, (err, success) => {
                        if (err) throw err
                        else {
                            UserDevice.addUserDevice(newUserDevice, (err, new_device) => {
                                if (err) throw err
                                res.json({ success: true, msg: "You have linked the device to your account", answer: { userDevice: new_device, mac: req.body.mac } });
                            });
                        }
                    });
                }
                else if (!linkedDevice) {
                    UserDevice.addUserDevice(newUserDevice, (err, new_device) => {
                        res.json({ success: true, msg: "You have linked the device to your account", answer: { userDevice: new_device, mac: req.body.mac } });
                    });
                }

                if (initFlag) {
                    let newDeviceCommand = new DeviceCommand({
                        mac: req.body.mac,
                        command: 'init_device'
                    });
                    DeviceCommand.addCommand(newDeviceCommand, (err, device) => {
                        if (err) throw err
                    });
                }
            });
        }
        else
            res.json({ success: false, type: "not found", msg: "Error accured, no such device" });
    });
});

router.post('/unlink', (req, res, next) => {
    console.log('Unlink user device attempt:----------------------------------------------- ');

    UserDevice.unlink(req.body._id, (err, success) => {
        if (err) {
            res.json({ success: false, msg: "Error accured" });
        }
        else {
            DeviceCommand.removeCommands(req.body.mac, (err, success) => {
                if (err) 
                    console.log(err)
            });
            RainRecord.removeRecords(req.body.mac, (err, success) => {
                if (err)
                    console.log(err)
            });
            SensorRecord.removeRecords(req.body.mac, (err, success) => {
                if (err)
                    console.log(err)
            });
            LastSensorRecord.removeRecords(req.body.mac, (err, success) => {
                if (err)
                    console.log(err)
            });
            WaterRecord.removeRecords(req.body.mac, (err, success) => {
                if (err)
                    console.log(err)
            });
            res.json({ success: true, msg: 'Device been unlinked'});
        }
    });
});

router.post('/getUserDevices', (req, res, next) => {
    console.log('Get user devices attempt:----------------------------------------------- ');
    //console.log("email:" + req.body.email)

    UserDevice.getByEmail(req.body.email, (err, devices) => {
        if (err) {
            console.log(err);
            res.json({ success: false, msg: "Error accured" });
        }
        else {
            //console.log(devices);
            res.json({ success: true, answer: devices });
        }

    });
});

router.post('/getUserDeviceByDeviceId', (req, res, next) => {
    console.log('Get user device by device id attempt:----------------------------------------------- ');

    UserDevice.getByDeviceId(req.body.deviceId, (err, device) => {
        if (err) {
            console.log(err);
            res.json({ success: false, msg: "Error accured" });
        }
        else {
            //console.log(devices);
            res.json({ success: true, answer: device });
        }

    });
});

router.post('/getDeviceProfileByMac', (req, res, next) => {
    console.log('Get user device by mac attempt:----------------------------------------------- ');

    Device.getDeviceByMac(req.body.mac, (err, device) => {
        if (err) throw err
        if (!device) {
            res.json({ success: true, device: false, msg: "No profile yet" });
        }
        else {
            UserDevice.getByDeviceId(device._id, (err, device) => {
                let answer = {
                    light: device.sunNeeds,
                    heatMin: device.heatMin,
                    heatMax: device.heatMax,
                    moistMin: device.moistMin,
                    moistMax: device.moistMax,
                    location: device.location,
                    fix_doors: device.fix_doors,
                    fix_lamp: device.fix_lamp,
                    fix_pump: device.fix_pump
                }
                if (err) {
                    console.log(err);
                    res.json({ success: false, msg: "Error accured" });
                }
                else if (device) {
                    res.json({ success: true, device: true, answer: answer });
                }
                else {
                    //console.log(devices);
                    res.json({ success: true, device: false, msg: "No profile yet" });
                }
            });
        }
    });
    
});

router.post('/config', (req, res, next) => {
    console.log('Configure device attempt:----------------------------------------------- ');
    //console.log(req.body.device);
    console.log('Mac: '+req.body.mac)
    UserDevice.getByDeviceId(req.body.device, (err, user_device) => {
        if (err) throw err
        user_device.firstConfig = true;
        user_device.plant = req.body.plantId;
        user_device.name = req.body.name;
        user_device.location = req.body.location;
        user_device.pic = req.body.pic;
        user_device.sunNeeds = req.body.sunNeeds;
        user_device.heatMin = req.body.heatMin;
        user_device.heatMax = req.body.heatMax;
        user_device.moistMin = req.body.moistMin;
        user_device.moistMax = req.body.moistMax;

        console.log(req.body.fix_doors)
        if (req.body.fix_doors != null) {
            user_device.fix_doors = req.body.fix_doors;
        }
        console.log(user_device)

        UserDevice.updateDevice(user_device, (err, device) => {
            if (err) 
                res.json({ success: false, msg: "Error accured, no such device" });
            else {
                let newUserProfile = new UserProfile({
                    mac: req.body.mac,
                    linkedTo: device.linkedTo,
                    changeDate: Date.now(),
                    sunNeeds: req.body.sunNeeds,
                    heatMin: req.body.heatMin,
                    heatMax: req.body.heatMax,
                    moistMin: req.body.moistMin,
                    moistMax: req.body.moistMax
                });

                let newDeviceCommand = new DeviceCommand({
                    mac: req.body.mac,
                    command: 'set_profile'
                });

                UserProfile.addUserProfile(newUserProfile, (err, userProfile) => {
                    if (err) throw err
                });
                DeviceCommand.addCommand(newDeviceCommand, (err, device) => {
                    if (err) throw err
                });
                res.json({ success: true, msg: "Device successfully configured" });
            }
                
        });

    });
});

router.post('/updateFix', (req, res, next) => {
    console.log('Update fix attempt:----------------------------------------------- ');

    let fix_doors = req.body.fix_doors;
    let fix_lamp = req.body.fix_lamp;
    let fix_pump = req.body.fix_pump;
    let _id = req.body._id;
    
    console.log('New doors state: ' + req.body.fix_doors)
    console.log('New lamp state: ' + req.body.fix_lamp)
    console.log('New pump state: ' + req.body.fix_pump)

    UserDevice.getById(_id, (err, device) => {

        if (err) {
            console.log(err)
        }
        if (device) {
            device.fix_doors = fix_doors;
            device.fix_lamp = fix_lamp;
            device.fix_pump = fix_pump;

            UserDevice.updateDevice(device, (err, updatedDevice) => {
                if (err) {
                    console.log(err);
                    res.json({ success: false, msg: "Error occurred" });
                }
                else {
                    //console.log(updatedDevice)
                    let newDeviceCommand = new DeviceCommand({
                        mac: req.body.device.mac,
                        command: 'set_profile'
                    });
                    DeviceCommand.addCommand(newDeviceCommand, (err, device) => {
                        if (err) throw err
                    });
                    res.json({ success: true, msg: "Fix status changed" });
                }
            });
        }
    });
});

module.exports = router;