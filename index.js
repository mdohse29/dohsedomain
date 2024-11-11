const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const {pickRouter} = require('./routes/picker')
const options = {
    // key: fs.readFileSync('./certs/PrivateKey.pem'),
    // cert: fs.readFileSync('./certs/dohsedomain.com_2024.crt'),
    // ca: fs.readFileSync('./certs/IntermediateBundle.crt')
  };

mongoose.connect('mongodb://127.0.0.1:27017/giftLists').then((value) => {
    console.log("Connected!");
    // console.log(value)
}).catch((error) => {
    console.log(error);
});


app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded - enables req.body
app.use(express.static(path.join(__dirname, 'data')));


app.get('/', (req, res) => {
    // res.redirect('https://mdohse29.github.io/construction.html');
    // res.sendStatus(301);
    res.render('index');
});

app.use('/picker', pickRouter);

    // https.createServer(options, app).listen(443, (req, res) => {
    //     console.log('Listening on 443');
    // });
    app.listen(3000, () => {
        console.log('Listening on 3000');
    });
