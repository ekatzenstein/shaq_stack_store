var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

// PUT THESE IN ENV VARIABLES!!!
var api_key = 'key-a54f8ba006d09cf90417c923916cbe11';
var domain = 'sandboxbdd4161d7ba64b77b1945ef7d3a43086.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var router = require('express').Router();

router.post('/', handleSayHello); // handle the route at yourdomain.com/sayHello

function handleSayHello(req, res, next) {
    // More things that can live in an ENV or config file
    var data = {
      from: 'shaqstackstore <shaqstackstore@sandboxbdd4161d7ba64b77b1945ef7d3a43086.mailgun.org>',
      to: req.body.email || 'rcsheng@gmail.com',
      subject: 'Confirming Purchase for ' + req.body.name,
      text: 'Your order is being processed and will be shipped to '+req.body.address
    };
     

    console.log('trying to say hello: ', req.body.name);

    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    });

    // var transporter = nodemailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //         user: 'shaqstackstore@gmail.com', // Your email id
    //         pass: '' // default project name
    //     }
    // });


    // var text = 'Your order is being processed and will be shipped to '+req.body.address;

    // var mailOptions = {
    //     from: 'shaqstackstore@gmail.com', // sender address
    //     to: req.body.email, // list of receivers
    //     subject: 'Confirming Purchase for ' + req.body.name, // Subject line
    //     text: text //, // plaintext body
    //     // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    // };


    // transporter.sendMail(mailOptions, function(error, info){
    //     if(error){
    //         console.log(error);
    //         res.json({yo: 'error'});
    //     }else{
    //         console.log('Message sent: ' + info.response);
    //         res.json({yo: info.response});
    //     };
    // });

}

module.exports = router;


// listen for token updates (if refreshToken is set)
// you probably want to store these to a db

