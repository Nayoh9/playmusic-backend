// Config import
const s3Client = require("../../config/awsS3.config");
// Package import
const { v4: uuidv4, validate } = require('uuid');
const { Readable } = require('stream');
const { Upload } = require("@aws-sdk/lib-storage");
//Model import
const GuitarBrand = require("../../database/models/guitar/guitar-brand.model");
const Guitar = require("../../database/models/guitar/guitar.model");
//Function import 
const { idValidator, errorCreation, imageChecks } = require("../../utils/functions");


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
        errorCreation("Invalid guitar brand", 400);
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
exports.createBrand = async (guitarBrand, guitarBrandPicture) => {

    const guitarBrandAlreadyInDb = await GuitarBrand.findOne({ name: guitarBrand.name }).exec();

    if (guitarBrandAlreadyInDb) {
        errorCreation("This brand already exist", 409);
    }

    imageChecks(guitarBrandPicture);

    const guitarBrandPictureUuid = uuidv4();
    guitarBrand.uuid = uuidv4();
    const newBrand = new GuitarBrand(guitarBrand);
    newBrand.picture.uuid = guitarBrandPictureUuid

    try {
        await newBrand.validate();
        const fileStream = Readable.from(guitarBrandPicture.data);

        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: 'playmusic081107',
                Key: `guitar-brand-${guitarBrandPicture.name}-${guitarBrandPictureUuid}`,
                Body: fileStream,
                ContentType: guitarBrandPicture.mimetype,
                ACL: 'public-read',
            },
        })

        const uploadedImage = await upload.done();
        newBrand.picture.url = uploadedImage.Location;

        return newBrand.save();

    } catch (e) {
        throw e
    }

}

