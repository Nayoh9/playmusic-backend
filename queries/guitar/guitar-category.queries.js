// Config import
const s3Client = require("../../config/awsS3.config");
// Package import
const { v4: uuidv4 } = require('uuid');
const { Readable } = require('stream');
const { Upload } = require("@aws-sdk/lib-storage");
// Model import
const GuitarCategory = require("../../database/models/guitar/guitar-category.model");
const Guitar = require("../../database/models/guitar/guitar.model");
//Function import 
const { errorCreation, idValidator, imageChecks } = require("../../utils/functions");



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
exports.createGuitarCategory = async (guitarCategory, guitarCategoryPicture) => {

    const guitarCategoryPictureUuid = uuidv4();
    const newGuitarCategory = new GuitarCategory(guitarCategory);

    newGuitarCategory.uuid = uuidv4();
    newGuitarCategory.picture.uuid = guitarCategoryPictureUuid

    imageChecks(guitarCategoryPicture);

    try {
        const fileStream = Readable.from(guitarCategoryPicture.data);

        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: 'playmusic081107',
                Key: `guitar-category-${guitarCategoryPicture.name}-${guitarCategoryPictureUuid}`,
                Body: fileStream,
                ContentType: guitarCategoryPicture.mimetype,
                ACL: 'public-read',
            },
        })

        const uploadedImage = await upload.done();

        newGuitarCategory.picture.url = uploadedImage.Location;

        return newGuitarCategory.save();

    } catch (e) {
        throw e
    }
}

