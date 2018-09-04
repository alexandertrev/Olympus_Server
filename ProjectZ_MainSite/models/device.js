const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Device Schema
const DeviceSchema = mongoose.Schema({
    mac: {
        type: String,
        required: true
    },
    info: {
        type: String
    },
    lastOnline: {
        type: Date
    }
});

const Device = module.exports = mongoose.model('Device', DeviceSchema);

module.exports.getById = function (id, callback) {
    Device.findById(id, callback);
}
module.exports.getDeviceByMac = function (mac, callback) {
    query = {mac: mac};
    Device.findOne(query, callback);
}
module.exports.addDevice = function (newDevice, callback) {
    newDevice.save(callback);
}
module.exports.getAllDevices = function (callback) {
    Device.find(callback);
}
module.exports.removeDevice = function (mac, callback) {
    query = { mac: mac };
    Device.remove(query, callback);
}
module.exports.updateOnlineStatus = function (mac, callback) {
    query = { mac: mac };
    Device.findOne(query, (err, device) => {
        device.lastOnline = Date.now();
        device.save(callback);
    });
}