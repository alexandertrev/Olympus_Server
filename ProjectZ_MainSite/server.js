const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const wifi = require('node-wifi');

// Connect to Database
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// On error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

const app = express();

const users = require('./routes/users');
const families = require('./routes/families');
const plants = require('./routes/plants');
const profiles = require('./routes/profiles');
const devices = require('./routes/devices');
const user_devices = require('./routes/user_devices');
const sensorRecords = require('./routes/sensorRecords');
const waterRecords = require('./routes/waterRecords');
const rainRecords = require('./routes/rainRecords');
const deviceCommands = require('./routes/deviceCommands');
const waterSessions = require('./routes/waterSessions');
const messageFeeds = require('./routes/messageFeeds');
const lastSensorRecords = require('./routes/lastSensorRecords');
const userProfiles = require('./routes/userProfiles');

// Port Number
//const port = process.env.PORT || 8080;
const port = 3000;

// CORS Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.resolve('uploads')));

// Body Praser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

// Import routes
app.use('/users', users);
app.use('/families', families);
app.use('/plants', plants);
app.use('/profiles', profiles);
app.use('/devices', devices);
app.use('/user_devices', user_devices);
app.use('/sensorRecords', sensorRecords);
app.use('/waterRecords', waterRecords);
app.use('/rainRecords', rainRecords);
app.use('/deviceCommands', deviceCommands);
app.use('/waterSessions', waterSessions);
app.use('/messageFeeds', messageFeeds);
app.use('/lastSensorRecords', lastSensorRecords);
app.use('/userProfiles', userProfiles);

app.get('/', (req, res) => {
    res.send('Invalid path');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server 
app.listen(port, () => {
    console.log('server Started on port ' + port);
});