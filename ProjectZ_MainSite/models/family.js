const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const FamilySchema = mongoose.Schema({
    familyName: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true
    }
});

const Family = module.exports = mongoose.model('Family', FamilySchema);

module.exports.getFamilyById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.addFamily = function (newFamily, callback) {
    newFamily.save(callback);
}
module.exports.getAllFamilies = function (callback) {
    Family.find(callback);
}