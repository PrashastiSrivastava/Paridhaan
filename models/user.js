const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique email
        lowercase: true, // Normalize email
        trim: true,
    },
    name: {
        type: String,
        // required: true,
        trim: true, // Optional for cleanup
    },
    // Password is handled automatically by passport-local-mongoose
});

// Add the passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose, { 
    usernameField: 'email' 
});

// User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);