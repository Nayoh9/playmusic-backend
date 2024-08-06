const { createBrand, getGuitarBrands, getGuitarBrandByUuid, getGuitarsByBrandId } = require("../../queries/guitar/guitar-brand.queries")


exports.getGuitarBrands = async (req, res, next) => {
    try {
        const guitarBrands = await getGuitarBrands();
        res.status(200).json(guitarBrands);
    } catch (e) {
        next(e);
    }
}

exports.getGuitarBrandByUuid = async (req, res, next) => {
    const guitarBrandUuid = req.params.guitarBrandUuid;
    try {
        const guitarBrand = await getGuitarBrandByUuid(guitarBrandUuid);
        res.status(200).json(guitarBrand);
    } catch (e) {
        next(e);
    }
}

exports.getGuitarsByBrandId = async (req, res, next) => {
    const guitarBrandId = req.params.guitarBrandId;
    try {
        const guitars = await getGuitarsByBrandId(guitarBrandId);
        res.status(200).json(guitars);
    } catch (e) {
        next(e);
    }
}

exports.createGuitarBrand = async (req, res, next) => {
    const guitarBrand = req.body;
    const guitarBrandPicture = req.files && req.files.picture ? req.files.picture : null;

    try {
        await createBrand(guitarBrand, guitarBrandPicture);
        res.status(200).json("Guitar brand created");
    } catch (e) {
        next(e)
    }
}





