const express = require('express');
const personalise = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

personalise.get('/go_to_recommendation', (req, res) => {
    res.render('personalise/go_to_recommendation');
});

personalise.get('/recommend_input', (req, res) => {
    res.render('personalise/recommend_input');
});

// personalise.post('/recommend_input', (req, res) => {
//     let { season, clothCategory, occasion} = req.body;
//     console.log(season, clothCategory, occasion);
// });

const model_input = { model_category: null, model_season: null, model_occasion: null, };

// Handle /recommend_input POST request
personalise.post('/recommend_input', (req, res) => {
    // console.log(req.body); // Log the entire request body
    const { season, cloth_category, occasion } = req.body;

    
    model_input.model_category = cloth_category;
    model_input.model_season = season;
    model_input.model_occasion = occasion;

    console.log(model_input);

    if (!season || !cloth_category || !occasion) {
        return res.status(400).send('All inputs are required');
    }

    const inputArray = [season, cloth_category, occasion];
    console.log(inputArray); // Logs the inputs as an array

    console.log("next");

    // Dynamically create an auto-submitting form for /pay
    const formHtml = `
        <form id="payRedirectForm" action="/personalise/pay" method="POST">
            <input type="hidden" name="inputArray" value='${JSON.stringify(inputArray)}'>
        </form>
        <script>
            document.getElementById('payRedirectForm').submit();
        </script>
    `;
    res.send(formHtml); // Send the form to the client for automatic submission
});

//Stripe authetication code

personalise.post('/pay', async(req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Your own stylist at your home',
                    },
                    unit_amount: 100 * 100,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'https://405c-146-196-36-162.ngrok-free.app/personalise/complete1',
        // success_url:`${ process.env.BASE_URL}/output`,
        cancel_url: `${ process.env.BASE_URL}/cancel1`,
    });
    // console.log(session);
    res.redirect(session.url);
});

personalise.get('/complete1', (req, res) => {
    res.redirect('/recommend/output');
});

personalise.get('/cancel1', (req, res) => {
    res.redirect('/personalise/pay');
});



module.exports = { personalise, model_input };