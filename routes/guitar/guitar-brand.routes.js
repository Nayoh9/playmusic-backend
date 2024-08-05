const router = require("express").Router();
const { createGuitarBrand, getGuitarBrands, getGuitarBrandByUuid, getGuitarsByBrandId } = require("../../controllers/guitar/guitar-brand.controllers");

// Gets all the guitar brands
router.get("/", getGuitarBrands);
// Gets a guitar brand using its uuid
router.get("/:guitarBrandUuid", getGuitarBrandByUuid);
// Gets all the guitar from a brand with its mongoid 
router.get("/brand/:guitarBrandId", getGuitarsByBrandId);
// Creates a guitar brand 
router.post("/create", createGuitarBrand);


module.exports = router;