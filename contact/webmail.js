var express=require('express');
var cors = require("cors");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var app=express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://www.sunderlandyouthbaseball.org");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//app.use(cors());
//var corsOptions = {
//  origin: 'http://www.carolcoombs.com/',
//  optionsSuccessStatus: 200
//};
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var transport = nodemailer.createTransport(smtpTransport({
    service: "gmail",
    auth: {
        user: "jason.asa.coombs@gmail.com",
        pass: "xlovtzcjuuiveiur"
    }
}));
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/', function(req, res, next){
    res.sendFile('index.html');
});
app.get('/send', function(req, res, next){
    var tmpDate = new Date();
    var d = tmpDate.toLocaleDateString() + " " + tmpDate.toLocaleTimeString();
    var mailOptions={
        to : "jason.asa.coombs@gmail.com",
        from: req.query.from,
        subject : req.query.subject,
        text : req.query.text + "\r\r" + req.query.name + "\r" + req.query.phone + "\r" + req.query.email + "\r" + d.toString()
    }
    console.log(mailOptions);
    transport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent");
        res.end("sent");
         }
});
});

/*--------------------Routing Over----------------------------*/

app.listen(3001,function(){
    console.log("Express Started on Port 3001");
});