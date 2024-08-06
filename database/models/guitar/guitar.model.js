// Package import
const mongoose = require("mongoose");
const schema = mongoose.Schema;
// Model import
const guitarCategory = require("./guitar-category.model");
const GuitarBrand = require("./guitar-brand.model");

const guitarSchema = schema({
    uuid: {
        type: String,
        required: [true, "Error uuid creation"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Name required"],
        minlength: [5, "The name must be at least 5 characters long"],
        maxlength: [20, "The name must be less than 20 characters long"],
        unique: true,
        index: true
    },
    description: {
        type: String,
        required: [true, "Description required"],
        minlength: [10, "The description must be at least 10 characters long"],
        maxlength: [500, "The description must be less than 500 characters long"]
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: GuitarBrand,
        required: [true, "Brand required"]
    },
    price: {
        type: Number,
        required: [true, "Price required"],
        max: [100000, "Error on the maximum price, it must not exceed 1000.00"],
        min: [10000, "Error on the minimum price, it must not be below 100.00"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity required"],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: guitarCategory,
        required: [true, "Category required"]
    },
    picture: {
        url: {
            type: String,
        },
        uuid: {
            type: String,
            required: [true, "Guitar picture UUID required"],
            unique: true
        }
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

// photo pour les guitares


const Guitar = mongoose.model("guitar", guitarSchema);


module.exports = Guitar;



