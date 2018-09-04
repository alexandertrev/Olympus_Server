const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const PlantSchema = mongoose.Schema({
    plantName: {
        type: String
    },
    plantFamily: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    }
});

const Plant = module.exports = mongoose.model('Plant', PlantSchema);

module.exports.getPlantById = function (id, callback) {
    Plant.findById(id, callback);
}

module.exports.addPlant = function (newPlant, callback) {
    newPlant.save(callback);
}

module.exports.getAllPlants = function (callback) {
    Plant.find(callback);
}

module.exports.getPlantsByName = function (familyName, callback) {
    const query = { plantFamily: familyName }
    Plant.find(query, callback);
}