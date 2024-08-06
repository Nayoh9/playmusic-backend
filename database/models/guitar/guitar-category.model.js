const mongoose = require("mongoose");
const schema = mongoose.Schema;

const guitarCategorySchema = schema({
    uuid: {
        type: String,
        required: [true, "Error uuid creation"],
        unique: true,
    },
    name: {
        type: String,
        max_length: [30, "The name must be less than 30 characters long"],
        min_length: [5, "The name must be at least 5 characters long"],
        required: [true, "Category name required"],
        unique: true
    },
    picture: {
        uuid: {
            type: String,
            required: [true, "Guitar category picture UUID required"],
            unique: true
        },
        url: {
            type: String
        }
    },
    is_deleted: {
        type: Boolean,
        default: false,
        required: [true, "Error deleted"]
    },
}, { timestamps: true })

const GuitarCategory = mongoose.model("guitar-category", guitarCategorySchema);

module.exports = GuitarCategory;