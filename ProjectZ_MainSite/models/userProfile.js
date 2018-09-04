const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User profile Schema
const UserProfileSchema = mongoose.Schema({
    mac: {
        type: String,
        required: true
    },
    linkedTo: {
        type: String,
        required: true
    },
    changeDate: {
        type: Date,
        required: true
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
    }
});

const UserProfile = module.exports = mongoose.model('UserProfile', UserProfileSchema);

module.exports.getProfilesByEmail = function (email, callback) {
    let query = { linkedTo: email}
    UserProfile.find(query, callback);
}

module.exports.addUserProfile = function (newUserprofile, callback) {
    newUserprofile.save(callback);
}
