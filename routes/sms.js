const express = require('express');
const router = express.Router();
const twilio = require('twilio');

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console


router.use('/sms', (req,res,next) => {

    console.log('INside router.use');
    const accountSid = 'AC70c781cd88b52e064169fd73a585f986';
    const authToken = '911a4beb9a0bc40e48603e5377ecb0ff';
    const client = require('twilio')(accountSid, authToken);

    client.messages.create({
        from: '15005550006',
        to: '15129987115',
        body: "I just sent an SMS from Node.js using Twilio!"
    }).then((message)=> console.log(message.sid))

    /*client.api.accounts('AC70c781cd88b52e064169fd73a585f986')
        .fetch()
        .then(account => console.log(account.friendlyName))
        .done();*/
});

/*router.get('/', (req,res,next) => {
    const accountSid = 'AC70c781cd88b52e064169fd73a585f986';
    const authToken = '911a4beb9a0bc40e48603e5377ecb0ff';
    const client = require('twilio')(accountSid, authToken);

    client.api.accounts('AC70c781cd88b52e064169fd73a585f986')
        .fetch()
        .then(account => console.log(account.friendlyName))
        .done();
});*/


/*
*/
