// Package import
const { v4: uuidv4 } = require('uuid');
//Model import
const GuitarBrand = require("../../database/models/guitar/guitar-brand.model");
const Guitar = require("../../database/models/guitar/guitar.model");
//Function import 
const { idValidator, errorCreation } = require("../../utils/functions");



// Get all the guitar brands
exports.getGuitarBrands = async () => {
    const guitarBrands = await GuitarBrand.find({}).exec();
    if (guitarBrands.length !== 0) {
        return guitarBrands;
    } else {
        errorCreation("No guitar brands found", 404);
    }
}

// Get a guitar brand with its uuid
exports.getGuitarBrandByUuid = async (guitarBrandUuid) => {
    const guitarBrand = await GuitarBrand.findOne({ uuid: guitarBrandUuid });

    if (guitarBrand) {
        return guitarBrand;
    } else {
        errorCreation("Invalid guitar brand", 404);
    }
}

exports.getGuitarsByBrandId = async (brandId) => {
    const isIdValid = idValidator(brandId)

    if (isIdValid) {
        const guitars = await Guitar.find({ brand: brandId }).populate("category brand", "name uuid").exec();

        if (guitars.length !== 0) {
            return guitars;
        } else {
            errorCreation('No guitar found in this brand', 404);
        }

    } else {
        errorCreation("An error has occured", 400);
    }


}


// Create a guitar brand
exports.createBrand = async (brand) => {
    brand.uuid = uuidv4();
    const newbrand = new GuitarBrand(brand);
    return newbrand.save();
}

