const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const mongoose = require('mongoose');
const app = express();

const accountSid = 'AC70c781cd88b52e064169fd73a585f986';
const authToken = '911a4beb9a0bc40e48603e5377ecb0ff';
const client = require('twilio')(accountSid, authToken);

//Routing requests
// const smsRouter = require('./routes/sms');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Applying CORS- giving access to any client
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    // res.header('Access-Control-Allow-Origin','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS');
        return res.status(200).json({})
    }
    next();
});
//Closing CORS. Always add before the routes.

// app.use('/sms', smsRouter);

app.use('/mobile/signUp/',(req,res,next) => {
    console.log('Inside router.use' , req.body.mobileNo);
    client.messages.create({
        from: '17042702625',
        to: req.body.mobileNo,
        body: "Welcome to the study!"
    }).then((message)=> console.log(message.sid))
        .catch(error => {
            console.log(error);
        });
});

app.use('/mobile/sendError/', (req,res,next) => {
    console.log('Inside sendMessage API', req.body.mobileNo, req.body.invalid);
    client.messages.create({
        from: '+17042702625',
        to: req.body.mobileNo,
        body: req.body.invalid
    }).then((message)=> console.log(message.sid))
        .catch(error => {
            console.log(error);
        });
});

app.use('/mobile/sendMessage/', (req,res,next) => {
    console.log('Inside sendMessage API', req.body.mobileNo, req.body.userMessage);
    client.messages.create({
        from: '+17042702625',
        to: req.body.mobileNo,
        body: req.body.userMessage
    }).then((message)=> console.log(message.sid))
        .catch(error => {
            console.log(error);
        });
});

app.use((req,res,next) => {
    const error = new Error("Not found");
    error.status =404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error :{
            message : error.message
        }
    });
});

// app.use(app.router);

module.exports = app;
