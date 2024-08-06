const { createGuitar, getGuitars, getGuitarByUuid } = require("../../queries/guitar/guitar.queries");


exports.getGuitars = async (req, res, next) => {
    try {
        const guitars = await getGuitars();
        res.status(200).json(guitars);
    } catch (e) {
        next(e)
    }
}

exports.getGuitarByUuid = async (req, res, next) => {
    const guitarUuid = req.params.guitarUuid;
    try {
        const guitar = await getGuitarByUuid(guitarUuid);
        res.status(200).json(guitar);
    } catch (e) {
        next(e)
    }
}

exports.createGuitar = async (req, res, next) => {
    const guitar = req.body;
    const guitarPicture = req.files && req.files.picture ? req.files.picture : null

    try {
        await createGuitar(guitar, guitarPicture);
        res.status(200).json("Guitar created");
    } catch (e) {
        next(e);
    }
}



