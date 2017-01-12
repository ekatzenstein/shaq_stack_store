var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

var router = require('express').Router();

router.post('/', handleSayHello); // handle the route at yourdomain.com/sayHello

function handleSayHello(req, res, next) {
    // Not the movie transporter!
    // generator.on('token', function(token){
    //     console.log('New token for %s: %s', token.user, token.accessToken);
    // });

    // login
    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         xoauth2: xoauth2.createXOAuth2Generator({
    //             user: 'shaqstackstore@gmail.com',
    //             clientId: '1011519690281-dohjq2r4d7e86m015hh8a37t5du75ckv.apps.googleusercontent.com',
    //             clientSecret: 'tVPGyanMhA9kKI-rb2CHimoN',
    //             refreshToken: '1/lFq_3BwAnKKTNFXNcweQV6iiTvvBqUHXhv2Ep_ZqRMI',
    //             accessToken: 'ya29.Ci_RA-E8R5FFO1gyet7O5a_nwjUYi5gAR1JLYfcNWEuudjyvEIpYr33mxpn1bc6vjQ'
    //         })
    //     }
    // });

    console.log('trying to say hello: ', req.body.name);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'shaqstackstore@gmail.com', // Your email id
            pass: '' // default project name
        }
    });


    var text = 'Your order is being processed and will be shipped to '+req.body.address;

    var mailOptions = {
        from: 'shaqstackstore@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Confirming Purchase for ' + req.body.name, // Subject line
        text: text //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };


    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        };
    });

}

module.exports = router;

var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

// listen for token updates (if refreshToken is set)
// you probably want to store these to a db

