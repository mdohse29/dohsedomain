const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name:String,
    email:String,
    hasBeenPicked: Boolean,
    gifter: {
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
    let user = await newList.save();
    // res.send(giftlist);
    
    res.redirect(`/picker/confirm/${user._id}`);
});

router.get('/confirm/:id', async (req, res) => {
    const user = await giftLists.findById(req.params.id);
    if (user){
        res.render('picker/confirm', {user});
    }
});

router.get('/edit/:id', async (req, res) => {
    const user = await giftLists.findById(req.params.id);
    if (user){
        res.render('picker/edit', {user});
    }
});

router.post('/edit/:id', async (req, res) => {
    const found = await giftLists.findById(req.params.id);
    const {giftlist: update} = req.body;

    if (found){

        found.name = update.name;
        found.email = update.email;
        found.gifts = [];
        delete update.name;
        delete update.email;

        for (let gift in update){
            found.gifts.push(update[gift]);
        }

        let user = await found.save();

        res.render('picker/confirm', {user});
    }
});

router.get('/search', (req, res) => {
    res.render('picker/search');
});

router.post('/search', async (req, res) => {
    const user = await giftLists.findOne({email:req.body.email});

    if (user){
        res.redirect(`/picker/edit/${user._id}`);
    }
})

router.get('/list', async (req, res) => {
    const peeps = await giftLists.find({});

    res.render('picker/list', {peeps});
});

module.exports.pickRouter = router;