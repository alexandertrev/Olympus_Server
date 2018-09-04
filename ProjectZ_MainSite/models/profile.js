const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const config = require('../config/database');

// Profile Schema
const ProfileSchema = mongoose.Schema({
    profileName: {
        type: String,
        required: true
    },
    addedBy: {  
        type: String,
        required: true
    },
    plant: {
        type: Schema.Types.ObjectId,
        ref: 'Plant',
        required: true,
    },
    sunNeeds: {
        type: String,
        required: true
    },
    heatMin: {
        type: String,
        required: true
    },
    heatMax: {
        type: String,
        required: true
    },
    moistMin: {
        type: String,
        required: true
    },
    moistMax: {
        type: String,
        required: true
    }
});

const Profile = module.exports = mongoose.model('Profile', ProfileSchema);

module.exports.getProfileById = function (id, callback) {
    Profile.findById(id, callback);
}

module.exports.addProfile = function (newProfile, callback) {
    newProfile.save(callback);
}

module.exports.getSystemProfile = function (plantName, callback) {
    const query = { profileName: plantName, addedBy:"system" }
    Profile.findOne(query, callback);
}

module.exports.getProfilesByEmail = function (email, callback) {
    const query = { addedBy: email }
    Profile.find(query, callback).populate('plant');
}