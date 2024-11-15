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
    const {giftlist, user} = req.body;
    let newList = new giftLists({name:user.name, email:user.email.toLowerCase(), hasBeenPicked: false});

    for (let gift in giftlist){
        newList.gifts.push(giftlist[gift]);
    }
    let newUser = await newList.save();
    // res.send(giftlist);
    
    res.redirect(`/picker/confirm/${newUser._id}`);
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
    const {giftlist, user: updateUser} = req.body;

    if (found){

        found.name = updateUser.name;
        found.email = updateUser.email.toLowerCase();
        found.gifts = [];

        for (let gift in giftlist){
            found.gifts.push(giftlist[gift]);
        }

        let user = await found.save();

        res.render('picker/confirm', {user});
    }
});

router.get('/search', (req, res) => {
    res.render('picker/search');
});

router.post('/search', async (req, res) => {
    let {lookup} = req.body;

    let results = await giftLists.find({email:lookup.toLowerCase()});

    if (results.length){
        if (results.length > 1){
            res.render('picker/select', {peeps:results});
        }else{
            res.redirect(`/picker/edit/${results[0]._id}`);
        }
    }else{
        res.redirect('/picker/list');
    }
});

router.get('/list', async (req, res) => {
    
    const peeps = await giftLists.find({});

    res.render('picker/list', {peeps});
});

module.exports.pickRouter = router;