const router = require('express').Router();
const { createGuitarCategory, getGuitarCategoryByUuid, getGuitarCategories, getGuitarsByCategoryId } = require("../../controllers/guitar/guitar-category.controllers");

// Gets all the guitar categories
router.get("/", getGuitarCategories);
// Gets a category by using uuid 
router.get("/:guitarCategoryUuid", getGuitarCategoryByUuid);
// Gets all the guitars from a category using the category mongoid
router.get("/category/:categoryId", getGuitarsByCategoryId);
// Creates a guitar category
router.post("/create", createGuitarCategory);



module.exports = router;