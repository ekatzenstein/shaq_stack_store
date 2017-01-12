var nodemailer = require('nodemailer');

var router = require('express').Router();

router.post('/', handleSayHello); // handle the route at yourdomain.com/sayHello

function handleSayHello(req, res, next) {
    // Not the movie transporter!

    console.log('trying to say hello: ', req.body.name);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'shaqstackstore@gmail.com', // Your email id
            pass: 'Graceshopper' // Your password
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
