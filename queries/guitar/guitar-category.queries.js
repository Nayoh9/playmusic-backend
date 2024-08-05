// Package import
const { v4: uuidv4 } = require('uuid');
// Model import
const GuitarCategory = require("../../database/models/guitar/guitar-category.model");
const Guitar = require("../../database/models/guitar/guitar.model");
//Function import 
const { errorCreation, idValidator } = require("../../utils/functions");



// Get all the guitar categories 
exports.getGuitarCategories = async () => {
    const guitarCategories = await GuitarCategory.find({}).exec();
    return guitarCategories
}


// Get a guitar category with its id
exports.getGuitarCategoryByUuid = async (guitarCategoryUuid) => {
    const guitarCategory = await GuitarCategory.findOne({ uuid: guitarCategoryUuid }).exec();

    if (guitarCategory) {
        return guitarCategory;
    } else {
        errorCreation("Invalid guitar category", 404);
    }
}

// Get all the guitar of a category with the category id
exports.getGuitarsByCategoryId = async (categoryId) => {

    const isIdValid = idValidator(categoryId);

    if (isIdValid) {
        const guitars = await Guitar.find({ category: categoryId }).populate("category brand", "name _id").exec();

        if (guitars.length !== 0) {
            return guitars
        } else {
            errorCreation("No guitars in this category", 404);
        }

    } else {
        errorCreation("An error has occured", 400);
    }
}



// Create a guitar category
exports.createGuitarCategory = async (guitarCategory) => {
    guitarCategory.uuid = uuidv4();
    const newGuitarCategory = new GuitarCategory(guitarCategory);
    return newGuitarCategory.save();
}

