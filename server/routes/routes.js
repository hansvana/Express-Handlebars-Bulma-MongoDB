const express = require('express');
const router = express.Router();
require('dotenv').config();

const mongoose = require('mongoose');
const mongoDB = process.env.DB_URL + process.env.DB_NAME;
console.log("DB NAME",mongoDB);
const Schema = mongoose.Schema;
mongoose.connect(mongoDB, { useNewUrlParser: true });


////
// Schemas and Models
////

const TestSchema = new Schema({
    t_name: String,
    t_date: { type: Date, default: Date.now() },
});

const TestModel = mongoose.model('TestModel', TestSchema);

////
// Routes
////

router.get('/', (req, res) => {
    console.log(mongoDB);
    res.render('index');
})

router.get('/flash', (req,res) => {
    req.flash("info", { msg: `Flash Works!` });
    res.redirect('/');
})

router.post('/save', (req, res) => {
    const test = new TestModel({ t_name: req.body.name });

    test.save(err => {
        if (err)
            req.flash("error", {"msg" : err});

        res.redirect('/');
    })    
})

router.get('/find', (req,res) => {
    TestModel.find({}, 't_name t_date', (err, result) => {
        console.log(result);
        res.render('results', {result});
    })
})

module.exports = router;