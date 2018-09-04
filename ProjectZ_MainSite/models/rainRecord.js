const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const config = require('../config/database');

// RainRecord Schema
const RainRecordSchema = mongoose.Schema({
    Date: {
        type: Date,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    mac: {
        type: String,
        required: true
    },
});

const RainRecord = module.exports = mongoose.model('RainRecord', RainRecordSchema);

module.exports.getLastRainRecord = function (mac, callback) {

    query = {
        mac: mac
    }
    RainRecord.find(query, callback).sort({ _id: -1 }).limit(1);
}

module.exports.addRainRecord = function (newRainRecord, callback) {
    newRainRecord.save(callback);
}
module.exports.removeRecords = function (mac, callback) {
    query = { mac: mac }
    RainRecord.remove(query, callback);
}