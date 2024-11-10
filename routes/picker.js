const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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

router.get('/', (req, res) => {
    res.render('picker/index');
});

router.get('/entry', (req, res) => {
    res.render('picker/entry');
});

router.post('/entry', async (req,res) => {
    const {giftlist} = req.body;
    let newList = new giftLists({name:giftlist.name, email:giftlist.email, hasBeenPicked: false});
    delete giftlist.name;
    delete giftlist.email;
    for (let gift in giftlist){
        newList.gifts.push(giftlist[gift]);
    }
    await newList.save();
    // res.send(giftlist);
    
    res.render('picker/index')
});

router.get('/list', async (req, res) => {
    const peeps = await giftLists.find({});

    res.render('picker/list', {peeps});
})

module.exports.pickRouter = router;