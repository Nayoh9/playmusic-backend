const router = require('express').Router();

const guitar = require("./guitar/guitar.routes");
const guitarCategory = require("./guitar/guitar-category.routes");
const guitarBrand = require('./guitar/guitar-brand.routes');

// guitar routes
router.use("/guitar", guitar);
router.use("/guitar-category", guitarCategory);
router.use("/guitar-brand", guitarBrand);
// guitar routes


router.all('*', (req, res) => {
    res.status(404).json("This route does not exist")
})


module.exports = router;