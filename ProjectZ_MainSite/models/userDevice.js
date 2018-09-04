const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User device Schema
const UserDeviceSchema = mongoose.Schema({
    device: {
        type: Schema.Types.ObjectId,
        ref: 'Device',
        required: true
    },
    linkedTo: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    firstConfig: {
        type: Boolean,
        required: true
    },
    plant: {
        type: Schema.Types.ObjectId,
        ref: 'Plant'
    },
    name: {
        type: String
    },
    location: {
        type: String
    },
    userNote: {
        type: String
    },
    pic: {
        type: String
    },
    sunNeeds: {
        type: String
    },
    heatMin: {
        type: String
    },
    heatMax: {
        type: String
    },
    moistMin: {
        type: String
    },
    moistMax: {
        type: String
    },
    fix_doors: {
        type: Boolean
    },
    fix_lamp: {
        type: Boolean
    },
    fix_pump: {
        type: Boolean
    }
});

const UserDevice = module.exports = mongoose.model('UserDevice', UserDeviceSchema);

module.exports.getById = function (id, callback) {
    UserDevice.findById(id, callback);
}
module.exports.addUserDevice = function (newUserDevice, callback) {
    newUserDevice.save(callback);
}
module.exports.getByDeviceId = function (id, callback) {
    query = {device:id}
    UserDevice.findOne(query, callback).populate('plant').populate('device');;
}
module.exports.getByEmail = function (email, callback) {
    query = { linkedTo: email };
    UserDevice.find(query, callback).populate('plant').populate('device');
}
module.exports.updateDevice = function (updatedDevice, callback) {
    UserDevice.findByIdAndUpdate(updatedDevice._id, updatedDevice, callback);
}
module.exports.removeRecord = function (id, callback) {
    UserDevice.findByIdAndRemove(id, callback);
}
module.exports.isLinkExist = function (deviceId, callback) {
    query = { device: deviceId }
    UserDevice.findOne(query, callback);
}
module.exports.unlink = function (deviceId, callback) {
    query = { device: deviceId }
    UserDevice.remove(query, callback);
}