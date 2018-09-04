const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Device Schema
const DeviceCommandSchema = mongoose.Schema({
    mac: {
        type: String,
        required: true
    },
    command: {
        type: String,
        required: true
    },
});

const DeviceCommand = module.exports = mongoose.model('DeviceCommand', DeviceCommandSchema);

module.exports.getCommandsByMac = function (mac, callback) {
    query = { mac: mac };
    DeviceCommand.find(query, callback);
}
module.exports.addCommand = function (newDeviceCommand, callback) {
    query = { mac: newDeviceCommand.mac };
    DeviceCommand.find(query, (err, deviceCommands) => {
        let command = newDeviceCommand.command;
        let commandFlag = false;

        if (err) throw err
        for (let i = 0; i < deviceCommands.length; i++) {
            if (deviceCommands[i].command == command) {
                commandFlag = true;
            }
        }
        if (!commandFlag) {
            newDeviceCommand.save(callback);
        }
        else
            callback();
    });
}
module.exports.removeCommands = function (mac, callback) {
    query = { mac: mac };
    DeviceCommand.remove(query, callback);
}