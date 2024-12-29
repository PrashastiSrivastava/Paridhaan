const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clothSchema = new Schema({
    recommended_image: {
        type: String,
    },
    image: {
        Image_name: {
            type: String,
            default: "cloth_image",
        },
        // default: "https://unsplash.com/photos/green-leafed-tree-surrounded-by-fog-during-daytime-S297j2CsdlM",
        // set: (v)=> v === "" ? "deafult link" : v,
        Image_url: {
            type: String,
            set: (v) => 
                v === "" 
                ? "https://images.unsplash.com/photo-1592743263126-bb241ee76ac7?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"// default link of image.
                : v    
        },
        Purchase_link: {
            type: String,
            set: (v) => 
                v === "" 
                ? "https://images.unsplash.com/photo-1592743263126-bb241ee76ac7?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"// default link of image.
                : v
        },
    },
    Cloth_category: {
        type: String,
    },
    Brand: {
        type: String
    },
    Available_on: {
        type: String
    },
    Wear_type: {
        type: String
    },
    Material: {
        type: String
    },
    Fit_type: {
        type: String
    },
    Occasion: {
        type: String,
    },
    Colors: {
        type:[ String]
    },
    Wash_care: {
        type: [String]
    },
    Price: {
        type: Number,
        set: (v) => parseFloat(v),
    },
    Discount_percentage: {
        type: String
    },
    Discounted_price: {
        type: Number,
        set: (v) => parseFloat(v),
    },
    Gender: {
        type: String,
    },
    Size: {
        type: [String]
    },
    Season: {
        type: String,
    },
});

const Cloth = mongoose.model('Cloth', clothSchema);

module.exports = Cloth;