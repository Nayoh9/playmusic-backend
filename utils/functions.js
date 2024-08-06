//Package import
const { ObjectId } = require("mongodb");

const idValidator = (mongoId) => {
    return ObjectId.isValid(mongoId);
}

const errorCreation = (errorMessage, errorCode) => {
    const error = new Error(errorMessage);
    error.code = errorCode;
    throw error;
}

const imageChecks = (image) => {

    const maxFileSize = 5 * 1024 * 1024; // 5 Mo in octets
    const acceptedFormat = ["image/png", "image/jpeg"];

    if (image === null) {
        errorCreation("No file downloaded", 404);
    }

    if (Array.isArray(image)) {
        errorCreation("Too much files uploaded", 400)
    }

    if (image.size > maxFileSize) {
        errorCreation("File to heavy", 413);
    }

    if (!acceptedFormat.includes(image.mimetype)) {
        errorCreation("Wrong file format", 400);
    };

}

module.exports = { idValidator, errorCreation, imageChecks };