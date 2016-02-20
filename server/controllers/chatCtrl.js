var mongoose = require('mongoose'),
    Chats = require('../models/chat.js');

console.log('chat control loading');
module.exports = {
    getAll: function(req, res) {
        console.log('finding chats');
        Chats.find({}).exec(function(err, result) {
            console.log('server response');
            if(err) {
                handleErr(err);
            } else {
                res.json(result);
            }
        });
    },
    
    addChat: function(req, res) {
        if(req.body && req.body.user && req.body.message) {
            Chats.create(req.body, function(createErr, newChat) {
                if(createErr) {
                    handleErr(createErr);
                } else {
                    res.json(newChat);
                }
            });
        } else {
            res.status(400).json({reason: 'Was expecting an object with a user and a message but did not find one.'});
        }
    }
};

var handleErr = function(err, res) {
    console.error('Error! ', err);
    res.status(500).json(err);
}