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

module.exports = { idValidator, errorCreation };