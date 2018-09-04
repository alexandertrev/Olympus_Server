const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// WaterRecord Schema
const WaterRecordSchema = mongoose.Schema({
    Date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    mac: {
        type: String,
        required: true
    },
});

const WaterRecord = module.exports = mongoose.model('WaterRecord', WaterRecordSchema);

module.exports.getLastWaterRecord = function (mac, callback) {
    query = {mac: mac}
    WaterRecord.find(query, callback).sort({ _id: -1 }).limit(1);
}

module.exports.getAllSensorRecord = function (mac, callback) {
    query = { mac: mac }
    WaterRecord.find(query, callback);
}

module.exports.addWaterRecord = function (newWaterRecord, callback) {
    newWaterRecord.save(callback);
}
module.exports.removeRecords = function (mac, callback) {
    query = { mac: mac }
    WaterRecord.remove(query, callback);
}