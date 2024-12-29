const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userinfoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    ocassion: {
        type: String,
        required: true
    },
    cloth_type: {
        type: String,
        required: true
    },
    season: {
        type: String,
        required: true
    },
});

const Userinfo = mongoose.model('Userinfo', userinfoSchema);

module.exports = Userinfo;