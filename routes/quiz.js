const express = require('express');
const router = express.Router();
// const Userinfo = require('./models/userInfo');

//Quiz routes
router.get('/ques1', (req, res) => {
    res.render('quiz/ques1');
});

router.post('/ques1', (req, res) => {
    let {name} = req.body;
    // req.flash("success", "Payement successfully done");
    console.log(name);
    res.redirect('/quiz/ques2');
});

router.get('/ques2', (req, res) => {
    res.render('quiz/ques2');
});

router.post('/ques2', (req, res) => {
    let { gender } = req.body;
    console.log(gender);
    res.redirect('/quiz/ques3');
});

router.get('/ques3', (req, res) => {
    res.render('quiz/ques3');
});

router.post('/ques3', (req, res) => {
    let  { feet, inch } = req.body;
    console.log(feet, inch);
    res.redirect('/quiz/ques4'); 
});

router.get('/ques4', (req, res) => {
    res.render('quiz/ques4');
});

router.post('/ques4', (req, res) => {
    let { weight } = req.body;
    console.log(weight);
    res.redirect('/quiz/ques5');
});


router.get('/ques5', (req, res) => {
    res.render('quiz/ques5');
});

router.post('/ques5', (req, res) => {
    let { seasons } = req.body;
    console.log(seasons);
    res.redirect('/quiz/ques6');
});

router.get('/ques6', (req, res) => {
    res.render('quiz/ques6');
});

router.post('/ques6', (req, res) => {
    let { vacations } = req.body;
    console.log(vacations);
    res.redirect('/quiz/ques7');
});

router.get('/ques7', (req, res) => {
    res.render('quiz/ques7');
});

router.post('/ques7', (req, res) => {
    let { fabrics } = req.body;
    console.log(fabrics);
    res.redirect('/quiz/ques8');
});

router.get('/ques8', (req, res) => {
    res.render('quiz/ques8');
});

router.post('/ques8', (req, res) => {
    let { bust } = req.body;
    console.log(bust);
    res.redirect('/quiz/ques9');
});

router.get('/ques9', (req, res) => {
    res.render('quiz/ques9');
});

router.post('/ques9', (req, res) => {
    let { waist } = req.body;
    console.log(waist);
    res.redirect('/quiz/ques10');
});

router.get('/ques10', (req, res) => {
    res.render('quiz/ques10');
});

router.post('/ques10', (req, res) => {
    let { bustWaist } = req.body;
    console.log(bustWaist);
    res.redirect('/quiz/ques11');
});

router.get('/ques11', (req, res) => {
    res.render('quiz/ques11');
});

router.post('/ques11', (req, res) => {
    let { style } = req.body;
    console.log(style);
    res.redirect('/quiz/ques12');
});

router.get('/ques12', (req, res) => {
    res.render('quiz/ques12');
});

router.post('/ques12', (req, res) => {
    let { style } = req.body;
    console.log(style);
    res.redirect('/quiz/ques13');
});

router.get('/ques13', (req, res) => {
    res.render('quiz/ques13');
});

router.post('/ques13', (req, res) => {
    let { tops, outerwear, dresses } = req.body;
    // console.log(tops, outerwear, dresses);
    res.redirect('/personalise/go_to_recommendation');
});



module.exports = router;