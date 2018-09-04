const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// SensorRecord Schema
const SensorRecordSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    water_level: {
        type: Number,
        required: true
    },
    moist: {
        type: Number,
        required: true,
    },
    heat: {
        type: Number,
        required: true
    },
    sun: {
        type: String,
        required: true
    },
    doors: {
        type: Boolean,
        required: true
    },
    lamp: {
        type: Boolean,
        required: true
    },
    mac: {
        type: String,
        required: true
    },
});

const SensorRecord = module.exports = mongoose.model('SensorRecord', SensorRecordSchema);

module.exports.getLastSensorRecord = function (mac, callback) {
    query = { mac: mac }
    SensorRecord.find(query, callback).sort({ _id: -1 }).limit(1);
}

module.exports.getAllSensorRecord = function (mac, callback) {
    query = { mac: mac }
    SensorRecord.find(query, callback);
}

module.exports.addSensorRecord = function (newSensorRecord, callback) {
    console.log(newSensorRecord)
    newSensorRecord.save(callback);
}

module.exports.removeRecords = function (mac, callback) {
    query = { mac: mac }
    SensorRecord.remove(query, callback);
}