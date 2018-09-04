const express = require('express');
const router = express.Router();
const DeviceCommand = require('../models/deviceCommand');
const Device = require('../models/device');
const WaterSession = require('../models/waterSession');

router.post('/addCommand', (req, res, next) => {
    console.log('Add device command attempt:----------------------------------------------- ');
    console.log('Command: ' + req.body.command)

    let newDeviceCommand = new DeviceCommand({
        mac: req.body.mac,
        command: req.body.command,
    });

    if (req.body.command == 'water_now') {
        WaterSession.isWaterSessionInProgress(req.body.mac, (answer) => {
            if (answer) {
                console.log('Attempt failed water session in progress')
                res.json({ success: false, message: 'Scheduled Watering session already in progress, please wait.' });
            }
            else {
                DeviceCommand.addCommand(newDeviceCommand, (err, device) => {
                    if (err) throw err
                    console.log('Attempt success')
                    res.json({ success: true, message: 'Water session started' });
                });
            }
        });
    }
    else {
        DeviceCommand.addCommand(newDeviceCommand, (err, device) => {
            if (err) throw err
            console.log('Attempt success')
            res.json({ success: true, message: 'Command been set' });
        });
    }
});

router.post('/getCommands', (req, res, next) => {
    console.log('Get device command attempt:----------------------------------------------- ');
    console.log("mac: " + req.body.mac)

    DeviceCommand.getCommandsByMac(req.body.mac, (err, deviceCommands) => {
        if (err) {
            console.log(err)
            res.json({ success: false, msg: 'Error occurred' });
        }
        else {
            console.log(deviceCommands)
            Device.updateOnlineStatus(req.body.mac, (err, device) => {
                if (err)
                    console.log(err)
            });

            if (deviceCommands.length>0) {
                res.json({ success: true, answer: deviceCommands });
                DeviceCommand.removeCommands(req.body.mac, (err, removedCommands) => {
                    if (err)
                        console.log(err)
                });
            }
            else {
                res.json({ success: false });
            }         
        }
    });

});

module.exports = router;