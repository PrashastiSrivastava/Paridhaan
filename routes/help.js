const express = require('express');
const router = express.Router();

router.get('/about_us', (req, res) => {
    res.render('help/about_us');
});

router.get('/', (req, res) => {
    res.render('help/help');
});

router.get('/contact_us', (req, res) => {
    res.render('help/contact_us');
});



router.get('/our_stores', (req, res) => {
    res.render('help/ourStores');
});



module.exports = router;