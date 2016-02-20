var mongoose = require('Mongoose');

var ChatSchema = mongoose.Schema({
    user: { type: String },
    message: { type: String },
    timestamp: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Chat', ChatSchema);
console.log('Chat Loaded')
