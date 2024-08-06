const { createGuitarCategory, getGuitarCategoryByUuid, getGuitarCategories, getGuitarsByCategoryId } = require("../../queries/guitar/guitar-category.queries");

exports.getGuitarCategoryByUuid = async (req, res, next) => {
    const guitarCategoryUuid = req.params.guitarCategoryUuid;
    console.log(req.params);
    try {
        const guitarCategory = await getGuitarCategoryByUuid(guitarCategoryUuid)
        res.status(200).json(guitarCategory);
        // POPULATE
    } catch (e) {
        next(e);
    }
}

exports.getGuitarCategories = async (req, res, next) => {
    try {
        const guitarCategories = await getGuitarCategories();
        res.status(200).json(guitarCategories);
    } catch (e) {
        next(e);
    }
}

exports.getGuitarsByCategoryId = async (req, res, next) => {
    const categoryId = req.params.categoryId;
    try {
        const guitars = await getGuitarsByCategoryId(categoryId);
        res.status(200).json(guitars);
    } catch (e) {
        next(e);
    }
}

exports.createGuitarCategory = async (req, res, next) => {
    const guitarCategory = req.body;
    const guitarCategoryPicture = req.files && req.files.picture ? req.files.picture : null;
    try {
        await createGuitarCategory(guitarCategory, guitarCategoryPicture);
        res.status(200).json("Guitar category created");
    } catch (e) {
        next(e);
    }
}

