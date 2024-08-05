const mongoose = require("mongoose");
const schema = mongoose.Schema;

guitarBrancSchema = schema({
    uuid: {
        type: String,
        required: [true, "Error uuid creation"],
        unique: true,
    },
    name: {
        type: String,
        max_length: [30, "The name must be less than 30 characters long"],
        min_length: [5, "The name must be at least 5 characters long"],
        required: [true, "Brand name required"],
        unique: true
    },
    is_deleted: {
        type: Boolean,
        default: false,
        required: [true, "Error deleted"]
    },

}, { timestamps: true })

const GuitarBrand = mongoose.model("guitar-brand", guitarBrancSchema);

module.exports = GuitarBrand;
