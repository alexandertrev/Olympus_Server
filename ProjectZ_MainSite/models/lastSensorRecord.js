const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// LastSensorRecord Schema
const LastSensorRecordSchema = mongoose.Schema({
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

const LastSensorRecord = module.exports = mongoose.model('LastSensorRecord', LastSensorRecordSchema);

module.exports.getLastSensorRecord = function (mac, callback) {
    query = { mac: mac }
    LastSensorRecord.find(query, callback);
}

module.exports.addLastSensorRecord = function (newSensorRecord, callback) {
    query = { mac: newSensorRecord.mac }
    LastSensorRecord.remove(query, (err, success) => {
        if (err)
            console.log(err)
        else {
            newSensorRecord.save(callback);
        }
    });
}

module.exports.removeRecords = function (mac, callback) {
    query = { mac: mac }
    LastSensorRecord.remove(query, callback);
}