const router = require('express').Router();
const { getGuitars, createGuitar, getGuitarByUuid } = require("../../controllers/guitar/guitar.controllers");


// Gets all the guitars
router.get('/', getGuitars);
// Gets a guitar using its uuid
router.get("/:guitarUuid", getGuitarByUuid);
// Creates a guitar
router.post('/create', createGuitar);



module.exports = router;