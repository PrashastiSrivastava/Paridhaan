/*Writing all basic setup code here*/
if(process.env.NODE_ENV != "production"){// We have written this if statement because, we don't use ".env" file in production 
    // phase
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override'); // This will allow us to use put, patch and delete request
const Cloth = require('./models/cloth');
const User = require('./models/user');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const createStrategy = require('passport-strategy');
const flaskApiUrl = process.env.FLASK_API_URL;
const axios = require("axios");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const https = require('https');

const home = require('./routes/home')
const quiz = require('./routes/quiz');
const { personalise } = require('./routes/personalise');
const recommend = require('./routes/recommend');
const help = require('./routes/help');
const game = require('./routes/game');
const service = require('./routes/service');
const appointment_booking = require('./routes/booking_appointment')

//For views folder
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set("views", path.join(__dirname, "/views"));

//For public folder/to serve static files
app.use(express.static(path.join(__dirname, 'public')));

//For using the put, patch, delete opeartions for the html form.
app.use(methodOverride('_method'));

//For fetch data of POST request from the req.body
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 4 * 24 * 60* 60 * 1000,
        httpOnly: true,
    },
};


app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    next();
});

app.use((req, res, next) => {
    if (req.originalUrl.endsWith('?')) {
      return res.redirect(req.originalUrl.slice(0, -1));
    }
    next();
});

app.use('/home', home);
app.use('/quiz', quiz);
app.use('/personalise', personalise);
app.use('/recommend', recommend);
app.use('/help', help);
app.use('/game', game);
app.use('/service', service)
app.use('/appointment_booking', appointment_booking);



app.use(passport.initialize());
app.use(passport.session());

// Passport-local-mongoose methods
passport.use(User.createStrategy());
// passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//For mongodb connection
main()
    .then(() => {
        console.log("Connection Successful");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/paridhaan");
}


/* Model calling code.*/

// Async function to fetch recommendations from the api model
// async function getRecommendations() {
//     const requestBody = {
//         season: "Autumn",
//         gender: "F",
//         occasion: "Formal",
//         cloth_category: "jeans"
//     };

//     try {
//         // Post request to Flask API
//         const response = await axios.post(flaskApiUrl, requestBody);
//         console.log("Recommendations from ML model:", response.data);

//         // Return recommendations from the API
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching recommendations:", error.response ? error.response.data : error.message);
//         throw new Error("Failed to fetch recommendations");
//     }
// };



/* Creating a demo user */

// app.get('/demouser', async(req, res) => {
//     let fakeUser = new User({
//         email: "rishabh@gmail.com",
//         username: "delta-student"
//     });

//     let regiteredUser = await User.register(fakeUser, "HelloWorls");
//     res.send(regiteredUser);
// });

// app.get('/', (req, res) => {
//     res.send("Hi, I am main page");
// });

// app.get('/testCloth', async(req, res) => {
//     let sampleCloth =  new Cloth({
//         Cloth_category: 'shorts',
//         Brand: 'Jack and Jones',
//         Available_on: 'J&J',
//         Wear_type: 'Lower',
//         Material: 'Denim',
//         Fit_type: 'Slim',
//         Occasion: 'Casual',
//         Colors: [ 'Blue', 'Black' ],
//         Wash_care: [ 'Hand Wash', 'Machine Wash' ],
//         Price: 4000,
//         Discount_percentage: '5%',
//         Discounted_price: 3800,
//         Gender: 'M',
//         Size: [ 'M' ],
//         Season: 'Summer',
//     });
//     await sampleCloth.save()
//     .then((res) => {
//         console.log(res);
//     })
//     console.log('sample was saved');
//     res.send('Cloth saved successful');
// });

// Cloth.findOne({Available_on: 'J&J'})
// .then((res) => {
// console.log(res);
// })


app.get('/signup', (req, res) => {
    res.render('users/signup');
});

app.post('/signup', (req, res) => {
    console.log(req.body);
    const { email, username, password,  rePassword } = req.body;
  
    if (password !== rePassword) {
    //   req.flash('error_msg', 'Passwords do not match.');
      return res.redirect('/signup');
    }
  
    const newUser = new User({ email, name: username });
  
    User.register(newUser, password, (err, user) => {
      if (err) {
        // req.flash('error_msg', 'Error registering user: ' + err.message);
        return res.redirect('/signup');
      }
      passport.authenticate('local')(req, res, () => {
        req.flash('success_msg', 'Registration successful!');
        res.redirect('/home');
      });
    });
  });

app.get('/login', (req, res) => {
    res.render('users/login');
});

app.post('/login', (req, res, next) => {
    console.log('Request Body:', req.body); // Add this line for debugging
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error('Error during authentication:', err);
        return next(err);
      }
      if (!user) {
        console.error('Authentication failed:', info);
        req.flash('error', 'Invalid email or password');
        return res.redirect('/login');
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error('Error logging in:', err);
          return next(err);
        }
        res.redirect('/home');
      });
    })(req, res, next);
  });
  

// //Recommendation model setup fro flask make sure to run the flask app 
// app.get('/output', async (req, res) => {
//     try {
//         // Call getRecommendations function
//         const recommendations = await getRecommendations();
//         console.log("Recommendations received:", recommendations);

//         // Extract the key-value pair from recommendations
//         const queryKey = Object.keys(recommendations)[0]; // e.g., "recommended_image"
//         const queryValue = recommendations[queryKey]; // e.g., "a62.jpg"

//         // Query the database using the key-value pair
//         const cloth = await Cloth.findOne({ [queryKey]: queryValue });

//         console.log("Cloth found:", cloth);

//         if (!cloth) {
//             return res.status(404).send({
//                 message: 'No matching cloth found for the recommendations.',
//                 recommendations: recommendations,
//             });
//         }

//         // Send response back to the client
//         // res.send({
//         //     message: 'Recommendations fetched successfully!',
//         //     recommendations: recommendations,
//         //     cloth: cloth,
//         // });
//         res.render('recommendation/output', { cloth });
//     } catch (error) {
//         console.error("Error in /requests route:", error.message);
//         res.status(500).send({ error: "An error occurred while processing the request." });
//     }
// });



app.get('*', (req, res) => {
    res.send("Page not found");
});

const port = 8080;

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
});