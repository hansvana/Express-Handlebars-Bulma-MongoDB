const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        else
            req.flash("info", { msg: `${req.body.name} toegevoegd!` });

        res.redirect('/');
    })    
})

router.get('/find', (req,res) => {
    TestModel.find({}, 't_name t_date', (err, result) => {
        res.render('results', {result});
    })
})

module.exports = router;