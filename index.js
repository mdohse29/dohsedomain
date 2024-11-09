const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { type } = require('os');
const options = {
    key: fs.readFileSync('./certs/PrivateKey.pem'),
    cert: fs.readFileSync('./certs/dohsedomain.com_2024.crt'),
    ca: fs.readFileSync('./certs/IntermediateBundle.crt')
  };

mongoose.connect('mongodb://127.0.0.1:27017/giftLists').then((value) => {
    console.log("Connected!");
    // console.log(value)
}).catch((error) => {
    console.log(error);
});

const Schema = new mongoose.Schema({
    name:String,
    email:String,
    hasBeenPicked: Boolean,
    gifting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'giftLists'
    },
    gifts: [String]
});
const giftLists = mongoose.model('giftLists', Schema);


app.set('view engine', 'ejs');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded - enables req.body
app.use(express.static(path.join(__dirname, 'data')));


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/picker', (req, res) => {
    res.render('index');
});

app.get('/entry', (req, res) => {
    res.render('entry');
});

app.post('/entry', async (req,res) => {
    const {giftlist} = req.body;
    let newList = new giftLists({name:giftlist.name, email:giftlist.email, hasBeenPicked: false});
    delete giftlist.name;
    delete giftlist.email;
    for (let gift in giftlist){
        newList.gifts.push(giftlist[gift]);
    }
    await newList.save();
    res.send(giftlist);
})

// https.createServer(options, app).listen(443, (req, res) => {
//     console.log('Listening on 443')
// })

app.listen(3000, () => {
    console.log('Listening on 3000')
})