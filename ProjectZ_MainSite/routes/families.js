const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Family = require('../models/family');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });

// Add family 
router.post('/add', (req, res, next) => {
    console.log('Add family attempt:----------------------------------------------- ');

    let newFamily = new Family({
        familyName: req.body.name,
        pic: req.body.pic,
        description: req.body.description
    });
    Family.addFamily(newFamily, (err, family) => {
        if (err) {
            console.log("-------------------ERR-------------------")
            console.log(err);
            console.log("-------------------ERR-------------------")
            res.json({ success: false, msg: err });
        }
        else {
            console.log("success")
            res.json({ success: true, message: 'Family been added' });
        }
    });
});
router.get('/get', (req, res, next) => {

    console.log('Get all families attempt:----------------------------------------------- ');

    Family.getAllFamilies((err, result) => {
        if (err) {
            res.json({ success: false, msg: err });
        }
        else {
            //console.log(result);
            res.json({ success: true, answer: result });
        }
    });
});
module.exports = router;