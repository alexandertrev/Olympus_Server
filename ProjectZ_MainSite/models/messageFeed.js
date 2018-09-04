const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Device Schema
const MessageFeedSchema = mongoose.Schema({
    device: {
        type: Schema.Types.ObjectId,
        ref: 'UserDevice',
        required: true
    },
    mac: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true
    },
});

const MessageFeed = module.exports = mongoose.model('MessageFeed', MessageFeedSchema);

module.exports.addMessageFeed = function (message, callback) {
    message.save(callback);
}
module.exports.getMessagesByEmail = function (email, callback) {
    query = { email: email }
    MessageFeed.find(query, callback);
}