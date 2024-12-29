const express = require('express');
const router = express.Router();
const Cloth = require('../models/cloth');

const { model_input } = require('./personalise');




router.get('/output', async (req, res) => {
    const { model_category, model_season, model_occasion } = model_input;
    // console.log(model_category, model_season, model_occasion);
    let cloth = await Cloth.findOne({ Cloth_category: model_category });
    console.log(cloth);
    res.render('recommendation/output', { cloth });
});

router.get('/try_on', (req, res) => {
    res.render('recommendation/try_on');
});

router.get('/cloth', async(req, res) => {
    let allCloth = await Cloth.find({ Cloth_category: model_input.model_category });
    res.render('recommendation/cloth', { allCloth });
});

module.exports = router;