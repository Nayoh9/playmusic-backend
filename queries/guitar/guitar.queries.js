// Config import
const s3Client = require("../../config/awsS3.config");
// Package import
const { v4: uuidv4 } = require('uuid');
const { Readable } = require('stream');
const { Upload } = require("@aws-sdk/lib-storage");
// Model import
const Guitar = require("../../database/models/guitar/guitar.model");
const GuitarCategory = require("../../database/models/guitar/guitar-category.model");
const GuitarBrand = require("../../database/models/guitar/guitar-brand.model");
// Function import 
const { errorCreation } = require("../../utils/functions");


// Get all the guitars
exports.getGuitars = async () => {
    return Guitar.find({}).populate("category brand", "id name").exec();
}

// Get one guitar with its uuid
exports.getGuitarByUuid = async (guitarUuid) => {
    const guitar = await Guitar.findOne({ uuid: guitarUuid }).populate("category brand", "id name").exec();
    if (guitar) {
        return guitar
    } else {
        errorCreation("No guitar found", 404);
    }
}

// Create one guitar
exports.createGuitar = async (guitar, guitarPicture) => {

    // Image checks 
    const maxFileSize = 5 * 1024 * 1024; // 5 Mo in octets
    const acceptedFormat = ["image/png", "image/jpeg"];

    if (guitarPicture === null) {
        errorCreation("No file downloaded", 404);
    }

    if (Array.isArray(guitarPicture)) {
        errorCreation("Too much files uploaded", 400)
    }

    if (guitarPicture.size > maxFileSize) {
        errorCreation("File to heavy", 413);
    }

    if (!acceptedFormat.includes(guitarPicture.mimetype)) {
        errorCreation("Wrong file format", 400);
    };
    // Image checks 


    // Before creation, i verify if the category and the brand of the guitar exists
    const [guitarCategory, guitarBrand] = await Promise.all([
        GuitarCategory.findOne({ name: guitar.category }).exec(),
        GuitarBrand.findOne({ name: guitar.brand }).exec()
    ])

    if (guitarCategory && guitarBrand) {
        guitar.category = guitarCategory._id
        guitar.brand = guitarBrand._id;
        guitar.uuid = uuidv4();
    } else {
        errorCreation("Invalid category or brand", 404);
    }

    // Use try catch here to verify if the document is well based on the model before trying to upload image
    try {
        const newGuitar = new Guitar(guitar);
        await newGuitar.validate();

        const fileStream = Readable.from(guitarPicture.data);

        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: 'playmusic081107',
                Key: `${guitarPicture.name}-GUITAR-${uuidv4()}`,
                Body: fileStream,
                ContentType: guitarPicture.mimetype,
                ACL: 'public-read',
            },

            // Delete the current files in case of error
            leavePartsOnError: false
        });

        const uploadedImage = await upload.done();
        newGuitar.picture = uploadedImage.Location;

        return newGuitar.save();

    } catch (e) {
        throw e
    }

}



