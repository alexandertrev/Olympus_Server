const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// WaterSession Schema
const WaterSessionSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    mac: {
        type: String,
        required: true
    },
});

const WaterSession = module.exports = mongoose.model('WaterSession', WaterSessionSchema);

module.exports.isWaterSessionInProgress = function (mac, callback) {
    query = { mac: mac }
    WaterSession.findOne(query, (err, session) => {
        if (err) throw err
        if (session) {
            var waterTime = new Date(session.date);
            var nowTime = new Date(Date.now());

            var diff = nowTime - waterTime;
            //&& (diff / 60e3) > 5
            if (diff > 60e3) {
                WaterSession.remove(query, (err, success) => {
                    if (err) throw err
                    callback(false);
                });
            }
            else {
                callback(true);
            }
        }     
        else
            callback(false);
    });
}

module.exports.startSession = function (session, callback) {
    session.save(callback);
}

module.exports.endSession = function (mac, callback) {
    query = { mac: mac }
    WaterSession.remove(query, callback);
}