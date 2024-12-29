const express = require('express');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get('/book', (req, res) => {
    res.render('booking_appointment/book');
});


router.post('/book-appointment', async (req, res) => {
    try {
        // Extract and sanitize input
        const city = typeof req.body.city === 'string' ? req.body.city.trim() : null;
        const date = typeof req.body.date === 'string' ? req.body.date.trim() : null;

        if (!city || !date) {
            return res.status(400).send('City or date is missing or invalid');
        }

        console.log(`City: ${city}, Date: ${date}`);

        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Appointment on ${date} in ${city}`,
                        },
                        unit_amount: 300 * 100, // $300 in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            // success_url: `${process.env.BASE_URL}/complete2`,
            success_url: `https://405c-146-196-36-162.ngrok-free.app/appointment_booking/complete2`,
            cancel_url: `${process.env.BASE_URL}/cancel2`,
        });

        // Redirect to Stripe payment page
        res.redirect(session.url);
    } catch (err) {
        console.error('Error creating Stripe session:', err);
        res.status(500).send('Internal Server Error');
    }
});

// function calculateAppointmentTime(date) {
//     const appointmentDate = new Date(date);
//     let appointmentTime = new Date(appointmentDate.getTime() + 5 * 60 * 60 * 1000); // Add 5 hours

//     if (appointmentTime.getHours() >= 21) {
//         // If it's past 9 PM, set to next day at 11 AM
//         appointmentTime.setDate(appointmentTime.getDate() + 1);
//         appointmentTime.setHours(11, 0, 0, 0);
//     }

//     return appointmentTime;
// };

// // Route: Handle successful payment
// app.get('/complete2', async (req, res) => {
//     try {
//         const { city, date } = req.query;

//         if (!city || !date) {
//             return res.status(400).send('City or date is missing or invalid');
//         }

//         // Calculate the appointment time
//         const appointmentTime = calculateAppointmentTime(date);

//         // Nodemailer setup
//         const transporter = nodemailer.createTransport({
//             service: 'Gmail',
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASSWORD,
//             },
//         });

//         // Email content
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: 'user@example.com', // Replace with the user's email
//             subject: 'Appointment Confirmation',
//             text: `Dear User,

// Your appointment is confirmed.

// Details:
// City: ${city}
// Date: ${appointmentTime.toLocaleDateString()}
// Time: ${appointmentTime.toLocaleTimeString()}

// Thank you for booking with us!

// Best regards,
// Your Team`,
//         };

//         // Send email
//         await transporter.sendMail(mailOptions);

//         res.send('Payment successful! A confirmation email has been sent to your registered email.');
//     } catch (error) {
//         console.error('Error sending confirmation email:', error);
//         res.status(500).send('An error occurred while processing your request.');
//     }
// });



router.get('/complete2', (req, res) => {
    res.redirect('appointment_booked');
});

router.get('/appointment_booked', (req, res) => {
    res.render('booking_appointment/appointment_booked');
});

// Route: Handle canceled payment
router.get('/cancel2', (req, res) => {
    res.redirect('book-appointment');
});

module.exports = router;