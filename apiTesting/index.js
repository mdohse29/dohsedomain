const express = require('express');
const path = require('path');
const app =  express();

app.set('view engine', 'ejs');

app.listen(3000,(req, res) => {
    console.log("Running");
});

app.get('/', (req, res) => {
    res.render('home');
})
