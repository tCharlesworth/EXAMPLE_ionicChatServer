var express = require('express'),
    cors = require('cors'),
    config = require('./config.js'),
    mongojs = require('mongojs'),
    bodyParser = require('body-parser');

//Mongoose setup
// var Chat = require('./models/chat.js');
// mongoose.connect(config.mongoURI);
// mongoose.connection.on('open', function() {
//     console.log('Database connected: ', config.mongoURI);
// });
// mongoose.connection.on('error', function(err) {
//     console.error('Error connecting to database: ', err);
// });
var db = mongojs('ionicChat', ['Chat']);
db.on('connect', function() {
    console.log('database connected');
})
//Endpoints
var chatCtrl = require('./controllers/chatCtrl.js');

var app = express();
app.use(bodyParser.json());

app.options('/chats', cors());
app.get('/chats', cors(), function(req, res) {
        db.Chat.find({}, function(err, result) {
            if(err) {
                handleErr(err);
            } else {
                res.json(result);
            }
        });
    });
app.post('/chats', cors(), function(req, res) {
        if(req.body && req.body.user && req.body.message) {
            req.body.timestamp = Date.now();
            db.Chat.insert(req.body, function(createErr, newChat) {
                if(createErr) {
                    handleErr(createErr);
                } else {
                    console.log('adding chat', newChat);
                    res.json(newChat);
                }
            });
        } else {
            res.status(400).json({reason: 'Was expecting an object with a user and a message but did not find one.'});
        }
    });

var handleErr = function(err, res) {
    console.error('Error! ', err);
    res.status(500).json(err);
}

app.listen(config.port, function() {
    console.log('Server is listening ');
});