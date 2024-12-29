const express = require('express');
const router = express.Router();

router.get('/faq', (req, res) => {
    res.render('service/faq');
});

router.get('/terms', (req, res) => {
    res.render('service/terms&conditions');
});

router.get('/privacy', (req, res) => {
    res.render('service/privacy');
});

module.exports = router;